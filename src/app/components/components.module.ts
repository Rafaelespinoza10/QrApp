import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import {MatDialogModule} from '@angular/material/dialog';
import { QrDialogComponent } from './qr-dialog/qr-dialog.component';
import { QrComponent } from './qr-component/qr-component.component';


@NgModule({
  declarations: [
    QrDialogComponent,
    QrComponent,
  ],
  imports: [
    CommonModule,
    ZXingScannerModule,
    MatDialogModule,
  ],
  exports:[
    QrDialogComponent,
    QrComponent,
  ]
})
export class ComponentsModule { }
