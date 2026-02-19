import { Resolver, Query } from '@nestjs/graphql';

@Resolver()
export class InventoryResolver {
  @Query(() => String)
  inventoryHealthCheck(): string {
    return 'Inventory Service is running';
  }
}
