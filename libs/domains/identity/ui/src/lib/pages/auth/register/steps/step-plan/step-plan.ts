import { Component, Input } from '@angular/core';

import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-step-plan',
  standalone: true,
  imports: [ReactiveFormsModule, TranslateModule, RouterModule],
  templateUrl: './step-plan.html',
})
export class StepPlan {
  @Input() group!: FormGroup;
}
