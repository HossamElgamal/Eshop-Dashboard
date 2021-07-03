import { Component, OnInit } from '@angular/core';
import { AuthService } from '@ecommerce/users';

@Component({
  selector: 'admin-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(private authServ: AuthService) { }

  ngOnInit(): void {
  }

  logout() {
    this.authServ.logout()

  }
}
