import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService, Category } from '@ecommerce/products';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';

@Component({
  selector: 'admin-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.scss']
})
export class CategoriesFormComponent implements OnInit {

  form: FormGroup;

  isSubmitted = false;
  editmode = false;
  currentCategoryId: string;

  constructor(private formBulider: FormBuilder,
    private CategoryService: CategoriesService,
    private messageService: MessageService,
    private location: Location,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.form = this.formBulider.group({
      name: ['', Validators.required],
      icon: ['', Validators.required],
      color: ['#fff']
    })

    this._checkEditMode()


  }

  onSubmit() {

    this.isSubmitted = true

    if (this.form.invalid) {
      return;

    }
    const category: Category = {
      id: this.currentCategoryId,
      name: this.categoryForm.name.value,
      icon: this.categoryForm.icon.value,
      color: this.categoryForm.color.value
    };

    if (this.editmode) {
      this._updateCategory(category)

    } else {
      this._addCategory(category)
    }

  }

  cancle() {
    timer(200).toPromise().then(() => {
      this.location.back()
    })

  }





  private _addCategory(category: Category) {
    this.CategoryService.createCategory(category).subscribe((category: Category) => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: `Category ${category} is created ` });
      timer(2000).toPromise().then(() => {
        this.location.back();

      })
    }, () => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Category is not created ' });
    })

  }

  private _updateCategory(category: Category) {
    this.CategoryService.updateCategory(category).subscribe(() => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Category is Updated ' });
      timer(2000).toPromise().then(() => {
        this.location.back();

      })
    }, () => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Category is not created ' });
    })

  }

  //I will look if i have an id after the url or not ,, if i have id then iam in editmode
  private _checkEditMode() {
    this.route.params.subscribe(params => {
      if (params.id) {
        this.editmode = true
        this.currentCategoryId = params.id
        this.CategoryService.getCategory(params.id).subscribe(category => {
          this.categoryForm.name.setValue(category.name)
          this.categoryForm.icon.setValue(category.icon)
          this.categoryForm.color.setValue(category.color)
        })
      }
    })

  }
  get categoryForm() {
    return this.form.controls
  }



}
