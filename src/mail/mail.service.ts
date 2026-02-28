// src/mail/mail.service.ts
import { Injectable, Inject, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import * as nodemailer from 'nodemailer';
import * as fs from "fs";
import { join } from 'path';

@Injectable()
export class MailService implements OnModuleInit {
    private transporter: nodemailer.Transporter;
    constructor(
        private readonly configService: ConfigService,
        @Inject(WINSTON_MODULE_NEST_PROVIDER)
        private readonly logger: Logger,
    ) { }

    onModuleInit() {
        this.transporter = nodemailer.createTransport({
            host: this.configService.get('MAIL_HOST'),
            port: this.configService.get<number>('MAIL_PORT'),
            secure: true,
            auth: {
                user: this.configService.get('MAIL_USER'),
                pass: this.configService.get('MAIL_PASS'),
            },
            tls: {
                rejectUnauthorized: false,
            },
        });

        this.transporter.verify((error, success) => {
            if (error) {
                this.logger.error(`Mail transporter failed: ${error.message}`, error.stack, MailService.name);
            } else {
                this.logger.log('Mail transporter initialized', MailService.name);

            }
        })
    }

    async sendWelcomeEmail(to: string, name: string) {
        try {
            await this.transporter.sendMail({
                from: `"No Reply" <${this.configService.get('MAIL_FROM')}>`,
                to,
                subject: 'Welcome!',
                html: `
          <h1>Welcome ${name}!</h1>
          <p>Thank you for registering.</p>
        `,
            });
            this.logger.log(`Welcome email sent to ${to}`, MailService.name);
        } catch (err) {
            this.logger.error(`Failed to send email to ${to}`, err.stack, MailService.name);
            throw err;
        }
    }

    async sendVerificationEmail(to: string, name: string, token: string) {
        const verificationLink = `${this.configService.get('APP_URL')}/api/v1/attendees/verifyEmail/${token}`;
        try {

            await this.transporter.sendMail({
                from: `"No Reply" <${this.configService.get('MAIL_FROM')}>`,
                to,
                subject: 'Welcome!',
                html: fs.readFileSync(join(__dirname, 'templates', 'confirmation.hbs'), 'utf8').replace('{{name}}', name).replace('{{verificationLink}}', verificationLink).replace('{{year}}', new Date().getFullYear().toString()),
            });
            this.logger.log(`Welcome email sent to ${to}`, MailService.name);
        } catch (err: any) {
            this.logger.error(`Failed to send email to ${to}`, err.stack, MailService.name);
            throw err;
        }
    }


    async sendResetPasswordEmail(to: string, name: string, resetLink: string) {
        try {
            await this.transporter.sendMail({
                from: `"No Reply" <${this.configService.get('MAIL_FROM')}>`,
                to,
                subject: 'Reset Your Password',
                html: `
          <h1>Hi ${name}!</h1>
          <p>Click the link below to reset your password:</p>
          <a href="${resetLink}">Reset Password</a>
        `,
            });
            this.logger.log(`Reset password email sent to ${to}`, MailService.name);
        } catch (err) {
            this.logger.error(`Failed to send reset email to ${to}`, err.stack, MailService.name);
            throw err;
        }
    }
}