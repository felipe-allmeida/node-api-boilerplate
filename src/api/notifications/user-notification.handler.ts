import { EventSubscriber, On } from 'event-dispatch';

import { Notifications } from './notifications';
import { Logger } from 'src/utils/logger';
import { User } from '../models/user';

const log = new Logger(__filename);

@EventSubscriber()
export class UserEventSubscriber {
    @On(Notifications.user.created)
    public onUserCreate(user: User): void {
        log.info(`User ${user.toString()} created`);
    }
}