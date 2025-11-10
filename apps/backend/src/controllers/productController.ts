import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';
import { Prisma } from '@prisma/client';

// Helper function to format product response
const formatProduct = (product: any) => {
  return {
    id: product.id,
    name: product.name,
    description: product.description,
    shortDescription: product.shortDescription,
    price: Number(product.price),
    currency: product.currency,
    image: product.image,
    images: product.images,
    video: product.video,
    links: product.links,
    featured: product.featured,
    category: product.category,
    sku: product.sku,
    stock: product.stock,
    isActive: product.isActive,
    createdAt: product.createdAt,
    updatedAt: product.updatedAt,
  };
};

// Create product (only admin)
export const createProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      name,
      description,
      shortDescription,
      price,
      currency = 'EUR',
      image,
      images,
      video,
      links,
      featured = false,
      category,
      sku,
      stock = 0,
      isActive = true,
    } = req.body;

    // Validate required fields
    if (!name || !description || price === undefined || !image || !links) {
      res.status(400).json({
        message: 'Name, description, price, image, and links are required',
      });
      return;
    }

    // Validate multilingual fields structure
    if (
      !name.fr ||
      !name.en ||
      !name.ar ||
      !description.fr ||
      !description.en ||
      !description.ar
    ) {
      res.status(400).json({
        message: 'Name and description must have fr, en, and ar properties',
      });
      return;
    }

    const product = await prisma.product.create({
      data: {
        name,
        description,
        shortDescription: shortDescription || {
          fr: description.fr.substring(0, 100),
          en: description.en.substring(0, 100),
          ar: description.ar.substring(0, 100),
        },
        price: new Prisma.Decimal(price),
        currency,
        image,
        images: images || [],
        video,
        links,
        featured,
        category,
        sku,
        stock,
        isActive,
      },
    });

    res.status(201).json({
      message: 'Product created successfully',
      product: formatProduct(product),
    });
    return;
  } catch (error: any) {
    console.error('Create product error:', error);
    if (error.code === 'P2002') {
      res.status(409).json({ message: 'Product with this SKU already exists' });
      return;
    }
    res.status(500).json({ message: 'Failed to create product' });
    return;
  }
};

// Update product (only admin)
export const updateProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const {
      name,
      description,
      shortDescription,
      price,
      currency,
      image,
      images,
      video,
      links,
      featured,
      category,
      sku,
      stock,
      isActive,
    } = req.body;

    // Check if product exists
    const existingProduct = await prisma.product.findUnique({
      where: { id },
    });

    if (!existingProduct) {
      res.status(404).json({ message: 'Product not found' });
      return;
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
    if (description !== undefined) {
      if (!description.fr || !description.en || !description.ar) {
        res.status(400).json({
          message: 'Description must have fr, en, and ar properties',
        });
        return;
      }
      updateData.description = description;
    }
    if (shortDescription !== undefined) updateData.shortDescription = shortDescription;
    if (price !== undefined) updateData.price = new Prisma.Decimal(price);
    if (currency !== undefined) updateData.currency = currency;
    if (image !== undefined) updateData.image = image;
    if (images !== undefined) updateData.images = images;
    if (video !== undefined) updateData.video = video;
    if (links !== undefined) updateData.links = links;
    if (featured !== undefined) updateData.featured = featured;
    if (category !== undefined) updateData.category = category;
    if (sku !== undefined) updateData.sku = sku;
    if (stock !== undefined) updateData.stock = stock;
    if (isActive !== undefined) updateData.isActive = isActive;

    const product = await prisma.product.update({
      where: { id },
      data: updateData,
    });

    res.json({
      message: 'Product updated successfully',
      product: formatProduct(product),
    });
    return;
  } catch (error: any) {
    console.error('Update product error:', error);
    if (error.code === 'P2002') {
      res.status(409).json({ message: 'Product with this SKU already exists' });
      return;
    }
    res.status(500).json({ message: 'Failed to update product' });
    return;
  }
};

// Delete product (only admin)
export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    // Check if product exists
    const existingProduct = await prisma.product.findUnique({
      where: { id },
    });

    if (!existingProduct) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }

    await prisma.product.delete({
      where: { id },
    });

    res.json({ message: 'Product deleted successfully' });
    return;
  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({ message: 'Failed to delete product' });
    return;
  }
};

// Get product by id (client, admin)
export const getProductById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }

    res.json({
      product: formatProduct(product),
    });
    return;
  } catch (error) {
    console.error('Get product by id error:', error);
    res.status(500).json({ message: 'Failed to get product' });
    return;
  }
};

// Search products with pagination and keyword (client, admin)
export const searchProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      keyword,
      locale = 'en',
      page = 1,
      limit = 10,
      minPrice,
      maxPrice,
      isActive,
      featured,
      category,
    } = req.body;

    const pageNumber = parseInt(page as string, 10);
    const limitNumber = parseInt(limit as string, 10);
    const skip = (pageNumber - 1) * limitNumber;

    // Build where clause
    const where: Prisma.ProductWhereInput = {};

    // Keyword search in multilingual fields (searches in JSON)
    // Note: Prisma JSON filtering is limited, so we search across all locales
    // For better search, consider using full-text search or a search service
    if (keyword) {
      // We'll need to use a raw query or filter after fetching
      // For now, we'll search in the JSON structure using Prisma's JSON filters
      // This is a simplified approach - for production, consider using PostgreSQL full-text search
      where.OR = [
        {
          name: {
            path: ['fr'],
            string_contains: keyword as string,
          },
        },
        {
          name: {
            path: ['en'],
            string_contains: keyword as string,
          },
        },
        {
          name: {
            path: ['ar'],
            string_contains: keyword as string,
          },
        },
        {
          description: {
            path: ['fr'],
            string_contains: keyword as string,
          },
        },
        {
          description: {
            path: ['en'],
            string_contains: keyword as string,
          },
        },
        {
          description: {
            path: ['ar'],
            string_contains: keyword as string,
          },
        },
      ];
    }

    // Price range filter
    if (minPrice !== undefined || maxPrice !== undefined) {
      where.price = {};
      if (minPrice !== undefined) {
        where.price.gte = new Prisma.Decimal(minPrice);
      }
      if (maxPrice !== undefined) {
        where.price.lte = new Prisma.Decimal(maxPrice);
      }
    }

    // Active status filter
    if (isActive !== undefined) {
      where.isActive = isActive;
    }

    // Featured filter
    if (featured !== undefined) {
      where.featured = featured;
    }

    // Category filter
    if (category) {
      where.category = category;
    }

    // Get products and total count
    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        skip,
        take: limitNumber,
        orderBy: [{ featured: 'desc' }, { createdAt: 'desc' }],
      }),
      prisma.product.count({ where }),
    ]);

    const totalPages = Math.ceil(total / limitNumber);

    res.json({
      products: products.map((product) => formatProduct(product)),
      pagination: {
        page: pageNumber,
        limit: limitNumber,
        total,
        totalPages,
        hasNextPage: pageNumber < totalPages,
        hasPreviousPage: pageNumber > 1,
      },
    });
    return;
  } catch (error) {
    console.error('Search products error:', error);
    res.status(500).json({ message: 'Failed to search products' });
    return;
  }
};

