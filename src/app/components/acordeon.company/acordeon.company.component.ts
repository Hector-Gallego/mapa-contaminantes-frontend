import { Component, Input } from '@angular/core';
import { Company } from 'src/app/models/company';

@Component({
  selector: 'app-acordeon-company',
  templateUrl: './acordeon.company.component.html',
  styleUrls: ['./acordeon.company.component.css']
})
export class AcordeonCompanyComponent {
  @Input() company : Company | undefined;
}
