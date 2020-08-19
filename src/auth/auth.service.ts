import * as express from 'express';

import { Service } from 'typedi';
import { Logger, LoggerInterface } from 'src/decorators/logger.decorator';
import { OrmRepository } from 'typeorm-typedi-extensions';
import { User } from 'src/api/models/user';
import { UserRepository } from 'src/api/repositories/user.repository';

@Service()
export class AuthService {
    constructor(
        @Logger(__filename) private log: LoggerInterface,
        @OrmRepository() private userRepository: UserRepository,
    ) {}

    public parseBasicAuthFromRequest(request: express.Request): { username: string; password: string} | null {
        const authorization = request.header('authorization');

        if (authorization && authorization.split(' ')[0] === 'Basic') {
            this.log.info('Credentials provided by the client');
            const decodedBase64 = Buffer.from(authorization.split(' ')[1], 'base64').toString('ascii');
            const username = decodedBase64.split(':')[0];
            const password = decodedBase64.split(':')[1];
            if (username && password) {
                return { username, password };
            }
        }

        this.log.info('No credentials provided by the client');
        return null;
    }

    public async validateUser(username: string, password: string): Promise<User | null> {
        const user = await this.userRepository.findOne({
            where: {
                username,
            },
        });

        if (!user) { return null; }

        if (await User.comparePassword(user, password)) {
            return user;
        }

        return null;
    }
}
