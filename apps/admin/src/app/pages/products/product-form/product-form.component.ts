import { Product, Category, CategoriesService, ProductsService } from '@ecommerce/products';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'admin-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  imageDisplay: string | ArrayBuffer
  isSubmitted = false;
  form: FormGroup
  editmode = false;
  categories: Category[] = []
  currentProductId: string;

  constructor(
    private FormBuilder: FormBuilder,
    private CategoriesService: CategoriesService,
    private messageService: MessageService,
    private ProductsService: ProductsService,
    private location: Location,
    private route: ActivatedRoute

  ) { }

  ngOnInit(): void {
    this._initForm()
    this._getCategories()
    this._checkEditMode()

  }

  private _initForm() {
    this.form = this.FormBuilder.group({
      name: ['', Validators.required],
      brand: ['', Validators.required],
      price: ['', Validators.required],
      category: ['', Validators.required],
      countInStock: ['', Validators.required],
      description: ['', Validators.required],
      richDescription: [''],
      image: ['', Validators.required],
      isFeatured: [false],

    })

  }

  onSubmit() {
    this.isSubmitted = true
    if (this.form.invalid)
      return

    const productFormData = new FormData()

    Object.keys(this.productform).forEach((key) => {
      productFormData.append(key, this.productform[key].value)

    })

    if (this.editmode) {
      this._updateProduct(productFormData)
    } else {
      this._addProduct(productFormData)
    }

  }
  onCancle() {
    timer(200).toPromise().then(() => {
      this.location.back();

    })
  }

  onImageUpload(event) {
    const file = event.target.files[0]

    if (file) {
      this.form.patchValue({ image: file })
      this.form.get('image').updateValueAndValidity();
      const fileReader = new FileReader();
      fileReader.onload = () => {
        this.imageDisplay = fileReader.result;
      };
      fileReader.readAsDataURL(file)
    }
  }

  private _getCategories() {
    this.CategoriesService.getCategories().subscribe(cats => {
      this.categories = cats
    })

  }


  private _addProduct(productData: FormData) {
    this.ProductsService.createProduct(productData).subscribe((product: Product) => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: `Product ${product.name} is created ` });
      timer(2000).toPromise().then(() => {
        this.location.back();

      })
    }, () => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Product is not created ' });
    })

  }

  private _updateProduct(productFormData: FormData) {
    this.ProductsService.updateProduct(productFormData, this.currentProductId).subscribe(() => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product is Updated ' });
      timer(2000).toPromise().then(() => {
        this.location.back();

      })
    }, () => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Product is not created ' });
    })


  }

  private _checkEditMode() {
    this.route.params.subscribe(params => {
      if (params.id) {
        this.editmode = true;
        this.currentProductId = params.id
        this.ProductsService.getProduct(params.id).subscribe(product => {
          this.productform.name.setValue(product.name);
          this.productform.category.setValue(product.category.id);
          this.productform.brand.setValue(product.brand);
          this.productform.price.setValue(product.price);
          this.productform.countInStock.setValue(product.countInStock);
          this.productform.isFeatured.setValue(product.isFeatured);
          this.productform.description.setValue(product.description);
          this.productform.richDiscription.setValue(product.richDiscription);
          this.imageDisplay = product.image;
          this.productform.image.setValidators([])
          this.productform.image.updateValueAndValidity()
        })


      }
    })

  }



  get productform() {
    return this.form.controls
  }

}
