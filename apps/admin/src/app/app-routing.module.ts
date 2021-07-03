import { NgModule } from '@angular/core';
import { ShellComponent } from './shared/shell/shell.component';
import { AuthGuard } from '@ecommerce/users';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CategoriesListComponent } from './pages/categories/categories-list/categories-list.component';
import { CategoriesFormComponent } from './pages/categories/categories-form/categories-form.component';
import { ProductFormComponent } from './pages/products/product-form/product-form.component';
import { UsersListComponent } from './pages/users/users-list/users-list.component';
import { UsersFormComponent } from './pages/users/users-form/users-form.component';
import { OrdersListComponent } from './pages/orders/orders-list/orders-list.component';
import { OrdersDetailComponent } from './pages/orders/orders-detail/orders-detail.component';
import { Routes, RouterModule } from '@angular/router';
import { ProductListComponent } from './pages/products/product-list/product-list.component';



const routes: Routes = [
    {
        path: '',
        component: ShellComponent,
        canActivate: [AuthGuard],
        children: [

            { path: '', component: DashboardComponent },
            { path: 'categories', component: CategoriesListComponent },
            { path: 'categories/form', component: CategoriesFormComponent },
            { path: 'categories/form/:id', component: CategoriesFormComponent },
            { path: 'products', component: ProductListComponent },
            { path: 'products/form', component: ProductFormComponent },
            { path: 'products/form/:id', component: ProductFormComponent },
            { path: 'users', component: UsersListComponent },
            { path: 'users/form', component: UsersFormComponent },
            { path: 'users/form/:id', component: UsersFormComponent },
            { path: 'orders', component: OrdersListComponent },
            { path: 'orders/:id', component: OrdersDetailComponent },

        ]
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: "full"
    }
]
@NgModule({
    imports: [RouterModule.forRoot(routes, { initialNavigation: 'enabled' })],
    exports: [RouterModule],
    declarations: [],
    providers: [],
})
export class AppRoutingModule { }
