import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-custom-delete-button-renderer',
  template: `
    <button (click)="onDeleteClick($event)" class="btn btn-sm btn-danger me-1">
      <i class="bi bi-trash-fill"></i>
    </button>
    <button class="btn btn-sm btn-info" (click)="onEditClick($event)"><i class="bi bi-pencil-square text-light"></i></button>
  `,
  styles: [
  ]
})
export class CustomDeleteButtonRendererComponent implements ICellRendererAngularComp {
  params: any;
  agInit(params: ICellRendererParams<any, any, any>): void {
    this.params = params 
  }
  refresh(params: ICellRendererParams<any, any, any>): boolean {
    return false;
  }

  onDeleteClick(event: any) {
    this.params.context.componentParent.handleDeleteChampion(this.params.data?.id)
  }
  onEditClick(event: any) {
    this.params.context.componentParent.handleEditChampion(this.params.data)
  }
}
