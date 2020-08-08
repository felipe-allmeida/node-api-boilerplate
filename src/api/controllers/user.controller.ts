import { Type } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsUUID, ValidateNested } from 'class-validator';
import { 
    Authorized, Body, Delete, Get, JsonController, OnUndefined, Param, Post, Put, Req 
} from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';

import { User } from 'src/api/models/user';
import { UserService } from 'src/api/services/user.service';

@Authorized()
@JsonController('/users')
@OpenAPI({ security: [{ basicAuth: [] }] })
export class UserController {
    constructor(
        private userService: UserService;
    ) {}
}