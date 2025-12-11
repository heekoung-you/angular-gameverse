import { Routes } from '@angular/router';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { TransactionsPageComponent } from './transactions-page/transactions-page.component';
import { FinanceLayoutComponent } from './finance-layout.component';

// export const routes: Routes = [
//   { path: 'transactions', component: TransactionsPageComponent },
//   { path: 'dashboard', component: DashboardPageComponent },
//   { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
// ];

export const FINANCE_ROUTES: Routes = [
  {
    path: '',
    component: FinanceLayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardPageComponent },
      { path: 'transactions', component: TransactionsPageComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },
];
