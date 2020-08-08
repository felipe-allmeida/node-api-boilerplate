import * as morgan from 'morgan';

import { env } from 'src/env';
import { ExpressMiddlewareInterface, Middleware } from 'routing-controllers';
import { Logger } from 'src/utils/logger';

@Middleware({ type: 'before' })
export class LogMiddleware implements ExpressMiddlewareInterface {
    private log = new Logger(__dirname);

    use(request: any, response: any, next: (err?: any) => any) {
        return morgan.default(env.log.output, {
            stream: {
                write: this.log.info.bind(this.log),
            },
        })(request, response, next);
    }
}
