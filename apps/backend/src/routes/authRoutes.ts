import { Router } from 'express';
import * as authController from '../controllers/authController';
import { authenticate } from '../middlewares/auth';
import { RouteGroup } from '../types/route';
import { RouteBuilder } from '../utils/routeBuilder';

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication endpoints
 */

const authRoutes: RouteGroup = {
  prefix: '/api/auth',
  routes: [
    /**
     * @swagger
     * /api/auth/login:
     *   post:
     *     summary: Login user
     *     tags: [Auth]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/LoginRequest'
     *     responses:
     *       200:
     *         description: Login successful
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/AuthResponse'
     *       400:
     *         description: Bad request
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Error'
     *       401:
     *         description: Invalid credentials
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Error'
     */
    {
      method: 'post',
      path: '/login',
      handler: authController.login,
      summary: 'Login user',
      description: 'Authenticate user with email and password',
      tags: ['Auth'],
      params: [
        {
          name: 'email',
          type: 'string',
          required: true,
          description: 'User email address',
          in: 'body',
        },
        {
          name: 'password',
          type: 'string',
          required: true,
          description: 'User password',
          in: 'body',
        },
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/LoginRequest',
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Login successful',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/AuthResponse',
              },
            },
          },
        },
        400: {
          description: 'Bad request',
        },
        401: {
          description: 'Invalid credentials',
        },
      },
    },
    /**
     * @swagger
     * /api/auth/register:
     *   post:
     *     summary: Register new user
     *     tags: [Auth]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/RegisterRequest'
     *     responses:
     *       201:
     *         description: User registered successfully
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/AuthResponse'
     *       400:
     *         description: Bad request
     *       409:
     *         description: Email already in use
     */
    {
      method: 'post',
      path: '/register',
      handler: authController.register,
      summary: 'Register new user',
      description: 'Create a new user account',
      tags: ['Auth'],
      params: [
        {
          name: 'email',
          type: 'string',
          required: true,
          description: 'User email address',
          in: 'body',
        },
        {
          name: 'password',
          type: 'string',
          required: true,
          description: 'User password (min 6 characters)',
          in: 'body',
        },
        {
          name: 'firstName',
          type: 'string',
          required: false,
          description: 'User first name',
          in: 'body',
        },
        {
          name: 'lastName',
          type: 'string',
          required: false,
          description: 'User last name',
          in: 'body',
        },
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/RegisterRequest',
            },
          },
        },
      },
      responses: {
        201: {
          description: 'User registered successfully',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/AuthResponse',
              },
            },
          },
        },
        400: {
          description: 'Bad request',
        },
        409: {
          description: 'Email already in use',
        },
      },
    },
    /**
     * @swagger
     * /api/auth/refresh-token:
     *   post:
     *     summary: Refresh access token
     *     tags: [Auth]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required:
     *               - refreshToken
     *             properties:
     *               refreshToken:
     *                 type: string
     *     responses:
     *       200:
     *         description: Token refreshed successfully
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     *                 tokens:
     *                   $ref: '#/components/schemas/TokenResponse'
     *       401:
     *         description: Invalid or expired refresh token
     */
    {
      method: 'post',
      path: '/refresh-token',
      handler: authController.refreshToken,
      summary: 'Refresh access token',
      description: 'Get a new access token using refresh token',
      tags: ['Auth'],
      params: [
        {
          name: 'refreshToken',
          type: 'string',
          required: true,
          description: 'Refresh token',
          in: 'body',
        },
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['refreshToken'],
              properties: {
                refreshToken: {
                  type: 'string',
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Token refreshed successfully',
        },
        401: {
          description: 'Invalid or expired refresh token',
        },
      },
    },
    /**
     * @swagger
     * /api/auth/logout:
     *   post:
     *     summary: Logout user
     *     tags: [Auth]
     *     requestBody:
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               refreshToken:
     *                 type: string
     *     responses:
     *       200:
     *         description: Logout successful
     */
    {
      method: 'post',
      path: '/logout',
      handler: authController.logout,
      summary: 'Logout user',
      description: 'Invalidate refresh token',
      tags: ['Auth'],
      params: [
        {
          name: 'refreshToken',
          type: 'string',
          required: false,
          description: 'Refresh token to invalidate',
          in: 'body',
        },
      ],
      responses: {
        200: {
          description: 'Logout successful',
        },
      },
    },
    /**
     * @swagger
     * /api/auth/profile:
     *   get:
     *     summary: Get current user profile
     *     tags: [Auth]
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: User profile
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 user:
     *                   $ref: '#/components/schemas/User'
     *       401:
     *         description: Authentication required
     */
    {
      method: 'get',
      path: '/profile',
      handler: authController.getProfile,
      middlewares: [authenticate],
      summary: 'Get current user profile',
      description: 'Get authenticated user profile information',
      tags: ['Auth'],
      security: [{ bearerAuth: [] }],
      responses: {
        200: {
          description: 'User profile',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  user: {
                    $ref: '#/components/schemas/User',
                  },
                },
              },
            },
          },
        },
        401: {
          description: 'Authentication required',
        },
      },
    },
  ],
};

const router = Router();
RouteBuilder.buildRouteGroup(router, authRoutes);

export default router;
