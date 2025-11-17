import { Router } from 'express';
import * as contactController from '../controllers/contactController';
import { RouteGroup } from '../types/route';
import { RouteBuilder } from '../utils/routeBuilder';

/**
 * @swagger
 * tags:
 *   name: Contact
 *   description: Contact form endpoints
 */

const contactRoutes: RouteGroup = {
  prefix: '/api/contact',
  routes: [
    /**
     * @swagger
     * /api/contact:
     *   post:
     *     summary: Send contact form email
     *     description: "Send an email from the contact form via Mailjet"
     *     tags: [Contact]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required:
     *               - name
     *               - email
     *               - subject
     *               - message
     *             properties:
     *               name:
     *                 type: string
     *                 description: Sender's name
     *               email:
     *                 type: string
     *                 format: email
     *                 description: Sender's email address
     *               subject:
     *                 type: string
     *                 description: Email subject
     *               message:
     *                 type: string
     *                 description: Email message content
     *     responses:
     *       200:
     *         description: Email sent successfully
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                 message:
     *                   type: string
     *       400:
     *         description: Bad request - missing or invalid fields
     *       500:
     *         description: Internal server error
     */
    {
      method: 'post',
      path: '/',
      handler: contactController.sendContactEmail,
      middlewares: [],
      summary: 'Send contact form email',
      description: 'Send an email from the contact form via Mailjet',
      tags: ['Contact'],
      params: [
        {
          name: 'name',
          type: 'string',
          required: true,
          description: "Nom de l'expéditeur",
          in: 'body',
        },
        {
          name: 'email',
          type: 'string',
          required: true,
          description: "Email de l'expéditeur",
          in: 'body',
        },
        {
          name: 'subject',
          type: 'string',
          required: true,
          description: 'Sujet du message',
          in: 'body',
        },
        {
          name: 'message',
          type: 'string',
          required: true,
          description: 'Contenu du message',
          in: 'body',
        },
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['name', 'email', 'subject', 'message'],
              properties: {
                name: {
                  type: 'string',
                },
                email: {
                  type: 'string',
                  format: 'email',
                },
                subject: {
                  type: 'string',
                },
                message: {
                  type: 'string',
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Email envoyé avec succès',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: {
                    type: 'boolean',
                  },
                  message: {
                    type: 'string',
                  },
                },
              },
            },
          },
        },
        400: {
          description: 'Requête invalide - champs manquants ou invalides',
        },
        500: {
          description: 'Erreur serveur',
        },
      },
    },
  ],
};

const router = Router();
RouteBuilder.buildRouteGroup(router, contactRoutes);

export default router;

