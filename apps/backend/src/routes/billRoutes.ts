import { Router } from 'express';
import { billController, upload } from '../controllers/billController';
import { authenticate } from '../middlewares/auth';
import { RouteGroup } from '../types/route';
import { RouteBuilder } from '../utils/routeBuilder';

/**
 * @swagger
 * tags:
 *   name: Bills
 *   description: Bill management endpoints
 */

const billRoutes: RouteGroup = {
  prefix: '/api/bills',
  middlewares: [authenticate],
  routes: [
    /**
     * @swagger
     * /api/bills:
     *   get:
     *     summary: Get all bills
     *     tags: [Bills]
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: List of bills
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 bills:
     *                   type: array
     *                   items:
     *                     $ref: '#/components/schemas/Bill'
     */
    {
      method: 'get',
      path: '/',
      handler: billController.getAll,
      summary: 'Get all bills',
      description: 'Retrieve all bills',
      tags: ['Bills'],
      security: [{ bearerAuth: [] }],
      responses: {
        200: {
          description: 'List of bills',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  bills: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/Bill',
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    /**
     * @swagger
     * /api/bills/{id}:
     *   get:
     *     summary: Get bill by ID
     *     tags: [Bills]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *         description: Bill ID
     *     responses:
     *       200:
     *         description: Bill details
     *       404:
     *         description: Bill not found
     */
    {
      method: 'get',
      path: '/:id',
      handler: billController.getById,
      summary: 'Get bill by ID',
      description: 'Retrieve a specific bill by its ID',
      tags: ['Bills'],
      security: [{ bearerAuth: [] }],
      params: [
        {
          name: 'id',
          type: 'uuid',
          required: true,
          description: 'Bill ID',
          in: 'path',
        },
      ],
      responses: {
        200: {
          description: 'Bill details',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  bill: {
                    $ref: '#/components/schemas/Bill',
                  },
                },
              },
            },
          },
        },
        404: {
          description: 'Bill not found',
        },
      },
    },
    /**
     * @swagger
     * /api/bills:
     *   post:
     *     summary: Create a new bill
     *     tags: [Bills]
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Bill'
     *     responses:
     *       201:
     *         description: Bill created successfully
     */
    {
      method: 'post',
      path: '/',
      handler: billController.create,
      summary: 'Create a new bill',
      description: 'Create a new bill record',
      tags: ['Bills'],
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Bill',
            },
          },
        },
      },
      responses: {
        201: {
          description: 'Bill created successfully',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  bill: {
                    $ref: '#/components/schemas/Bill',
                  },
                },
              },
            },
          },
        },
      },
    },
    /**
     * @swagger
     * /api/bills/{id}:
     *   put:
     *     summary: Update bill
     *     tags: [Bills]
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
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Bill'
     *     responses:
     *       200:
     *         description: Bill updated successfully
     *       404:
     *         description: Bill not found
     */
    {
      method: 'put',
      path: '/:id',
      handler: billController.update,
      summary: 'Update bill',
      description: 'Update an existing bill',
      tags: ['Bills'],
      security: [{ bearerAuth: [] }],
      params: [
        {
          name: 'id',
          type: 'uuid',
          required: true,
          description: 'Bill ID',
          in: 'path',
        },
      ],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Bill',
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Bill updated successfully',
        },
        404: {
          description: 'Bill not found',
        },
      },
    },
    /**
     * @swagger
     * /api/bills/{id}:
     *   delete:
     *     summary: Delete bill
     *     tags: [Bills]
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
     *         description: Bill deleted successfully
     *       404:
     *         description: Bill not found
     */
    {
      method: 'delete',
      path: '/:id',
      handler: billController.delete,
      summary: 'Delete bill',
      description: 'Delete a bill by ID',
      tags: ['Bills'],
      security: [{ bearerAuth: [] }],
      params: [
        {
          name: 'id',
          type: 'uuid',
          required: true,
          description: 'Bill ID',
          in: 'path',
        },
      ],
      responses: {
        200: {
          description: 'Bill deleted successfully',
        },
        404: {
          description: 'Bill not found',
        },
      },
    },
    /**
     * @swagger
     * /api/bills/{id}/upload:
     *   post:
     *     summary: Upload bill file
     *     tags: [Bills]
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
     *       content:
     *         multipart/form-data:
     *           schema:
     *             type: object
     *             properties:
     *               file:
     *                 type: string
     *                 format: binary
     *     responses:
     *       200:
     *         description: File uploaded successfully
     *       400:
     *         description: No file uploaded
     *       404:
     *         description: Bill not found
     */
    {
      method: 'post',
      path: '/:id/upload',
      handler: [upload.single('file'), billController.uploadFile],
      summary: 'Upload bill file',
      description: 'Upload a file for a bill',
      tags: ['Bills'],
      security: [{ bearerAuth: [] }],
      params: [
        {
          name: 'id',
          type: 'uuid',
          required: true,
          description: 'Bill ID',
          in: 'path',
        },
        {
          name: 'file',
          type: 'string',
          required: true,
          description: 'File to upload (PDF, JPEG, PNG, DOC, DOCX)',
          in: 'body',
        },
      ],
      responses: {
        200: {
          description: 'File uploaded successfully',
        },
        400: {
          description: 'No file uploaded',
        },
        404: {
          description: 'Bill not found',
        },
      },
    },
    /**
     * @swagger
     * /api/bills/{id}/download:
     *   get:
     *     summary: Download bill file
     *     tags: [Bills]
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
     *         description: File download
     *         content:
     *           application/octet-stream:
     *             schema:
     *               type: string
     *               format: binary
     *       404:
     *         description: File not found
     */
    {
      method: 'get',
      path: '/:id/download',
      handler: billController.downloadFile,
      summary: 'Download bill file',
      description: 'Download the file associated with a bill',
      tags: ['Bills'],
      security: [{ bearerAuth: [] }],
      params: [
        {
          name: 'id',
          type: 'uuid',
          required: true,
          description: 'Bill ID',
          in: 'path',
        },
      ],
      responses: {
        200: {
          description: 'File download',
        },
        404: {
          description: 'File not found',
        },
      },
    },
  ],
};

const router = Router();
RouteBuilder.buildRouteGroup(router, billRoutes);

export default router;
