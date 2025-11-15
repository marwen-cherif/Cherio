import { Router } from 'express';
import * as productController from '../controllers/productController';
import { authenticate, restrictTo } from '../middlewares/auth';
import { RouteGroup } from '../types/route';
import { RouteBuilder } from '../utils/routeBuilder';

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product management endpoints
 */

const productRoutes: RouteGroup = {
  prefix: '/api/products',
  routes: [
    /**
     * @swagger
     * /api/products:
     *   post:
     *     summary: Create a new product
     *     description: "Create a new product. Required Role: Admin"
     *     tags: [Products]
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/CreateProductRequest'
     *           example:
     *             name: "Product Name"
     *             description: "Product description"
     *             price: 99.99
     *             sku: "PROD-001"
     *             imageUrl: "https://example.com/image.jpg"
     *             stock: 100
     *             isActive: true
     *     responses:
     *       201:
     *         description: Product created successfully
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/ProductResponse'
     *             example:
     *               message: "Product created successfully"
     *               product:
     *                 id: "123e4567-e89b-12d3-a456-426614174000"
     *                 name: "Product Name"
     *                 description: "Product description"
     *                 price: "99.99"
     *                 sku: "PROD-001"
     *                 imageUrl: "https://example.com/image.jpg"
     *                 stock: 100
     *                 isActive: true
     *                 createdAt: "2024-01-01T00:00:00.000Z"
     *                 updatedAt: "2024-01-01T00:00:00.000Z"
     *       400:
     *         description: Bad request - Name and price are required
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Error'
     *             example:
     *               message: "Name and price are required"
     *       401:
     *         description: Authentication required
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Error'
     *             example:
     *               message: "Authentication required"
     *       403:
     *         description: Access denied - Admin role required
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Error'
     *             example:
     *               message: "Access denied"
     *       409:
     *         description: Conflict - Product with this SKU already exists
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Error'
     *             example:
     *               message: "Product with this SKU already exists"
     *       500:
     *         description: Internal server error
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Error'
     *             example:
     *               message: "Failed to create product"
     */
    {
      method: 'post',
      path: '/',
      handler: productController.createProduct,
      middlewares: [authenticate, restrictTo('admin')],
      summary: 'Create a new product',
      description: 'Create a new product (Admin only)',
      tags: ['Products'],
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/CreateProductRequest',
            },
          },
        },
      },
      responses: {
        201: {
          description: 'Product created successfully',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ProductResponse',
              },
            },
          },
        },
        400: {
          description: 'Bad request - Name and price are required',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error',
              },
            },
          },
        },
        401: {
          description: 'Authentication required',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error',
              },
            },
          },
        },
        403: {
          description: 'Access denied - Admin role required',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error',
              },
            },
          },
        },
        409: {
          description: 'Conflict - Product with this SKU already exists',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error',
              },
            },
          },
        },
        500: {
          description: 'Internal server error',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error',
              },
            },
          },
        },
      },
    },
    /**
     * @swagger
     * /api/products/{id}:
     *   put:
     *     summary: Update a product
     *     description: "Update an existing product. Required Role: Admin"
     *     tags: [Products]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *         description: Product ID
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/UpdateProductRequest'
     *           example:
     *             name: "Updated Product Name"
     *             price: 149.99
     *             stock: 50
     *     responses:
     *       200:
     *         description: Product updated successfully
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/ProductResponse'
     *             example:
     *               message: "Product updated successfully"
     *               product:
     *                 id: "123e4567-e89b-12d3-a456-426614174000"
     *                 name: "Updated Product Name"
     *                 price: "149.99"
     *                 stock: 50
     *       404:
     *         description: Product not found
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Error'
     *             example:
     *               message: "Product not found"
     *       401:
     *         description: Authentication required
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Error'
     *             example:
     *               message: "Authentication required"
     *       403:
     *         description: Access denied - Admin role required
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Error'
     *             example:
     *               message: "Access denied"
     *       409:
     *         description: Conflict - Product with this SKU already exists
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Error'
     *             example:
     *               message: "Product with this SKU already exists"
     *       500:
     *         description: Internal server error
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Error'
     *             example:
     *               message: "Failed to update product"
     */
    {
      method: 'put',
      path: '/:id',
      handler: productController.updateProduct,
      middlewares: [authenticate, restrictTo('admin')],
      summary: 'Update a product',
      description: 'Update an existing product (Admin only)',
      tags: ['Products'],
      security: [{ bearerAuth: [] }],
      params: [
        {
          name: 'id',
          type: 'string',
          required: true,
          description: 'Product ID',
          in: 'path',
        },
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/UpdateProductRequest',
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Product updated successfully',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ProductResponse',
              },
            },
          },
        },
        404: {
          description: 'Product not found',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error',
              },
            },
          },
        },
        401: {
          description: 'Authentication required',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error',
              },
            },
          },
        },
        403: {
          description: 'Access denied - Admin role required',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error',
              },
            },
          },
        },
        409: {
          description: 'Conflict - Product with this SKU already exists',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error',
              },
            },
          },
        },
        500: {
          description: 'Internal server error',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error',
              },
            },
          },
        },
      },
    },
    /**
     * @swagger
     * /api/products/{id}:
     *   delete:
     *     summary: Delete a product
     *     description: "Delete an existing product. Required Role: Admin"
     *     tags: [Products]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *         description: Product ID
     *     responses:
     *       200:
     *         description: Product deleted successfully
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     *                   example: "Product deleted successfully"
     *       404:
     *         description: Product not found
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Error'
     *             example:
     *               message: "Product not found"
     *       401:
     *         description: Authentication required
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Error'
     *             example:
     *               message: "Authentication required"
     *       403:
     *         description: Access denied - Admin role required
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Error'
     *             example:
     *               message: "Access denied"
     *       500:
     *         description: Internal server error
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Error'
     *             example:
     *               message: "Failed to delete product"
     */
    {
      method: 'delete',
      path: '/:id',
      handler: productController.deleteProduct,
      middlewares: [authenticate, restrictTo('admin')],
      summary: 'Delete a product',
      description: 'Delete an existing product (Admin only)',
      tags: ['Products'],
      security: [{ bearerAuth: [] }],
      params: [
        {
          name: 'id',
          type: 'string',
          required: true,
          description: 'Product ID',
          in: 'path',
        },
      ],
      responses: {
        200: {
          description: 'Product deleted successfully',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: { type: 'string' },
                },
              },
            },
          },
        },
        404: {
          description: 'Product not found',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error',
              },
            },
          },
        },
        401: {
          description: 'Authentication required',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error',
              },
            },
          },
        },
        403: {
          description: 'Access denied - Admin role required',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error',
              },
            },
          },
        },
        500: {
          description: 'Internal server error',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error',
              },
            },
          },
        },
      },
    },
    /**
     * @swagger
     * /api/products/{id}:
     *   get:
     *     summary: Get product by ID
     *     description: "Get a product by its ID. Required Role: Client or Admin"
     *     tags: [Products]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *         description: Product ID
     *     responses:
     *       200:
     *         description: Product details
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 product:
     *                   $ref: '#/components/schemas/Product'
     *             example:
     *               product:
     *                 id: "123e4567-e89b-12d3-a456-426614174000"
     *                 name: "Product Name"
     *                 description: "Product description"
     *                 price: "99.99"
     *                 sku: "PROD-001"
     *                 imageUrl: "https://example.com/image.jpg"
     *                 stock: 100
     *                 isActive: true
     *                 createdAt: "2024-01-01T00:00:00.000Z"
     *                 updatedAt: "2024-01-01T00:00:00.000Z"
     *       404:
     *         description: Product not found
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Error'
     *             example:
     *               message: "Product not found"
     *       401:
     *         description: Authentication required
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Error'
     *             example:
     *               message: "Authentication required"
     *       403:
     *         description: Access denied - Client or Admin role required
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Error'
     *             example:
     *               message: "Access denied"
     *       500:
     *         description: Internal server error
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Error'
     *             example:
     *               message: "Failed to get product"
     */
    {
      method: 'get',
      path: '/:id',
      handler: productController.getProductById,
      middlewares: [authenticate, restrictTo('client', 'admin')],
      summary: 'Get product by ID',
      description: 'Get a product by its ID (Client, Admin)',
      tags: ['Products'],
      security: [{ bearerAuth: [] }],
      params: [
        {
          name: 'id',
          type: 'string',
          required: true,
          description: 'Product ID',
          in: 'path',
        },
      ],
      responses: {
        200: {
          description: 'Product details',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  product: {
                    $ref: '#/components/schemas/Product',
                  },
                },
              },
            },
          },
        },
        404: {
          description: 'Product not found',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error',
              },
            },
          },
        },
        401: {
          description: 'Authentication required',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error',
              },
            },
          },
        },
        403: {
          description: 'Access denied - Client or Admin role required',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error',
              },
            },
          },
        },
        500: {
          description: 'Internal server error',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error',
              },
            },
          },
        },
      },
    },
    /**
     * @swagger
     * /api/products/search:
     *   post:
     *     summary: Search products with pagination
     *     description: "Search products with pagination, keyword filtering, and price range. Required Role: Client or Admin"
     *     tags: [Products]
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/SearchProductsRequest'
     *           example:
     *             keyword: "laptop"
     *             page: 1
     *             limit: 10
     *             minPrice: 100
     *             maxPrice: 1000
     *             isActive: true
     *     responses:
     *       200:
     *         description: Products list with pagination
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/ProductsListResponse'
     *             example:
     *               products:
     *                 - id: "123e4567-e89b-12d3-a456-426614174000"
     *                   name: "Product Name"
     *                   description: "Product description"
     *                   price: "99.99"
     *                   sku: "PROD-001"
     *                   imageUrl: "https://example.com/image.jpg"
     *                   stock: 100
     *                   isActive: true
     *                   createdAt: "2024-01-01T00:00:00.000Z"
     *                   updatedAt: "2024-01-01T00:00:00.000Z"
     *               pagination:
     *                 page: 1
     *                 limit: 10
     *                 total: 25
     *                 totalPages: 3
     *                 hasNextPage: true
     *                 hasPreviousPage: false
     *       401:
     *         description: Authentication required
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Error'
     *             example:
     *               message: "Authentication required"
     *       403:
     *         description: Access denied - Client or Admin role required
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Error'
     *             example:
     *               message: "Access denied"
     *       500:
     *         description: Internal server error
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Error'
     *             example:
     *               message: "Failed to search products"
     */
    {
      method: 'post',
      path: '/search',
      handler: productController.searchProducts,
      middlewares: [authenticate, restrictTo('client', 'admin')],
      summary: 'Search products',
      description: 'Search products with pagination and keyword filtering (Client, Admin)',
      tags: ['Products'],
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/SearchProductsRequest',
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Products list with pagination',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ProductsListResponse',
              },
            },
          },
        },
        401: {
          description: 'Authentication required',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error',
              },
            },
          },
        },
        403: {
          description: 'Access denied - Client or Admin role required',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error',
              },
            },
          },
        },
        500: {
          description: 'Internal server error',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error',
              },
            },
          },
        },
      },
    },
  ],
};

const router = Router();
RouteBuilder.buildRouteGroup(router, productRoutes);

export default router;

