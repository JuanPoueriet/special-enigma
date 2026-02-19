import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GraphQLClientService } from '@virteex/shared-util-http';

export interface Warehouse {
  id: string;
  name: string;
  code: string;
  location: string;
  tenantId: string;
}

export interface RegisterMovementItemInput {
  productId: string;
  quantity: string;
  type: string;
  reference: string;
  locationId?: string;
}

export interface RegisterMovementInput {
  warehouseId: string;
  items: RegisterMovementItemInput[];
}


@Injectable({
  providedIn: 'root',
})
export class InventoryService {
  private gql = inject(GraphQLClientService);

  getWarehouses(): Observable<Warehouse[]> {
    const query = `
      query GetWarehouses {
        warehouses {
          id
          name
          location
          code
          tenantId
        }
      }
    `;
    return this.gql.query<{ warehouses: Warehouse[] }>(query).pipe(
      map(res => res.warehouses)
    );
  }

  createWarehouse(warehouse: Partial<Warehouse>): Observable<Warehouse> {
    const input = {
      name: warehouse.name,
      location: warehouse.location
    };
    const mutation = `
      mutation CreateWarehouse($input: CreateWarehouseInput!) {
        createWarehouse(input: $input) {
          id
          name
          location
          code
          tenantId
        }
      }
    `;
    return this.gql.mutate<{ createWarehouse: Warehouse }>(mutation, { input }).pipe(
      map(res => res.createWarehouse)
    );
  }

  updateWarehouse(id: string, warehouse: Partial<Warehouse>): Observable<Warehouse> {
     const input = {
      name: warehouse.name,
      location: warehouse.location
    };
    const mutation = `
      mutation UpdateWarehouse($id: ID!, $input: UpdateWarehouseInput!) {
        updateWarehouse(id: $id, input: $input) {
          id
          name
          location
          code
          tenantId
        }
      }
    `;
    return this.gql.mutate<{ updateWarehouse: Warehouse }>(mutation, { id, input }).pipe(
      map(res => res.updateWarehouse)
    );
  }

  deleteWarehouse(id: string): Observable<void> {
    const mutation = `
      mutation DeleteWarehouse($id: ID!) {
        deleteWarehouse(id: $id)
      }
    `;
    return this.gql.mutate<{ deleteWarehouse: boolean }>(mutation, { id }).pipe(
      map(() => undefined)
    );
  }

  registerMovement(movement: RegisterMovementInput): Observable<void> {
    const mutation = `
      mutation RegisterMovement($input: RegisterMovementInput!) {
        registerMovement(input: $input)
      }
    `;
    return this.gql.mutate<{ registerMovement: boolean }>(mutation, { input: movement }).pipe(
      map(() => undefined)
    );
  }
}
