import {
    ConflictException,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { Outbox } from 'src/domain/entity/outbox.entity';
import { User } from 'src/domain/entity/user.entity';
import { adminAuth } from 'src/firebaseAdmin';
import { DataSource } from 'typeorm';

@Injectable()
export class RegisterService {
    constructor(private readonly dataSource: DataSource) { }

    async register(data: any) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const decodedToken = await adminAuth.verifyIdToken(data.tokenId);
            const email = decodedToken.email;
            if (!email) throw new UnauthorizedException('Invalid token, no email found');

            const existingUser = await queryRunner.manager.findOne(User, {
                where: { email: data.email },
            });

            if (existingUser) {
                throw new ConflictException('Email already registered');
            }

            const user = queryRunner.manager.create(User, {
                email: data.email,
            });

            await queryRunner.manager.save(user);

            const outbox = queryRunner.manager.create(Outbox, {
                message: {
                    id: user.id,
                    email: user.email,
                }
            })

            await queryRunner.manager.save(outbox);

            await queryRunner.commitTransaction();
            return {
                id: user.id,
                email: user.email,
            };
        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        } finally {
            await queryRunner.release();
        }
    }

}
