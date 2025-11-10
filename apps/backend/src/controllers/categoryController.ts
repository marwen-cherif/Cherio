import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';

// Helper function to format category response
const formatCategory = (category: any, includeChildren = false) => {
  const formatted: any = {
    id: category.id,
    name: category.name,
    slug: category.slug,
    description: category.description,
    image: category.image,
    parentId: category.parentId,
    isActive: category.isActive,
    sortOrder: category.sortOrder,
    createdAt: category.createdAt,
    updatedAt: category.updatedAt,
  };

  if (includeChildren && category.children) {
    formatted.children = category.children.map((child: any) => formatCategory(child, true));
  }

  if (category.parent) {
    formatted.parent = formatCategory(category.parent, false);
  }

  return formatted;
};

// Helper function to build category tree recursively
const buildCategoryTree = (categories: any[], parentId: string | null = null): any[] => {
  return categories
    .filter((cat) => cat.parentId === parentId)
    .map((category) => {
      const children = buildCategoryTree(categories, category.id);
      return {
        ...formatCategory(category, false),
        children: children.length > 0 ? children : undefined,
      };
    })
    .sort((a, b) => a.sortOrder - b.sortOrder);
};

// Create category (only admin)
export const createCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, slug, description, image, parentId, isActive = true, sortOrder = 0 } = req.body;

    // Validate required fields
    if (!name || !slug) {
      res.status(400).json({
        message: 'Name and slug are required',
      });
      return;
    }

    // Validate multilingual fields structure
    if (!name.fr || !name.en || !name.ar || !slug.fr || !slug.en || !slug.ar) {
      res.status(400).json({
        message: 'Name and slug must have fr, en, and ar properties',
      });
      return;
    }

    // Validate parent exists if parentId is provided
    if (parentId) {
      const parent = await prisma.category.findUnique({
        where: { id: parentId },
      });

      if (!parent) {
        res.status(404).json({ message: 'Parent category not found' });
        return;
      }
    }

    const category = await prisma.category.create({
      data: {
        name,
        slug,
        description,
        image,
        parentId,
        isActive,
        sortOrder,
      },
      include: {
        parent: true,
        children: true,
      },
    });

    res.status(201).json({
      message: 'Category created successfully',
      category: formatCategory(category, true),
    });
    return;
  } catch (error: any) {
    console.error('Create category error:', error);
    if (error.code === 'P2003') {
      res.status(404).json({ message: 'Parent category not found' });
      return;
    }
    res.status(500).json({ message: 'Failed to create category' });
    return;
  }
};

// Update category (only admin)
export const updateCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, slug, description, image, parentId, isActive, sortOrder } = req.body;

    // Check if category exists
    const existingCategory = await prisma.category.findUnique({
      where: { id },
      include: { children: true },
    });

    if (!existingCategory) {
      res.status(404).json({ message: 'Category not found' });
      return;
    }

    // Prevent circular reference: category cannot be its own parent
    if (parentId === id) {
      res.status(400).json({ message: 'Category cannot be its own parent' });
      return;
    }

    // Prevent setting a descendant as parent
    if (parentId) {
      const isDescendant = await checkIfDescendant(id, parentId);
      if (isDescendant) {
        res.status(400).json({ message: 'Cannot set a descendant category as parent' });
        return;
      }

      // Validate parent exists
      const parent = await prisma.category.findUnique({
        where: { id: parentId },
      });

      if (!parent) {
        res.status(404).json({ message: 'Parent category not found' });
        return;
      }
    }

    // Build update data
    const updateData: any = {};
    if (name !== undefined) {
      if (!name.fr || !name.en || !name.ar) {
        res.status(400).json({
          message: 'Name must have fr, en, and ar properties',
        });
        return;
      }
      updateData.name = name;
    }
    if (slug !== undefined) {
      if (!slug.fr || !slug.en || !slug.ar) {
        res.status(400).json({
          message: 'Slug must have fr, en, and ar properties',
        });
        return;
      }
      updateData.slug = slug;
    }
    if (description !== undefined) updateData.description = description;
    if (image !== undefined) updateData.image = image;
    if (parentId !== undefined) updateData.parentId = parentId;
    if (isActive !== undefined) updateData.isActive = isActive;
    if (sortOrder !== undefined) updateData.sortOrder = sortOrder;

    const category = await prisma.category.update({
      where: { id },
      data: updateData,
      include: {
        parent: true,
        children: true,
      },
    });

    res.json({
      message: 'Category updated successfully',
      category: formatCategory(category, true),
    });
    return;
  } catch (error: any) {
    console.error('Update category error:', error);
    if (error.code === 'P2003') {
      res.status(404).json({ message: 'Parent category not found' });
      return;
    }
    res.status(500).json({ message: 'Failed to update category' });
    return;
  }
};

