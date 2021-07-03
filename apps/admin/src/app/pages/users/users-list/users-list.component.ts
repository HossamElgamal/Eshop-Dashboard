import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User, UsersService } from '@ecommerce/users';


import { MessageService, ConfirmationService } from 'primeng/api';



@Component({
  selector: 'admin-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css'],
})
export class UsersListComponent implements OnInit {

  users: User[] = []

  constructor(private userService: UsersService,
    private MessageService: MessageService,
    private ConfirmationService: ConfirmationService,
    private router: Router) { }

  ngOnInit(): void {
    this._getUsers()
  }

  deleteUser(userId: string) {
    this.ConfirmationService.confirm({
      message: 'Do you want to Delete this Category?',
      header: 'Delete Category',
      icon: 'pi pi-exclamation-triangle',

      accept: () => {
        this.userService.deleteUser(userId).subscribe(() => {
          this._getUsers()
          this.MessageService.add({ severity: 'success', summary: 'Success', detail: 'User is deleted ' });
        }, () => {
          this.MessageService.add({ severity: 'error', summary: 'Error', detail: 'User is not deleted ' });
        })
      },

    });
  }

  UpdateUser(userId: string) {
    this.router.navigateByUrl(`users/form/${userId}`)

  }

  private _getUsers() {
    this.userService.getUsers().subscribe(myusers => {
      this.users = myusers
    })

  }

  //////getCountryName(countryKey: string) {
  //if (countryKey) return this.userService.getCountry(countryKey)
  //}
}
