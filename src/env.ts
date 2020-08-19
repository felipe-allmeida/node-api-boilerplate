import { getOsEnv, toBool, getOsEnvOptional, normalizePort, getOsPaths, toNumber } from './utils';

export const env = {
    node: process.env.NODE_ENV || 'development',
    isProduction: process.env.NODE_ENV === 'production',
    isTest: process.env.NODE_ENV === 'test',
    isDevelopment: process.env.NODE_ENV === 'development',
    app: {
        name: getOsEnv('APP_NAME'),
        host: getOsEnv('APP_HOST'),
        schema: getOsEnv('APP_SCHEMA'),
        routePrefix: getOsEnv('APP_ROUTE_PREFIX'),
        port: normalizePort(process.env.PORT || getOsEnv('APP_PORT')),
        dirs: {
            migrations: getOsPaths('TYPEORM_SQL_MIGRATIONS'),
            migrationsDir: getOsPaths('TYPEORM_SQL_MIGRATIONS_DIR'),
            controllers: getOsPaths('CONTROLLERS'),
            middlewares: getOsPaths('MIDDLEWARES'),
            interceptors: getOsPaths('INTERCEPTORS'),
        }
    },
    sqlDb: {
        type: getOsEnv('TYPEORM_SQL_CONNECTION'),
        host: getOsEnvOptional('TYPEORM_SQL_HOST'),
        port: toNumber(getOsEnv('TYPEORM_SQL_PORT')),
        username: getOsEnvOptional('TYPEORM_SQL_USERNAME'),
        password: getOsEnvOptional('TYPEORM_SQL_PASSWORD'),
        database: getOsEnv('TYPEORM_SQL_DATABASE'),
        synchronize: toBool(getOsEnv('TYPEORM_SQL_SYNCHRONIZE')),
        logging: getOsEnv('TYPEORM_SQL_LOGGING'),
    },
    log: {
        level: getOsEnv('LOG_LEVEL'),
        json: toBool(getOsEnv('LOG_JSON')),
        output: getOsEnv('LOG_OUTPUT')
    },
    swagger: {
        enabled: toBool(getOsEnv('SWAGGER_ENABLED')),
        route: getOsEnv('SWAGGER_ROUTE'),
        username: getOsEnv('SWAGGER_USERNAME'),
        password: getOsEnv('SWAGGER_PASSWORD'),
    }
};
