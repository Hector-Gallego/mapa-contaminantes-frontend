import { Injectable, TemplateRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor() { }

  toasts: any[] = [];

  show(textOrTpl: string | TemplateRef<any>, options: any = {}) {
    console.log("se llamo al toast pero no se mostro");
    
    this.toasts.push({ textOrTpl, ...options });
  }

  remove(toast: any) {
    const index = this.toasts.indexOf(toast);
    if (index !== -1) {
      this.toasts.splice(index, 1);
    }

  }

  clear() {
    this.toasts.splice(0, this.toasts.length);
  }
}
