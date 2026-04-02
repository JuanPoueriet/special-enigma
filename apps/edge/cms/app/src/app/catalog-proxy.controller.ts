import { Controller, Get, Param, Inject, OnModuleInit, ParseIntPipe } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';

interface CatalogService {
  getProduct(data: { id: number }): Observable<any>;
}

@Controller('cms/catalog')
export class CatalogProxyController implements OnModuleInit {
  private catalogService: CatalogService;

  constructor(@Inject('CATALOG_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.catalogService = this.client.getService<CatalogService>('CatalogService');
  }

  @Get('products/:id')
  getProduct(@Param('id', ParseIntPipe) id: number) {
    return this.catalogService.getProduct({ id });
  }
}
