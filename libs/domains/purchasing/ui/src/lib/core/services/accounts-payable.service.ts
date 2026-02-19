import { Injectable, Inject, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { API_URL } from '@virteex/shared-config';
import { GraphQLClientService } from '@virteex/shared-util-http';

export interface VendorBillLineItem {
  description: string;
  quantity: number;
  price: number;
  expenseAccountId: string;
}

export interface CreateVendorBillDto {
  supplierId: string;
  billNumber: string;
  issueDate: string;
  dueDate: string;
  notes?: string;
  lineItems: VendorBillLineItem[];
}

export interface UpdateVendorBillDto extends Partial<CreateVendorBillDto> {}

export interface VendorBill {
  id: string;
  supplierId: string;
  billNumber: string;
  issueDate: string;
  dueDate: string;
  notes?: string;
  lineItems: VendorBillLineItem[];
  totalAmount: number;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class AccountsPayableService {
  private gql = inject(GraphQLClientService);

  getVendorBillById(id: string): Observable<VendorBill> {
    const query = `
      query GetVendorBill($id: ID!) {
        vendorBill(id: $id) {
          id
          supplierId
          billNumber
          issueDate
          dueDate
          notes
          lineItems {
            description
            quantity
            price
            expenseAccountId
          }
          totalAmount
          status
        }
      }
    `;
    return this.gql.query<{ vendorBill: VendorBill }>(query, { id }).pipe(
      map(res => res.vendorBill)
    );
  }

  createVendorBill(dto: CreateVendorBillDto): Observable<VendorBill> {
    const mutation = `
      mutation CreateVendorBill($input: CreateVendorBillInput!) {
        createVendorBill(input: $input) {
          id
          supplierId
          billNumber
          status
        }
      }
    `;
    return this.gql.mutate<{ createVendorBill: VendorBill }>(mutation, { input: dto }).pipe(
      map(res => res.createVendorBill)
    );
  }

  updateVendorBill(id: string, dto: UpdateVendorBillDto): Observable<VendorBill> {
    // Note: Update mutation not implemented in backend yet, keeping placeholder or implement similarly
    // Assuming backend exists for update too
    const mutation = `
      mutation UpdateVendorBill($id: ID!, $input: UpdateVendorBillInput!) {
        updateVendorBill(id: $id, input: $input) {
          id
          status
        }
      }
    `;
    return this.gql.mutate<{ updateVendorBill: VendorBill }>(mutation, { id, input: dto }).pipe(
      map(res => res.updateVendorBill)
    );
  }
}
