import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order, OrdersService } from '@ecommerce/orders';


const STATUS_ORDER = {
  0: {
    label: 'Pending',
    color: 'primary'
  },
  1: {
    label: 'Processed',
    color: 'warning'

  },
  2: {
    label: 'Shipped',
    color: 'warning'
  },
  3: {
    label: 'Delivered',
    color: 'success'
  },
  4: {
    label: 'Failed',
    color: 'danger'
  }
}

@Component({
  selector: 'admin-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.css']
})
export class OrdersListComponent implements OnInit {

  orders: Order[] = []
  orderStatus = STATUS_ORDER

  constructor(private orderService: OrdersService, private router: Router) { }

  ngOnInit(): void {
    this._getOrders()
  }

  deleteOrder(orderid: string) {
    console.log("wr")
  }



  showOrder(orderid: string) {

    this.router.navigateByUrl(`orders/${orderid}`)
  }

  private _getOrders() {
    this.orderService.getOrders().subscribe(orders => {
      this.orders = orders
    })
  }

}
