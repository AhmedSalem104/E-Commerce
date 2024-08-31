import { Component, inject, OnInit } from '@angular/core';
import { OrderService } from '../../Core/services/Order/order.service';
import { Router } from '@angular/router';
import { Order } from '../../Core/interfaces/Order/GetUserOrders';

@Component({
  selector: 'app-allorders',
  standalone: true,
  imports: [],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.scss'
})
export class AllordersComponent implements OnInit {
  UserData!: any
  OrderList!:Order
  private readonly _OrderService = inject(OrderService)
  private readonly _Router = inject(Router)
  ngOnInit(): void {
    this.UserData = this._OrderService.decodeToken()
    this.fetchAPi(this.UserData.id)
  }

  fetchAPi(User_Id: string) {
    this._OrderService.getUserorders(User_Id).subscribe({
      next: (res) => {
        this.OrderList = res
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
