import { Router } from 'express';
import * as categoryController from '../controllers/categoryController';
import { authenticate, restrictTo } from '../middlewares/auth';
import { RouteGroup } from '../types/route';
import { RouteBuilder } from '../utils/routeBuilder';

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Category management endpoints
 */

const categoryRoutes: RouteGroup = {
  prefix: '/api/categories',
  routes: [
    /**
     * @swagger
     * /api/categories:
     *   post:
     *     summary: Create a new category
     *     description: "Create a new category. Required Role: Admin"
     *     tags: [Categories]
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required:
     *               - name
     *               - slug
     *             properties:
     *               name:
     *                 type: object
     *                 properties:
     *                   fr: { type: string }
     *                   en: { type: string }
     *                   ar: { type: string }
     *               slug:
     *                 type: object
     *                 properties:
     *                   fr: { type: string }
     *                   en: { type: string }
     *                   ar: { type: string }
     *               description:
     *                 type: object
     *                 properties:
     *                   fr: { type: string }
     *                   en: { type: string }
     *                   ar: { type: string }
     *               image:
     *                 type: string
     *               parentId:
     *                 type: string
     *                 format: uuid
     *               isActive:
     *                 type: boolean
     *               sortOrder:
     *                 type: integer
     *     responses:
     *       201:
     *         description: Category created successfully
     *       400:
     *         description: Bad request
     *       401:
     *         description: Authentication required
     *       403:
     *         description: Access denied - Admin role required
     *       500:
     *         description: Internal server error
     */
    {
      method: 'post',
      path: '/',
      handler: categoryController.createCategory,
      middlewares: [authenticate, restrictTo('admin')],
      summary: 'Create a new category',
      description: 'Create a new category (Admin only)',
      tags: ['Categories'],
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['name', 'slug'],
              properties: {
                name: {
                  type: 'object',
                  properties: {
                    fr: { type: 'string' },
                    en: { type: 'string' },
                    ar: { type: 'string' },
                  },
                },
                slug: {
                  type: 'object',
                  properties: {
                    fr: { type: 'string' },
                    en: { type: 'string' },
                    ar: { type: 'string' },
                  },
                },
                description: { type: 'object' },
                image: { type: 'string' },
                parentId: { type: 'string', format: 'uuid' },
                isActive: { type: 'boolean' },
                sortOrder: { type: 'integer' },
              },
            },
          },
        },
      },
      responses: {
        201: { description: 'Category created successfully' },
        400: { description: 'Bad request' },
        401: { description: 'Authentication required' },
        403: { description: 'Access denied' },
        500: { description: 'Internal server error' },
      },
    },
    /**
     * @swagger
     * /api/categories/tree:
     *   get:
     *     summary: Get category tree
     *     description: "Get all categories in hierarchical tree structure"
     *     tags: [Categories]
     *     parameters:
     *       - in: query
     *         name: isActive
     *         schema:
     *           type: boolean
     *         description: Filter by active status
     *     responses:
     *       200:
     *         description: Category tree
     *       500:
     *         description: Internal server error
     */
    {
      method: 'get',
      path: '/tree',
      handler: categoryController.getCategoryTree,
      middlewares: [],
      summary: 'Get category tree',
      description: 'Get all categories in hierarchical tree structure',
      tags: ['Categories'],
      responses: {
        200: { description: 'Category tree' },
        500: { description: 'Internal server error' },
      },
    },
    /**
     * @swagger
     * /api/categories:
     *   get:
     *     summary: Get all categories
     *     description: "Get all categories (flat list)"
     *     tags: [Categories]
     *     parameters:
     *       - in: query
     *         name: isActive
     *         schema:
     *           type: boolean
     *       - in: query
     *         name: parentId
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: List of categories
     *       500:
     *         description: Internal server error
     */
    {
      method: 'get',
      path: '/',
      handler: categoryController.getAllCategories,
      middlewares: [],
      summary: 'Get all categories',
      description: 'Get all categories (flat list)',
      tags: ['Categories'],
      responses: {
        200: { description: 'List of categories' },
        500: { description: 'Internal server error' },
      },
    },
    /**
     * @swagger
     * /api/categories/parent/{parentId}:
     *   get:
     *     summary: Get categories by parent
     *     description: "Get categories filtered by parent ID"
     *     tags: [Categories]
     *     parameters:
     *       - in: path
     *         name: parentId
     *         required: true
     *         schema:
     *           type: string
     *         description: Parent category ID (use 'root' or 'null' for root categories)
     *       - in: query
     *         name: includeChildren
     *         schema:
     *           type: boolean
     *     responses:
     *       200:
     *         description: List of categories
     *       500:
     *         description: Internal server error
     */
    {
      method: 'get',
      path: '/parent/:parentId',
      handler: categoryController.getCategoriesByParent,
      middlewares: [],
      summary: 'Get categories by parent',
      description: 'Get categories filtered by parent ID',
      tags: ['Categories'],
      params: [
        {
          name: 'parentId',
          type: 'string',
          required: true,
          description: 'Parent category ID (use "root" or "null" for root categories)',
          in: 'path',
        },
      ],
      responses: {
        200: { description: 'List of categories' },
        500: { description: 'Internal server error' },
      },
    },
    /**
     * @swagger
     * /api/categories/{id}:
     *   get:
     *     summary: Get category by ID
     *     description: "Get a category by its ID"
     *     tags: [Categories]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *       - in: query
     *         name: includeChildren
     *         schema:
     *           type: boolean
     *     responses:
     *       200:
     *         description: Category details
     *       404:
     *         description: Category not found
     *       500:
     *         description: Internal server error
     */
    {
      method: 'get',
      path: '/:id',
      handler: categoryController.getCategoryById,
      middlewares: [],
      summary: 'Get category by ID',
      description: 'Get a category by its ID',
      tags: ['Categories'],
      params: [
        {
          name: 'id',
          type: 'string',
          required: true,
          description: 'Category ID',
          in: 'path',
        },
      ],
      responses: {
        200: { description: 'Category details' },
        404: { description: 'Category not found' },
        500: { description: 'Internal server error' },
      },
    },
    /**
     * @swagger
     * /api/categories/{id}:
     *   put:
     *     summary: Update a category
     *     description: "Update an existing category. Required Role: Admin"
     *     tags: [Categories]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               name: { type: object }
     *               slug: { type: object }
     *               description: { type: object }
     *               image: { type: string }
     *               parentId: { type: string }
     *               isActive: { type: boolean }
     *               sortOrder: { type: integer }
     *     responses:
     *       200:
     *         description: Category updated successfully
     *       400:
     *         description: Bad request
     *       401:
     *         description: Authentication required
     *       403:
     *         description: Access denied
     *       404:
     *         description: Category not found
     *       500:
     *         description: Internal server error
     */
    {
      method: 'put',
      path: '/:id',
      handler: categoryController.updateCategory,
      middlewares: [authenticate, restrictTo('admin')],
      summary: 'Update a category',
      description: 'Update an existing category (Admin only)',
      tags: ['Categories'],
      security: [{ bearerAuth: [] }],
      params: [
        {
          name: 'id',
          type: 'string',
          required: true,
          description: 'Category ID',
          in: 'path',
        },
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                name: { type: 'object' },
                slug: { type: 'object' },
                description: { type: 'object' },
                image: { type: 'string' },
                parentId: { type: 'string' },
                isActive: { type: 'boolean' },
                sortOrder: { type: 'integer' },
              },
            },
          },
        },
      },
      responses: {
        200: { description: 'Category updated successfully' },
        400: { description: 'Bad request' },
        401: { description: 'Authentication required' },
        403: { description: 'Access denied' },
        404: { description: 'Category not found' },
        500: { description: 'Internal server error' },
      },
    },
    /**
     * @swagger
     * /api/categories/{id}:
     *   delete:
     *     summary: Delete a category
     *     description: "Delete an existing category. Required Role: Admin"
     *     tags: [Categories]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *     responses:
     *       200:
     *         description: Category deleted successfully
     *       400:
     *         description: Cannot delete category with subcategories or products
     *       401:
     *         description: Authentication required
     *       403:
     *         description: Access denied
     *       404:
     *         description: Category not found
     *       500:
     *         description: Internal server error
     */
    {
      method: 'delete',
      path: '/:id',
      handler: categoryController.deleteCategory,
      middlewares: [authenticate, restrictTo('admin')],
      summary: 'Delete a category',
      description: 'Delete an existing category (Admin only)',
      tags: ['Categories'],
      security: [{ bearerAuth: [] }],
      params: [
        {
          name: 'id',
          type: 'string',
          required: true,
          description: 'Category ID',
          in: 'path',
        },
      ],
      responses: {
        200: { description: 'Category deleted successfully' },
        400: { description: 'Cannot delete category with subcategories or products' },
        401: { description: 'Authentication required' },
        403: { description: 'Access denied' },
        404: { description: 'Category not found' },
        500: { description: 'Internal server error' },
      },
    },
  ],
};

const router = Router();
RouteBuilder.buildRouteGroup(router, categoryRoutes);

export default router;

