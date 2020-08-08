import express from 'express';

import session from 'express-session';

import mongoose from 'mongoose';

import { env } from 'src/env';
import { Application } from 'express';
import { createExpressServer } from 'routing-controllers';

/* 
* Load environment variables from .env file, where you can provide API keys and passwords.
* By default dotenv loads the '.env' file.
*/

class App {
    public expressApp: Application;

    constructor() {
        this.expressApp = createExpressServer({
            cors: true,
            classTransformer: true,
            routePrefix: env.app.routePrefix,
            defaultErrorHandler: false,
            /**
             * Here we specify what controllers should be registered in our express server.
             */
            controllers: env.app.dirs.controllers,
            middlewares: env.app.dirs.middlewares,
            interceptors: env.app.dirs.interceptors,
            /**
             * Authorization features
             */
            authorizationChecker: authorizationChecker(connection),
            currentUserChecker: currentUserChecker(connection)
        });
    }
}

export default App;