import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ProjectsService } from '../../core/services/projects.service';

@Component({
  selector: 'virteex-projects-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './create.component.html',
})
export class CreateProjectComponent {
  private fb = inject(FormBuilder);
  private projectsService = inject(ProjectsService);
  private router = inject(Router);

  isSubmitting = false;

  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    description: [''],
    startDate: [new Date().toISOString().split('T')[0], [Validators.required]],
  });

  onSubmit() {
    if (this.form.valid) {
      this.isSubmitting = true;
      const val = this.form.value;

      this.projectsService.createProject({
        name: val.name!,
        description: val.description || '',
        startDate: new Date(val.startDate!),
      }).subscribe({
        next: () => {
          this.isSubmitting = false;
          this.router.navigate(['../list']);
        },
        error: (err) => {
          console.error('Failed to create project', err);
          this.isSubmitting = false;
          // Ideally show a toast notification here
        }
      });
    } else {
      this.form.markAllAsTouched();
    }
  }
}
