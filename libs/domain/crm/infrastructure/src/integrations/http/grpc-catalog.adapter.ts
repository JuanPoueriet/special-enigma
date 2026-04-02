import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client, ClientGrpc, Transport } from '@nestjs/microservices';
import { CATALOG_PACKAGE, CATALOG_PROTO_PATH } from '@virtex/shared-proto';
import { type CatalogService, type Product } from '@virtex/domain-crm-domain';
import { firstValueFrom } from 'rxjs';

interface CatalogGrpcService {
  getProduct(data: { id: number }): Promise<Product>;
}

@Injectable()
export class GrpcCatalogAdapter implements CatalogService, OnModuleInit {
  private readonly logger = new Logger(GrpcCatalogAdapter.name);
  private catalogGrpcService: CatalogGrpcService;

  @Client({
    transport: Transport.GRPC,
    options: {
      package: CATALOG_PACKAGE,
      protoPath: CATALOG_PROTO_PATH,
      url: process.env['CATALOG_GRPC_URL'] || 'virtex-catalog-service:50051',
    },
  })
  private client: ClientGrpc;

  constructor(
    private readonly configService: ConfigService
  ) {}

  onModuleInit() {
    this.catalogGrpcService = this.client.getService<CatalogGrpcService>('CatalogService');
  }

  async getProductById(id: number): Promise<Product | null> {
    try {
      const product = await firstValueFrom((this.catalogGrpcService as any).getProduct({ id }));
      if (!product) return null;
      return {
          id: product.id,
          name: product.name,
          sku: product.sku,
          price: product.price
      };
    } catch (error  : any) {
      this.logger.error(`Failed to fetch product ${id} via gRPC: ${error.message}`);
      return null;
    }
  }
}
