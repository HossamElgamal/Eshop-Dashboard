import { Component, OnInit } from '@angular/core';
import { UsersService } from '@ecommerce/users';
import { ProductsService } from '@ecommerce/products';
import { combineLatest } from 'rxjs';
import { OrdersService } from '@ecommerce/orders';

@Component({
  selector: 'admin-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  statistics = [];

  constructor(
    private orderService: OrdersService,
    private productService: ProductsService,
    private userService: UsersService
  ) { }

  ngOnInit(): void {
    combineLatest([
      this.orderService.getOrdersCount(),
      this.productService.getProductsCount(),
      this.userService.getUsersCount(),
      this.orderService.getTotalSales()
    ]).subscribe((values) => {
      this.statistics = values;
    });
  }
}


