import {
  Component,
  ChangeDetectionStrategy,
  signal,
  inject,
  OnInit,
  computed,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import {
  LucideAngularModule,
  Search,
  X,
  Plus,
  Minus,
  Trash2,
  CreditCard,
} from 'lucide-angular';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { Product } from '../../../core/models/product.model';
import { CrmService } from '../../../core/services/crm.service';

@Component({
  selector: 'virteex-pos-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LucideAngularModule],
  templateUrl: './pos.page.html',
  styleUrls: ['./pos.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PosPage implements OnInit {
  private fb = inject(FormBuilder);
  private crmService = inject(CrmService);

  protected readonly SearchIcon = Search;
  protected readonly XIcon = X;
  protected readonly PlusIcon = Plus;
  protected readonly MinusIcon = Minus;
  protected readonly TrashIcon = Trash2;
  protected readonly CreditCardIcon = CreditCard;

  allProducts = signal<Product[]>([]);
  isLoading = signal(false);

  saleForm!: FormGroup;

  private formChanges = toSignal(this.saleForm.valueChanges, {
    initialValue: {},
  });

  subtotal = computed(() => {
    return this.cartItems.controls.reduce((acc, control) => {
      const quantity = control.get('quantity')?.value || 0;
      const price = control.get('price')?.value || 0;
      return acc + quantity * price;
    }, 0);
  });

  taxAmount = computed(() => this.subtotal() * 0.16); // 16% IVA
  total = computed(() => this.subtotal() + this.taxAmount());

  ngOnInit(): void {
    this.saleForm = this.fb.group({
      cartItems: this.fb.array([]),
      customer: ['Cliente General'],
    });

    this.loadProducts();
  }

  loadProducts(): void {
    this.isLoading.set(true);
    this.crmService.getProducts().subscribe({
      next: (products) => {
        this.allProducts.set(products);
        this.isLoading.set(false);
      },
      error: () => {
        this.isLoading.set(false);
        // Handle error toast
      },
    });
  }

  get cartItems(): FormArray {
    return this.saleForm.get('cartItems') as FormArray;
  }

  addToCart(product: Product): void {
    const existingItem = this.cartItems.controls.find(
      (control) => control.get('productId')?.value === product.id,
    );
    if (existingItem) {
      existingItem
        .get('quantity')
        ?.setValue(existingItem.get('quantity')?.value + 1);
    } else {
      const newItem = this.fb.group({
        productId: [product.id],
        name: [product.name],
        price: [product.price],
        quantity: [1],
      });
      this.cartItems.push(newItem);
    }
  }

  updateQuantity(index: number, change: number): void {
    const item = this.cartItems.at(index);
    const newQuantity = (item.get('quantity')?.value || 0) + change;
    if (newQuantity > 0) {
      item.get('quantity')?.setValue(newQuantity);
    } else {
      this.cartItems.removeAt(index);
    }
  }

  removeItem(index: number): void {
    this.cartItems.removeAt(index);
  }

  getItemTotal(item: any): number {
    return (item.get('quantity')?.value || 0) * (item.get('price')?.value || 0);
  }

  completeSale(): void {
    if (this.saleForm.valid && this.cartItems.length > 0) {
      this.isLoading.set(true);
      const salePayload = {
        customerName: this.saleForm.get('customer')?.value,
        items: this.cartItems.value.map((item: any) => ({
          productId: item.productId,
          productName: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
        tenantId: 'default', // Should come from session
      };

      this.crmService.createSale(salePayload).subscribe({
        next: () => {
          this.cartItems.clear();
          this.saleForm.get('customer')?.setValue('Cliente General');
          this.isLoading.set(false);
          alert('Venta realizada con éxito');
        },
        error: () => {
          alert('Error al procesar la venta');
          this.isLoading.set(false);
        },
      });
    }
  }
}
