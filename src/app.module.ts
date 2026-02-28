import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AttendeeModule } from './attendee/attendee.module';
import { UsersModule } from './users/users.module';
import { EventsModule } from './events/events.module';
import { TicketsModule } from './tickets/tickets.module';
import { FeedbacksModule } from './feedbacks/feedbacks.module';
import { BroadcastsModule } from './broadcasts/broadcasts.module';
import { AccountsModule } from './accounts/accounts.module';
import { TransactionsModule } from './transactions/transactions.module';
import { WinstonModule } from 'nest-winston';
import { winstonConfig } from './logger/winston.config';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { MailModule } from './mail/mail.module';
import { AuthModule } from './auth/auth.module';
import { JwtMiddleware } from './middleware/jwt.middleware';
import { EmailVerificationMiddleware } from './middleware/email-verified.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',  
    }),
    WinstonModule.forRoot(winstonConfig),
    AuthModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [join(process.cwd(), 'dist', '**', '*.entity{.ts,.js}')],
        synchronize: true,
      }),
    }),
    AttendeeModule,
    UsersModule,
    EventsModule,
    TicketsModule,
    FeedbacksModule,
    BroadcastsModule,
    AccountsModule,
    TransactionsModule,
    MailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');

    //apply jwt middleware to all routes except registration and email verification
    consumer.apply(JwtMiddleware).exclude({path:'/users/(.*)', method:RequestMethod.ALL}).forRoutes('*');

    consumer.apply(EmailVerificationMiddleware).exclude(
      { path: '/users/(.*)', method: RequestMethod.ALL},
    ).forRoutes('*');
  }
}
