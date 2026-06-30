import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Food } from '../models/food';

export interface CartItem {
  food: Food;
  quantity: number;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  total: number;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly cartKey = 'rostiks-cart';
  private readonly historyKey = 'rostiks-history';

  private cartItemsSubject = new BehaviorSubject<CartItem[]>(this.loadCart());
  private historySubject = new BehaviorSubject<Order[]>(this.loadHistory());

  cartItems$ = this.cartItemsSubject.asObservable();
  history$ = this.historySubject.asObservable();
  total$ = this.cartItemsSubject.pipe(
    map((items) => items.reduce((sum, item) => sum + item.food.price * item.quantity, 0)),
  );
  cartCount$ = this.cartItemsSubject.pipe(
    map((items) => items.reduce((sum, item) => sum + item.quantity, 0)),
  );

  addItem(food: Food): void {
    const items = [...this.cartItemsSubject.value];
    const existingItem = items.find((item) => item.food.id === food.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      items.push({ food, quantity: 1 });
    }

    this.cartItemsSubject.next(items);
    this.saveCart(items);
  }

  increaseQuantity(foodId: number): void {
    const items = [...this.cartItemsSubject.value];
    const item = items.find((entry) => entry.food.id === foodId);

    if (item) {
      item.quantity += 1;
      this.cartItemsSubject.next(items);
      this.saveCart(items);
    }
  }

  decreaseQuantity(foodId: number): void {
    const items = [...this.cartItemsSubject.value];
    const item = items.find((entry) => entry.food.id === foodId);

    if (!item) {
      return;
    }

    if (item.quantity > 1) {
      item.quantity -= 1;
    } else {
      const filteredItems = items.filter((entry) => entry.food.id !== foodId);
      this.cartItemsSubject.next(filteredItems);
      this.saveCart(filteredItems);
      return;
    }

    this.cartItemsSubject.next(items);
    this.saveCart(items);
  }

  removeItem(foodId: number): void {
    const items = this.cartItemsSubject.value.filter((item) => item.food.id !== foodId);
    this.cartItemsSubject.next(items);
    this.saveCart(items);
  }

  clearCart(): void {
    this.cartItemsSubject.next([]);
    this.saveCart([]);
  }

  placeOrder(): Order | null {
    const items = this.cartItemsSubject.value;

    if (items.length === 0) {
      return null;
    }

    const total = items.reduce((sum, item) => sum + item.food.price * item.quantity, 0);
    const order: Order = {
      id: Date.now().toString(),
      date: new Date().toLocaleString('ru-RU'),
      items: items.map((item) => ({ ...item })),
      total,
    };

    const history = [order, ...this.historySubject.value];
    this.historySubject.next(history);
    this.saveHistory(history);
    this.clearCart();

    return order;
  }

  private loadCart(): CartItem[] {
    return this.read<CartItem[]>(this.cartKey) ?? [];
  }

  private loadHistory(): Order[] {
    return this.read<Order[]>(this.historyKey) ?? [];
  }

  private saveCart(items: CartItem[]): void {
    this.write(this.cartKey, items);
  }

  private saveHistory(items: Order[]): void {
    this.write(this.historyKey, items);
  }

  private read<T>(key: string): T | null {
    if (typeof window === 'undefined' || !window.localStorage) {
      return null;
    }

    const value = window.localStorage.getItem(key);
    return value ? (JSON.parse(value) as T) : null;
  }

  private write(key: string, value: unknown): void {
    if (typeof window === 'undefined' || !window.localStorage) {
      return;
    }

    window.localStorage.setItem(key, JSON.stringify(value));
  }
}
