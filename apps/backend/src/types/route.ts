import { Request, Response, NextFunction, RequestHandler } from 'express';

export type HttpMethod = 'get' | 'post' | 'put' | 'patch' | 'delete';

// Custom handler type that allows returning Response (for early returns)
// This is more flexible than RequestHandler to accommodate controllers that may return Response
// Using a more permissive type to match actual controller implementations
export type RouteHandler = RequestHandler | ((req: Request, res: Response) => Promise<any> | any);

export interface RouteParam {
  name: string;
  type: 'string' | 'number' | 'boolean' | 'uuid';
  required?: boolean;
  description?: string;
  in: 'path' | 'query' | 'body';
}

export interface RouteDefinition {
  method: HttpMethod;
  path: string;
  handler: RouteHandler | RouteHandler[];
  middlewares?: Array<RequestHandler | RequestHandler[]>;
  summary?: string;
  description?: string;
  tags?: string[];
  params?: RouteParam[];
  requestBody?: {
    required?: boolean;
    content?: {
      'application/json'?: {
        schema: Record<string, any>;
      };
    };
  };
  responses?: {
    [statusCode: number]: {
      description: string;
      content?: {
        'application/json'?: {
          schema: Record<string, any>;
        };
      };
    };
  };
  security?: Array<{ [key: string]: string[] }>;
}

export interface RouteGroup {
  prefix: string;
  routes: RouteDefinition[];
  middlewares?: Array<RequestHandler | RequestHandler[]>;
}

