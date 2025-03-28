import { Routes } from '@angular/router';
import { HomeLayoutComponent } from './layouts/home-layout.component';
import { BaseLayoutComponent } from './layouts/base-layout.component';
import { TestComponent } from './components/test/test.component';
import { Test2Component } from './components/test2/test2.component';
import { Test3Component } from './components/test3/test3.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { TestinCompComponent } from './components/testin-comp/testin-comp.component';
export const routes: Routes = [
    {
        path: '',
        component: BaseLayoutComponent,
        children: [
            { path: 'home', component: HomeLayoutComponent },
            { path: 'test', component: TestComponent },
            { path: 'test2', component: Test2Component },
            { path: 'test3', component: Test3Component },
            { path: 'checkout', component: CheckoutComponent },
            { path: 'testin-comp', component:TestinCompComponent},

            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: '**', redirectTo: 'home' }


        ]


    }
];
