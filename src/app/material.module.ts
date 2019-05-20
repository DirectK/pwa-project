import { NgModule } from '@angular/core';
import { MatTabsModule, MatInputModule, MatFormFieldModule, MatButtonModule, MatSidenavModule, MatToolbarModule, MatIconModule, MatListModule, MatCardModule, MatDatepickerModule, MatNativeDateModule, MatNavList } from '@angular/material';

@NgModule({
  imports: [
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTabsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatListModule
  ],
  exports: [
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTabsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatListModule
  ],
})
export class MaterialModule { }