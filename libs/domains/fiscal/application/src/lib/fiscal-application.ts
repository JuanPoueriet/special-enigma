import { Module } from '@nestjs/common';
import { CreateDeclarationUseCase } from './use-cases/create-declaration.use-case';

@Module({
  providers: [CreateDeclarationUseCase],
  exports: [CreateDeclarationUseCase]
})
export class FiscalApplicationModule {}
