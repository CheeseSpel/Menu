import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Food } from '../models/food';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './menu.html',
  styleUrl: './menu.css',
})
export class Menu {
  private cartService = inject(CartService);

  foods: Food[] = [
    {
      id: 1,
      name: 'Классический бургер',
      price: 279,
      description: 'Сочный бифштекс, сыр, маринованный огурец, салат и фирменный шсоус',
      image: '/assets/burger/b1.png',
      category: 'Бургеры',
    },
    {
      id: 2,
      name: 'Картофель фри',
      price: 129,
      description: 'Хрустящий картофель фри с золотистой корочкой и солью',
      image: '/assets/garnieren/PotateFree.png',
      category: 'Гарниры',
    },
    {
      id: 3,
      name: 'Наггетсы',
      price: 159,
      description: 'Куриные наггетсы с хрустящей корочкой и соусом на выбор',
      image: '/assets/garnieren/Naggetsy-min.png',
      category: 'Гарниры',
    },
  ];

  cartCount$ = this.cartService.cartCount$;

  addToCart(food: Food): void {
    this.cartService.addItem(food);
  }
}