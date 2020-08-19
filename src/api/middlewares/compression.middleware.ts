import compression from 'compression';

import { ExpressMiddlewareInterface, Middleware } from 'routing-controllers';

@Middleware({ type: 'before' })
export class CompressionMiddleware implements ExpressMiddlewareInterface {
    use(request: any, response: any, next: (err?: any) => any) {
        return compression()(request, response, next);
    }
}
