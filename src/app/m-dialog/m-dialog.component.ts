import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-m-dialog',
  templateUrl: './m-dialog.component.html',
  styleUrls: ['./m-dialog.component.sass']
})
export class MDialogComponent implements OnInit {
  parsed:JSON;
  constructor(public dialogRef: MatDialogRef<MDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { 
     }

  ngOnInit() {
  }
  ok(anydata: any): void {
    this.dialogRef.close(anydata);
  }
}
