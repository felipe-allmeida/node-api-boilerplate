import * as express from 'express';
import * as bodyParser from 'body-parser';
import { ExpressMiddlewareInterface, Middleware } from 'routing-controllers';

@Middleware({ type: 'before' })
export class SecurityMiddleware implements ExpressMiddlewareInterface {
    public use(req: express.Request, res: express.Response, next: express.NextFunction): any {
        return bodyParser.urlencoded({ extended: false })(req, res, next);
    }
}
