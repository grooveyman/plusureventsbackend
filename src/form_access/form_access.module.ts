import { Module } from '@nestjs/common';
import { FormAccessService } from './form_access.service';
import { FormAccessController } from './form_access.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormAccess } from './entities/form_access.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
      TypeOrmModule.forFeature([FormAccess]),
      AuthModule
    ],
  controllers: [FormAccessController],
  providers: [FormAccessService],
})
export class FormAccessModule {}
