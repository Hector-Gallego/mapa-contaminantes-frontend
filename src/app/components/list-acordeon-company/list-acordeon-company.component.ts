import { Component, Input } from '@angular/core';
import { EconomyActivity } from 'src/app/models/economy_activity/economicActivity';

@Component({
  selector: 'app-list-acordeon-company',
  templateUrl: './list-acordeon-company.component.html',
  styleUrls: ['./list-acordeon-company.component.css']
})
export class ListAcordeonCompanyComponent {

  @Input() ecoAct : EconomyActivity | undefined;
  @Input() residuo : boolean = true;
}
