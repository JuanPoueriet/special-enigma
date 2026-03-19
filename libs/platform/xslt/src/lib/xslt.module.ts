import { Module } from '@nestjs/common';
import { XsltService } from './xslt.service';

@Module({
  providers: [XsltService],
  exports: [XsltService],
})
export class XsltModule {}
