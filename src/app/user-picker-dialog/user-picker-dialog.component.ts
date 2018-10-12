import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-user-picker-dialog',
  templateUrl: './user-picker-dialog.component.html',
  styleUrls: ['./user-picker-dialog.component.sass']
})
export class UserPickerDialogComponent implements OnInit {

  identifier:string="";

  constructor(public dialogRef: MatDialogRef<UserPickerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { 
      for (let entry of data) {
        entry.checked=false;
      }
     }
  ngOnInit() {
  }

  ok(): void {
    let result = {identifier: this.identifier==""?"Untitled conversation":this.identifier,participants:new Array()};
    for (let entry of this.data) {
        if (entry.checked==true){
          result.participants.push(entry);
        }
    }
    this.dialogRef.close(result);
  }
}