import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService, Product } from '@ecommerce/products';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'admin-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = []

  constructor(
    private productService: ProductsService,
    private router: Router,
    private ConfirmationService: ConfirmationService,
    private MessageService: MessageService
  ) { }

  ngOnInit(): void {
    this._getProducts()
  }



  private _getProducts() {
    this.productService.getProducts().subscribe(prods => {
      this.products = prods;
    })
  }
  updateProduct(productId: string) {
    this.router.navigateByUrl(`products/form/${productId}`)

  }

  deleteProduct(productId: string) {
    this.ConfirmationService.confirm({
      message: 'Do you want to Delete this Category?',
      header: 'Delete Category',
      icon: 'pi pi-exclamation-triangle',

      accept: () => {
        this.productService.deleteProduct(productId).subscribe(() => {
          this._getProducts()
          this.MessageService.add({ severity: 'success', summary: 'Success', detail: 'Category is deleted ' });
        }, () => {
          this.MessageService.add({ severity: 'error', summary: 'Error', detail: 'Category is not deleted ' });
        })
      },

    });
  }

}


