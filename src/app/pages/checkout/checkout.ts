import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css',
})
export class Checkout {
  private cartService = inject(CartService);

  cartItems$ = this.cartService.cartItems$;
  total$ = this.cartService.total$;

  increase(foodId: number): void {
    this.cartService.increaseQuantity(foodId);
  }

  decrease(foodId: number): void {
    this.cartService.decreaseQuantity(foodId);
  }

  remove(foodId: number): void {
    this.cartService.removeItem(foodId);
  }

  placeOrder(): void {
    this.cartService.placeOrder();
  }
}
