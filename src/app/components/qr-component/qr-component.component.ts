import { Component, OnInit } from '@angular/core';
import { BarcodeFormat } from '@zxing/library';
import { BehaviorSubject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { QrDialogComponent } from '../qr-dialog/qr-dialog.component';

@Component({
  selector: 'app-qr-component',
  templateUrl: './qr-component.component.html',
  styleUrls: ['./qr-component.component.css'],
})
export class QrComponent implements OnInit {
  public availableDevices: MediaDeviceInfo[] = [];
  public deviceCurrent: MediaDeviceInfo | undefined = undefined;
  public deviceSelected: string = '';
  public hasDevices: boolean = false;
  public hasPermission: boolean = false;
  public qrResultString: string | null = '';
  public torchEnabled = false;
  public torchAvailable$ = new BehaviorSubject<boolean>(false);
  public tryHarder = false;
  public enabledCamera = false;

  public formatsEnabled:  BarcodeFormat[] = [
    BarcodeFormat.CODE_128,
    BarcodeFormat.DATA_MATRIX,
    BarcodeFormat.EAN_13,
    BarcodeFormat.QR_CODE,
  ];

  constructor(private readonly _dialog: MatDialog) {}

  ngOnInit(): void {
  }

  clearResult(): void {
    this.qrResultString = null;
  }

  onCamerasFound(devices: MediaDeviceInfo[]): void {
    this.availableDevices = devices;
    this.hasDevices = Boolean(devices && devices.length);
  }

  onCodeResult(resultString: string) {
    this.qrResultString = resultString;
    console.log(JSON.stringify(resultString));
    this.openResultDialog(resultString);
  }

  openResultDialog(resultString: string) {
    this._dialog.open(QrDialogComponent, {
      data: { qrResult: JSON.stringify(resultString ,null,2)},
    });
  }

  onDeviceSelectChange(selected: string) {
    const selectedStr = selected || '';
    if (this.deviceSelected === selectedStr) {
      return;
    }
    this.deviceSelected = selectedStr;
    const device = this.availableDevices.find((x) => x.deviceId === selected);
    this.deviceCurrent = device || undefined;
  }

  onDeviceChange(device: MediaDeviceInfo) {
    const selectedStr = device?.deviceId || '';
    if (this.deviceSelected === selectedStr) {
      return;
    }
    this.deviceSelected = selectedStr;
    this.deviceCurrent = device || undefined;
  }

  onHasPermission(has: boolean) {
    this.hasPermission = has;
  }

  onTorchCompatible(isCompatible: boolean): void {
    this.torchAvailable$.next(isCompatible || false);
  }

  toggleTorch(): void {
    this.torchEnabled = !this.torchEnabled;
  }

  toggleTryHarder(): void {
    this.tryHarder = !this.tryHarder;
  }

  toggleCamera(): void{
    this.enabledCamera = !this.enabledCamera;
    
  }

}
