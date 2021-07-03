import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrdersService, Order } from '@ecommerce/orders';



@Component({
  selector: 'admin-orders-detail',
  templateUrl: './orders-detail.component.html',
  styleUrls: ['./orders-detail.component.css']
})
export class OrdersDetailComponent implements OnInit {

  order: Order
  constructor(private orderService: OrdersService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this._getOrder()
  }

  private _getOrder() {
    this.route.params.subscribe(params => {
      if (params.id) {
        this.orderService.getOrder(params.id).subscribe(orde => {
          this.order = orde
        })
      }

    })

  }

}
