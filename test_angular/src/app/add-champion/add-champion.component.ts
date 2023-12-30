import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ChampionService } from '../services/champion/champion.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CustomBarService } from '../services/custombar/custom-bar.service';

@Component({
  selector: 'app-add-champion',
  templateUrl: './add-champion.component.html',
  styleUrls: ['./add-champion.component.css']
})
export class AddChampionComponent implements OnInit {
  championForm: FormGroup
  tagsOption = [
    "Assassin",
    "Fighter",
    "Tank",
    "Mage",
    "Support",
    "Marksman"
  ]

  constructor(private fb: FormBuilder,private championService: ChampionService, private dialogRef: MatDialogRef<AddChampionComponent>, @Inject(MAT_DIALOG_DATA) public data: any,private customBarService: CustomBarService)  {
    this.championForm = fb.group(
      {
          title: this.fb.control(""),
          key: this.fb.control(""),
          name: this.fb.control(""),
          tags: this.fb.control(""),
      }
    )
  }
  ngOnInit(): void {
      this.championForm.patchValue(this.data)
  }

  // this method is responsible for update and create operations
  onFormSubmit() {
    if(this.championForm.valid) 
    {

      if(this.data) 
      {
        this.championService.update({...this.championForm.value, id: this.data.id}).subscribe(
          {
            next: (data) => {
              this.dialogRef.close(true);
              this.customBarService.openSnackBar("Champion updated successfully! !")

            },
            error: err => console.log(err)
          }
        )
      } 
      else 
      {
        this.championService.save(this.championForm.value).subscribe({
          next: (data) => {
            console.log(data)
            this.dialogRef.close(true);
            this.customBarService.openSnackBar("Champion created successfully! !")
          },
          error: err => console.log(err)
        })
      }

    }
 
  }


}
