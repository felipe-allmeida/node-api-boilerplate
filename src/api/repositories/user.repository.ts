import { EntityRepository, Repository } from 'typeorm';
import { User } from 'src/api/models/user';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    
}