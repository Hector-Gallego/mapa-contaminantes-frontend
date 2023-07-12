import { Component } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal.map',
  templateUrl: './modal.map.component.html',
  styleUrls: ['./modal.map.component.css']
})
export class ModalMapComponent {

  constructor(private acttiveModal: NgbActiveModal, private modalService : NgbModal){

  }

  closeModal(){
    this.acttiveModal.close();
  }

  dismissModal() : void{

    this.acttiveModal.dismiss();
  }
 
}
