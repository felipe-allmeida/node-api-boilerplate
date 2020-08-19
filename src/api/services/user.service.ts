import { Service } from 'typedi';
import { v1 } from 'uuid';
import { OrmRepository } from 'typeorm-typedi-extensions';
import { UserRepository } from '../repositories/user.repository';
import { Logger, LoggerInterface } from 'src/decorators/logger.decorator';
import { EventDispatcherInterface, EventDispatcher } from 'src/decorators/event-dispatcher';
import { User } from '../models/user';
import { Notifications } from '../notifications/notifications';

@Service()
export class UserService {
    constructor(
        @OrmRepository() private userRepository: UserRepository,
        @EventDispatcher() private eventDispatcher: EventDispatcherInterface,
        @Logger(__filename) private log: LoggerInterface
    ) {}

    public find(): Promise<User[]> {
        this.log.info('Find all users');
        return this.userRepository.find({ relations: ['pets'] });
    }

    public findOne(id: string): Promise<User | undefined> {
        this.log.info('Find one user');
        return this.userRepository.findOne({ id });
    }

    public async create(user: User): Promise<User> {
        this.log.info('Create a new user => ', user.toString());
        user.id = v1();
        const newUser = await this.userRepository.save(user);
        this.eventDispatcher.dispatch(Notifications.user.created, newUser);
        return newUser;
    }

    public update(id: string, user: User): Promise<User> {
        this.log.info('Update a user');
        user.id = id;
        return this.userRepository.save(user);
    }

    public async delete(id: string): Promise<void> {
        this.log.info('Delete a user');
        await this.userRepository.delete(id);
        return;
    }

}
