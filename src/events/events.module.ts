import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailModule } from '../mail/mail.module';
import { AuthModule } from '../auth/auth.module';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import { UsersModule } from '../users/users.module';
import { Event } from './entities/event.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Event]),
    AuthModule,
    MailModule,
    CloudinaryModule,
    UsersModule,
  ],
  controllers: [EventsController],
  providers: [EventsService, CloudinaryService],
})
export class EventsModule {}
