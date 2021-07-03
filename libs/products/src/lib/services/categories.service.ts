import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Category } from '../models/category';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';







@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  apiURLCategories = environment.apiURL + 'categories'



  constructor(private http: HttpClient) { }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiURLCategories)
  }

  getCategory(categoryId: string): Observable<Category> {
    return this.http.get<Category>(`${this.apiURLCategories}/${categoryId}`) //Get one category by id 

  }


  createCategory(categories: Category): Observable<Category> {
    return this.http.post<Category>(this.apiURLCategories, categories)
  }

  deleteCategory(categoryId: string): Observable<Category> {
    return this.http.delete<Category>(`${this.apiURLCategories}/${categoryId}`)
  }

  updateCategory(categories: Category): Observable<Category> {
    return this.http.put<Category>(`${this.apiURLCategories}/${categories.id}`, categories)

  }

}
