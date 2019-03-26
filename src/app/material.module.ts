import { NgModule } from '@angular/core';
import { MatInputModule, MatFormFieldModule, MatButtonModule, MatSidenavModule, MatToolbarModule, MatIconModule, MatListModule, MatCardModule } from '@angular/material';

@NgModule({
  imports: [
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
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
  ],
})
export class MaterialModule { }