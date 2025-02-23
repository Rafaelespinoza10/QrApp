import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-qr-result-dialog',
  template: `
    <h1 mat-dialog-title>QR Code Result</h1>
    <div mat-dialog-content>
      <p>{{ data.qrResult }}</p>
    </div>
    <div mat-dialog-actions>
      <button mat-button mat-dialog-close>Close</button>
    </div>
  `,
})
export class QrDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { qrResult: string }) {}
}
