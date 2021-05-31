import { Component, OnInit } from '@angular/core';
import { CartService } from './cart/cart.service';
import { UsersService } from './users/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'frontend';
  numberOfItems: number = 0;

  constructor(
    public _userService: UsersService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.cartService.cartObservable.subscribe({
      next: (cart) => {
        console.log(cart);
        this.numberOfItems = Object.keys(cart).length;
      },
    });
  }
}
