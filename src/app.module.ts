import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
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
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { FieldsModule } from './fields/fields.module';
import { FieldOptionsModule } from './field_options/field_options.module';
import { FormAccessModule } from './form_access/form_access.module';
import { dataSourceOptions } from './database/data-source';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    WinstonModule.forRoot(winstonConfig),
    AuthModule,
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        ...dataSourceOptions,
        migrationsRun: false,
        autoLoadEntities: true,
        logging: false,
        extra: {
          connectionLimit: 2,
          waitForConnections: true,
          queueLimit: 0,
          connectTimeout: 10000,
          enableKeepAlive: true,
          keepAliveInitialDelay: 10000,
        },

      })

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
    CloudinaryModule,
    FieldsModule,
    FieldOptionsModule,
    FormAccessModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
    consumer
      .apply(JwtMiddleware)
      .exclude(
        { path: '/users/(.*)', method: RequestMethod.ALL },
        { path: '/', method: RequestMethod.GET },
      )
      .forRoutes('*');
    consumer
      .apply(EmailVerificationMiddleware)
      .exclude(
        { path: '/users/verifyEmail/*', method: RequestMethod.ALL },
        { path: '/users/create', method: RequestMethod.POST },
        { path: '/users/login', method: RequestMethod.POST },
        { path: '/', method: RequestMethod.GET },
      )
      .forRoutes('*');
  }
}