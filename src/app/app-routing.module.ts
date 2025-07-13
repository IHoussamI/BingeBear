import { Routes } from '@angular/router';
import { HomeLayoutComponent } from './layouts/home-layout.component';
import { BaseLayoutComponent } from './layouts/base-layout.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { AuthGuard } from './Services/Auth/auth.guard';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
export const routes: Routes = [
    {
        path: '',
        component: BaseLayoutComponent,
        children: [
            { path: 'home', component: HomeLayoutComponent },
            { path: 'checkout', component: CheckoutComponent },
            { 
                path: 'dashboard', 
                component: DashboardComponent, 
                canActivate: [AuthGuard]  // Add AuthGuard here
            },
            { path: 'login', component: LoginComponent },
            

            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: '**', redirectTo: 'home' }


        ]


    }
];
