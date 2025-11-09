import { Router, RequestHandler } from 'express';
import { RouteDefinition, RouteGroup, RouteHandler } from '../types/route';

/**
 * Builds Express routes from route definitions
 */
export class RouteBuilder {
  /**
   * Builds a single route from a route definition
   */
  static buildRoute(router: Router, definition: RouteDefinition): void {
    const { method, path, handler, middlewares = [] } = definition;

    // Combine middlewares and handler
    // Convert RouteHandler to RequestHandler by wrapping if needed
    const handlerArray = Array.isArray(handler) ? handler : [handler];
    const wrappedHandlers = handlerArray.map((h) => {
      // Express can handle handlers that return Response, so we cast it
      return h as unknown as RequestHandler;
    });

    const handlers: RequestHandler[] = [
      ...(Array.isArray(middlewares) ? middlewares : [middlewares]).flat(),
      ...wrappedHandlers
    ].filter(Boolean) as RequestHandler[];

    // Register the route
    router[method](path, ...handlers);
  }

  /**
   * Builds multiple routes from a route group
   */
  static buildRouteGroup(router: Router, group: RouteGroup): void {
    const { prefix, routes, middlewares = [] } = group;

    // Apply group-level middlewares if any
    const groupMiddlewares = (Array.isArray(middlewares) ? middlewares : [middlewares])
      .flat()
      .filter(Boolean) as RequestHandler[];

    if (groupMiddlewares.length > 0) {
      router.use(prefix, ...groupMiddlewares);
    }

    // Build each route in the group
    routes.forEach((route) => {
      const fullPath = route.path.startsWith('/') 
        ? `${prefix}${route.path}` 
        : `${prefix}/${route.path}`;
      
      const routeWithPrefix: RouteDefinition = {
        ...route,
        path: fullPath
      };

      this.buildRoute(router, routeWithPrefix);
    });
  }

  /**
   * Builds routes from multiple route groups
   */
  static buildRoutes(router: Router, groups: RouteGroup[]): void {
    groups.forEach((group) => {
      this.buildRouteGroup(router, group);
    });
  }
}

