import swaggerJsdoc from 'swagger-jsdoc';
import { SwaggerDefinition } from 'swagger-jsdoc';

const swaggerDefinition: SwaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Cherio API',
    version: '1.0.0',
    description: 'API documentation for Cherio backend',
    contact: {
      name: 'API Support',
    },
  },
  servers: [
    {
      url: process.env.API_URL || 'http://localhost:3001',
      description: 'Development server',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Enter JWT token',
      },
    },
    schemas: {
      Error: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            description: 'Error message',
          },
          error: {
            type: 'string',
            description: 'Error details',
          },
        },
      },
      User: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            format: 'uuid',
          },
          email: {
            type: 'string',
            format: 'email',
          },
          firstName: {
            type: 'string',
          },
          lastName: {
            type: 'string',
          },
          role: {
            type: 'string',
            enum: ['admin', 'member'],
          },
          emailVerified: {
            type: 'boolean',
          },
        },
      },
      LoginRequest: {
        type: 'object',
        required: ['email', 'password'],
        properties: {
          email: {
            type: 'string',
            format: 'email',
          },
          password: {
            type: 'string',
            format: 'password',
          },
        },
      },
      RegisterRequest: {
        type: 'object',
        required: ['email', 'password'],
        properties: {
          email: {
            type: 'string',
            format: 'email',
          },
          password: {
            type: 'string',
            format: 'password',
            minLength: 6,
          },
          firstName: {
            type: 'string',
          },
          lastName: {
            type: 'string',
          },
        },
      },
      TokenResponse: {
        type: 'object',
        properties: {
          accessToken: {
            type: 'string',
          },
          refreshToken: {
            type: 'string',
          },
        },
      },
      AuthResponse: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
          },
          user: {
            $ref: '#/components/schemas/User',
          },
          tokens: {
            $ref: '#/components/schemas/TokenResponse',
          },
        },
      },
      Bill: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            format: 'uuid',
          },
          title: {
            type: 'string',
          },
          amount: {
            type: 'number',
          },
          date: {
            type: 'string',
            format: 'date',
          },
          category: {
            type: 'string',
          },
          contractId: {
            type: 'string',
            format: 'uuid',
          },
          status: {
            type: 'string',
          },
          filePath: {
            type: 'string',
            nullable: true,
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
          },
          updatedAt: {
            type: 'string',
            format: 'date-time',
          },
        },
      },
      Contract: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            format: 'uuid',
          },
          title: {
            type: 'string',
          },
          description: {
            type: 'string',
          },
          startDate: {
            type: 'string',
            format: 'date',
          },
          endDate: {
            type: 'string',
            format: 'date',
          },
          provider: {
            type: 'string',
          },
          category: {
            type: 'string',
          },
          filePath: {
            type: 'string',
            nullable: true,
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
          },
          updatedAt: {
            type: 'string',
            format: 'date-time',
          },
        },
      },
      Product: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            format: 'uuid',
          },
          name: {
            type: 'object',
            description: 'Product name in multiple languages',
            properties: {
              fr: { type: 'string' },
              en: { type: 'string' },
              ar: { type: 'string' },
            },
            required: ['fr', 'en', 'ar'],
          },
          description: {
            type: 'object',
            description: 'Product description in multiple languages',
            properties: {
              fr: { type: 'string' },
              en: { type: 'string' },
              ar: { type: 'string' },
            },
            required: ['fr', 'en', 'ar'],
          },
          shortDescription: {
            type: 'object',
            description: 'Short product description in multiple languages',
            nullable: true,
            properties: {
              fr: { type: 'string' },
              en: { type: 'string' },
              ar: { type: 'string' },
            },
          },
          price: {
            type: 'number',
            description: 'Product price',
          },
          currency: {
            type: 'string',
            description: 'Currency code (e.g., EUR, USD)',
            default: 'EUR',
          },
          image: {
            type: 'string',
            description: 'Main product image URL',
          },
          images: {
            type: 'array',
            description: 'Additional product images',
            items: { type: 'string' },
            nullable: true,
          },
          video: {
            type: 'string',
            description: 'Product video URL',
            nullable: true,
          },
          links: {
            type: 'object',
            description: 'External product links',
            properties: {
              amazon: { type: 'string', nullable: true },
              etsy: { type: 'string', nullable: true },
              vinted: { type: 'string', nullable: true },
            },
          },
          featured: {
            type: 'boolean',
            description: 'Whether the product is featured',
            default: false,
          },
          category: {
            type: 'string',
            description: 'Product category',
            nullable: true,
          },
          sku: {
            type: 'string',
            description: 'Product SKU',
            nullable: true,
          },
          stock: {
            type: 'number',
            description: 'Product stock quantity',
            default: 0,
          },
          isActive: {
            type: 'boolean',
            description: 'Product active status',
            default: true,
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
          },
          updatedAt: {
            type: 'string',
            format: 'date-time',
          },
        },
      },
      CreateProductRequest: {
        type: 'object',
        required: ['name', 'description', 'price', 'image', 'links'],
        properties: {
          name: {
            type: 'object',
            description: 'Product name in multiple languages',
            properties: {
              fr: { type: 'string' },
              en: { type: 'string' },
              ar: { type: 'string' },
            },
            required: ['fr', 'en', 'ar'],
          },
          description: {
            type: 'object',
            description: 'Product description in multiple languages',
            properties: {
              fr: { type: 'string' },
              en: { type: 'string' },
              ar: { type: 'string' },
            },
            required: ['fr', 'en', 'ar'],
          },
          shortDescription: {
            type: 'object',
            description: 'Short product description in multiple languages',
            properties: {
              fr: { type: 'string' },
              en: { type: 'string' },
              ar: { type: 'string' },
            },
          },
          price: {
            type: 'number',
            description: 'Product price',
          },
          currency: {
            type: 'string',
            description: 'Currency code (e.g., EUR, USD)',
            default: 'EUR',
          },
          image: {
            type: 'string',
            description: 'Main product image URL',
          },
          images: {
            type: 'array',
            description: 'Additional product images',
            items: { type: 'string' },
          },
          video: {
            type: 'string',
            description: 'Product video URL',
          },
          links: {
            type: 'object',
            description: 'External product links',
            properties: {
              amazon: { type: 'string' },
              etsy: { type: 'string' },
              vinted: { type: 'string' },
            },
          },
          featured: {
            type: 'boolean',
            description: 'Whether the product is featured',
            default: false,
          },
          category: {
            type: 'string',
            description: 'Product category',
          },
          sku: {
            type: 'string',
            description: 'Product SKU',
          },
          stock: {
            type: 'number',
            description: 'Product stock quantity',
            default: 0,
          },
          isActive: {
            type: 'boolean',
            description: 'Product active status',
            default: true,
          },
        },
      },
      UpdateProductRequest: {
        type: 'object',
        properties: {
          name: {
            type: 'object',
            description: 'Product name in multiple languages',
            properties: {
              fr: { type: 'string' },
              en: { type: 'string' },
              ar: { type: 'string' },
            },
          },
          description: {
            type: 'object',
            description: 'Product description in multiple languages',
            properties: {
              fr: { type: 'string' },
              en: { type: 'string' },
              ar: { type: 'string' },
            },
          },
          shortDescription: {
            type: 'object',
            description: 'Short product description in multiple languages',
            properties: {
              fr: { type: 'string' },
              en: { type: 'string' },
              ar: { type: 'string' },
            },
          },
          price: {
            type: 'number',
            description: 'Product price',
          },
          currency: {
            type: 'string',
            description: 'Currency code (e.g., EUR, USD)',
          },
          image: {
            type: 'string',
            description: 'Main product image URL',
          },
          images: {
            type: 'array',
            description: 'Additional product images',
            items: { type: 'string' },
          },
          video: {
            type: 'string',
            description: 'Product video URL',
          },
          links: {
            type: 'object',
            description: 'External product links',
            properties: {
              amazon: { type: 'string' },
              etsy: { type: 'string' },
              vinted: { type: 'string' },
            },
          },
          featured: {
            type: 'boolean',
            description: 'Whether the product is featured',
          },
          category: {
            type: 'string',
            description: 'Product category',
          },
          sku: {
            type: 'string',
            description: 'Product SKU',
          },
          stock: {
            type: 'number',
            description: 'Product stock quantity',
          },
          isActive: {
            type: 'boolean',
            description: 'Product active status',
          },
        },
      },
      SearchProductsRequest: {
        type: 'object',
        properties: {
          keyword: {
            type: 'string',
            description: 'Search keyword (searches in name and description)',
          },
          locale: {
            type: 'string',
            description: 'Locale for keyword search (fr, en, ar)',
            enum: ['fr', 'en', 'ar'],
            default: 'en',
          },
          page: {
            type: 'number',
            description: 'Page number',
            default: 1,
          },
          limit: {
            type: 'number',
            description: 'Items per page',
            default: 10,
          },
          minPrice: {
            type: 'number',
            description: 'Minimum price filter',
          },
          maxPrice: {
            type: 'number',
            description: 'Maximum price filter',
          },
          isActive: {
            type: 'boolean',
            description: 'Filter by active status',
          },
          featured: {
            type: 'boolean',
            description: 'Filter by featured status',
          },
          category: {
            type: 'string',
            description: 'Filter by category',
          },
        },
      },
      ProductResponse: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
          },
          product: {
            $ref: '#/components/schemas/Product',
          },
        },
      },
      ProductsListResponse: {
        type: 'object',
        properties: {
          products: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/Product',
            },
          },
          pagination: {
            type: 'object',
            properties: {
              page: {
                type: 'number',
              },
              limit: {
                type: 'number',
              },
              total: {
                type: 'number',
              },
              totalPages: {
                type: 'number',
              },
              hasNextPage: {
                type: 'boolean',
              },
              hasPreviousPage: {
                type: 'boolean',
              },
            },
          },
        },
      },
    },
  },
};

const options: swaggerJsdoc.Options = {
  definition: swaggerDefinition,
  apis: ['./src/routes/**/*.ts', './src/controllers/**/*.ts'],
};

export const swaggerSpec = swaggerJsdoc(options);

