import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './history.html',
  styleUrl: './history.css',
})
export class History {
  private cartService = inject(CartService);

  history$ = this.cartService.history$;
}
