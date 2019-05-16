import { NgModule } from '@angular/core';
import { MatTabsModule, MatInputModule, MatFormFieldModule, MatButtonModule, MatSidenavModule, MatToolbarModule, MatIconModule, MatListModule, MatCardModule } from '@angular/material';

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
    MatTabsModule
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
    MatTabsModule
  ],
})
export class MaterialModule { }