// Helper function to check if a category is a descendant of another
const checkIfDescendant = async (ancestorId: string, potentialDescendantId: string): Promise<boolean> => {
  const category = await prisma.category.findUnique({
    where: { id: potentialDescendantId },
    include: {
      parent: true,
    },
  });

  if (!category || !category.parentId) {
    return false;
  }

  if (category.parentId === ancestorId) {
    return true;
  }

  return checkIfDescendant(ancestorId, category.parentId);
};

// Delete category (only admin)
export const deleteCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    // Check if category exists
    const existingCategory = await prisma.category.findUnique({
      where: { id },
      include: {
        children: true,
        products: true,
      },
    });

    if (!existingCategory) {
      res.status(404).json({ message: 'Category not found' });
      return;
    }

    // Check if category has children
    if (existingCategory.children.length > 0) {
      res.status(400).json({
        message: 'Cannot delete category with subcategories. Please delete or move subcategories first.',
      });
      return;
    }

    // Check if category has products
    if (existingCategory.products.length > 0) {
      res.status(400).json({
        message: 'Cannot delete category with products. Please remove or reassign products first.',
      });
      return;
    }

    await prisma.category.delete({
      where: { id },
    });

    res.json({ message: 'Category deleted successfully' });
    return;
  } catch (error) {
    console.error('Delete category error:', error);
    res.status(500).json({ message: 'Failed to delete category' });
    return;
  }
};

// Get category by id
export const getCategoryById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { includeChildren = 'false' } = req.query;

    const category = await prisma.category.findUnique({
      where: { id },
      include: {
        parent: true,
        children: includeChildren === 'true',
      },
    });

    if (!category) {
      res.status(404).json({ message: 'Category not found' });
      return;
    }

    res.json({
      category: formatCategory(category, includeChildren === 'true'),
    });
    return;
  } catch (error) {
    console.error('Get category by id error:', error);
    res.status(500).json({ message: 'Failed to get category' });
    return;
  }
};

// Get category tree (all categories in hierarchical structure)
export const getCategoryTree = async (req: Request, res: Response): Promise<void> => {
  try {
    const { isActive } = req.query;

    const where: any = {};
    if (isActive !== undefined) {
      where.isActive = isActive === 'true';
    }

    const categories = await prisma.category.findMany({
      where,
      include: {
        parent: true,
      },
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'asc' }],
    });

    const tree = buildCategoryTree(categories);

    res.json({
      categories: tree,
    });
    return;
  } catch (error) {
    console.error('Get category tree error:', error);
    res.status(500).json({ message: 'Failed to get category tree' });
    return;
  }
};

// Get categories by parent (flat list or tree)
export const getCategoriesByParent = async (req: Request, res: Response): Promise<void> => {
  try {
    const { parentId } = req.params;
    const { includeChildren = 'false' } = req.query;

    const where: any = { parentId: parentId === 'null' || parentId === 'root' ? null : parentId };

    const categories = await prisma.category.findMany({
      where,
      include: {
        parent: true,
        children: includeChildren === 'true',
      },
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'asc' }],
    });

    res.json({
      categories: categories.map((cat) => formatCategory(cat, includeChildren === 'true')),
    });
    return;
  } catch (error) {
    console.error('Get categories by parent error:', error);
    res.status(500).json({ message: 'Failed to get categories' });
    return;
  }
};

// Get all categories (flat list)
export const getAllCategories = async (req: Request, res: Response): Promise<void> => {
  try {
    const { isActive, parentId } = req.query;

    const where: any = {};
    if (isActive !== undefined) {
      where.isActive = isActive === 'true';
    }
    if (parentId !== undefined) {
      where.parentId = parentId === 'null' || parentId === 'root' ? null : parentId;
    }

    const categories = await prisma.category.findMany({
      where,
      include: {
        parent: true,
      },
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'asc' }],
    });

    res.json({
      categories: categories.map((cat) => formatCategory(cat, false)),
    });
    return;
  } catch (error) {
    console.error('Get all categories error:', error);
    res.status(500).json({ message: 'Failed to get categories' });
    return;
  }
};

