import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddChampionComponent } from './add-champion/add-champion.component';
import { ColDef } from 'ag-grid-community';
import { ChampionService } from './services/champion/champion.service';
import { CustomDeleteButtonRendererComponent } from './custom-actions-button-renderer/custom-actions-button-renderer.component';
import { Champion } from './models/champion.model';
import { CustomBarService } from './services/custombar/custom-bar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
   // Row Data: The data to be displayed.
   rowData!: Champion[];

    // Column Definitions: Defines & controls grid columns.
    colDefs: ColDef<any>[] = [
      { field: "id", width: 100 },
      { field: "title"  },
      { field: "key"  },
      { field: "name"  },
      { field: "tags"  },
      { field: "actions",  cellRenderer: CustomDeleteButtonRendererComponent},
    ];
    defaultColDef: ColDef = {
      sortable: true, filter: true
    }

        
    gridOptions = {
      context: {
        componentParent: this
      },
    }
  

   constructor(private championService: ChampionService, private dialog: MatDialog, private customBarService: CustomBarService) {
 
   }


    handleAddchampion() {
     const dialogRef =  this.dialog.open(AddChampionComponent)

     dialogRef.afterClosed().subscribe({
      next: (val: any) => {
        if(val) {
          console.log(val)
          this.getChampions()
        }
      },
      error : (err: any) => console.log(err)
     })
    }  

    handleEditChampion(data: any) {
    const dialogRef =  this.dialog.open(AddChampionComponent, {
        data
      })
      dialogRef.afterClosed().subscribe({
        next: (val) => {
          if(val) {
            console.log(val)
            this.getChampions()
          }
        },
        error : (err) => console.log(err)
       })
      console.log("On edit "+ Object.values(data))
    }
  
    ngOnInit(): void {
        this.getChampions()
    }
  
  
    private getChampions() {
      this.championService.getAllChampions().subscribe({
        next: data => { this.rowData = data.sort((champion1, champion2)=> champion1.id - champion2.id)},
        error: (err) => console.log(err)
      })
    }
  
    handleDeleteChampion(id: any) {
      if(confirm("Are you sure ?"))
      this.championService.deleteChampion(id).subscribe({
        next: value=> {
          this.customBarService.openSnackBar(`Champion with id ${id} deleted`)
          this.getChampions()
        },
        error: err => console.log(err)
      })
    }
}
