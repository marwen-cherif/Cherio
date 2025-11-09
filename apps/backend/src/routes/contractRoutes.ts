import { Router } from 'express';
import { contractController, upload } from '../controllers/contractController';
import { authenticate } from '../middlewares/auth';
import { RouteGroup } from '../types/route';
import { RouteBuilder } from '../utils/routeBuilder';

/**
 * @swagger
 * tags:
 *   name: Contracts
 *   description: Contract management endpoints
 */

const contractRoutes: RouteGroup = {
  prefix: '/api/contracts',
  middlewares: [authenticate],
  routes: [
    /**
     * @swagger
     * /api/contracts:
     *   get:
     *     summary: Get all contracts
     *     tags: [Contracts]
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: List of contracts
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 contracts:
     *                   type: array
     *                   items:
     *                     $ref: '#/components/schemas/Contract'
     */
    {
      method: 'get',
      path: '/',
      handler: contractController.getAll,
      summary: 'Get all contracts',
      description: 'Retrieve all contracts',
      tags: ['Contracts'],
      security: [{ bearerAuth: [] }],
      responses: {
        200: {
          description: 'List of contracts',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  contracts: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/Contract',
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
     * /api/contracts/{id}:
     *   get:
     *     summary: Get contract by ID
     *     tags: [Contracts]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *         description: Contract ID
     *     responses:
     *       200:
     *         description: Contract details
     *       404:
     *         description: Contract not found
     */
    {
      method: 'get',
      path: '/:id',
      handler: contractController.getById,
      summary: 'Get contract by ID',
      description: 'Retrieve a specific contract by its ID',
      tags: ['Contracts'],
      security: [{ bearerAuth: [] }],
      params: [
        {
          name: 'id',
          type: 'uuid',
          required: true,
          description: 'Contract ID',
          in: 'path',
        },
      ],
      responses: {
        200: {
          description: 'Contract details',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  contract: {
                    $ref: '#/components/schemas/Contract',
                  },
                },
              },
            },
          },
        },
        404: {
          description: 'Contract not found',
        },
      },
    },
    /**
     * @swagger
     * /api/contracts:
     *   post:
     *     summary: Create a new contract
     *     tags: [Contracts]
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Contract'
     *     responses:
     *       201:
     *         description: Contract created successfully
     */
    {
      method: 'post',
      path: '/',
      handler: contractController.create,
      summary: 'Create a new contract',
      description: 'Create a new contract record',
      tags: ['Contracts'],
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Contract',
            },
          },
        },
      },
      responses: {
        201: {
          description: 'Contract created successfully',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  contract: {
                    $ref: '#/components/schemas/Contract',
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
     * /api/contracts/{id}:
     *   put:
     *     summary: Update contract
     *     tags: [Contracts]
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
     *             $ref: '#/components/schemas/Contract'
     *     responses:
     *       200:
     *         description: Contract updated successfully
     *       404:
     *         description: Contract not found
     */
    {
      method: 'put',
      path: '/:id',
      handler: contractController.update,
      summary: 'Update contract',
      description: 'Update an existing contract',
      tags: ['Contracts'],
      security: [{ bearerAuth: [] }],
      params: [
        {
          name: 'id',
          type: 'uuid',
          required: true,
          description: 'Contract ID',
          in: 'path',
        },
      ],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Contract',
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Contract updated successfully',
        },
        404: {
          description: 'Contract not found',
        },
      },
    },
    /**
     * @swagger
     * /api/contracts/{id}:
     *   delete:
     *     summary: Delete contract
     *     tags: [Contracts]
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
     *         description: Contract deleted successfully
     *       404:
     *         description: Contract not found
     */
    {
      method: 'delete',
      path: '/:id',
      handler: contractController.delete,
      summary: 'Delete contract',
      description: 'Delete a contract by ID',
      tags: ['Contracts'],
      security: [{ bearerAuth: [] }],
      params: [
        {
          name: 'id',
          type: 'uuid',
          required: true,
          description: 'Contract ID',
          in: 'path',
        },
      ],
      responses: {
        200: {
          description: 'Contract deleted successfully',
        },
        404: {
          description: 'Contract not found',
        },
      },
    },
    /**
     * @swagger
     * /api/contracts/{id}/upload:
     *   post:
     *     summary: Upload contract file
     *     tags: [Contracts]
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
     *         description: Contract not found
     */
    {
      method: 'post',
      path: '/:id/upload',
      handler: [upload.single('file'), contractController.uploadFile],
      summary: 'Upload contract file',
      description: 'Upload a file for a contract',
      tags: ['Contracts'],
      security: [{ bearerAuth: [] }],
      params: [
        {
          name: 'id',
          type: 'uuid',
          required: true,
          description: 'Contract ID',
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
          description: 'Contract not found',
        },
      },
    },
    /**
     * @swagger
     * /api/contracts/{id}/download:
     *   get:
     *     summary: Download contract file
     *     tags: [Contracts]
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
      handler: contractController.downloadFile,
      summary: 'Download contract file',
      description: 'Download the file associated with a contract',
      tags: ['Contracts'],
      security: [{ bearerAuth: [] }],
      params: [
        {
          name: 'id',
          type: 'uuid',
          required: true,
          description: 'Contract ID',
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
RouteBuilder.buildRouteGroup(router, contractRoutes);

export default router;
