import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { Order } from '../models/order';
import { map } from 'rxjs/operators';



@Injectable({
    providedIn: 'root'
})
export class OrdersService {

    apiURLOrders = environment.apiURL + 'orders'



    constructor(private http: HttpClient) { }

    getOrders(): Observable<Order[]> {
        return this.http.get<Order[]>(this.apiURLOrders)
    }

    getOrder(orderId: string): Observable<Order> {
        return this.http.get<Order>(`${this.apiURLOrders}/${orderId}`) //Get one order by id 

    }


    createOrder(orderId: Order): Observable<Order> {
        return this.http.post<Order>(this.apiURLOrders, orderId)
    }

    deleteOrder(orderId: string): Observable<Order> {
        return this.http.delete<Order>(`${this.apiURLOrders}/${orderId}`)
    }

    updateOrder(orders: Order): Observable<Order> {
        return this.http.put<Order>(`${this.apiURLOrders}/${orders.id}`, orders)

    }

    getOrdersCount(): Observable<number> {
        return this.http
            .get<number>(`${this.apiURLOrders}/get/count`).pipe(map((objectValue: any) => objectValue.orderCount))

    }
    getTotalSales(): Observable<{ totalsales: number }> {
        return this.http
            .get<{ totalsales: number }>(`${this.apiURLOrders}/get/totalsales`)
            .pipe();
    }
}
