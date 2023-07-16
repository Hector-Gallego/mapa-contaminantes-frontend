import { Component, TemplateRef } from '@angular/core';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent {

  constructor(private toastService : ToastService){}

  toasts = this.toastService.toasts;

  isTemplate(toast: any) {
		return toast.textOrTpl instanceof TemplateRef;
	}

  remove(toast: any){
    this.toastService.remove(toast)
  }

}
