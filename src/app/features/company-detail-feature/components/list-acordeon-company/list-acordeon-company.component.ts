import { Component, Input } from '@angular/core';
import { EconomyActivity } from 'src/app/core';


@Component({
  selector: 'app-list-acordeon-company',
  templateUrl: './list-acordeon-company.component.html',
  styleUrls: ['./list-acordeon-company.component.css']
})
export class ListAcordeonCompanyComponent {

  @Input() ecoAct : EconomyActivity | undefined;
  @Input() residuo : boolean = true;
}
