import { env } from 'src/env';
import { Application } from 'express';
import { createExpressServer } from 'routing-controllers';
import { authorizationChecker } from './auth/authorization-checker';
import { currentUserChecker } from './auth/current-user-checker';
import { AppSettings } from './appsettings';
import { getConnectionOptions, createConnection } from 'typeorm';

/* 
* Load environment variables from .env file, where you can provide API keys and passwords.
* By default dotenv loads the '.env' file.
*/

class App {
    public expressApp: Application;
    public appSettings: AppSettings;

    constructor() {
    }

    public async run(): Promise<this> {
        this.appSettings = new AppSettings();

        await this.loadTypeormSQL(this.appSettings);
        await this.loadExpress(this.appSettings);

        return this;
    }

    async loadTypeormSQL(settings: AppSettings): Promise<void> {
        const loadedConnectionOptions = await getConnectionOptions();
        const connectionOptions = Object.assign(loadedConnectionOptions, {
            type: env.sqlDb.type as any,
            host: env.sqlDb.host,
            port: env.sqlDb.port,
            username: env.sqlDb.username,
            password: env.sqlDb.password,
            database: env.sqlDb.database,
            synchronize: env.sqlDb.synchronize,
            logging: env.sqlDb.logging,
            migrations: env.app.dirs.migrations,
        });

        const connection = await createConnection(connectionOptions);
        
        settings.setData('sql-connection', connection);
    }

    async loadExpress(settings: AppSettings): Promise<void> {
        const connection = settings.getData('connection');

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