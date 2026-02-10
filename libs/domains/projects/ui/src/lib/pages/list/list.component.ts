import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsService, Project } from '../../services/projects.service';

@Component({
  selector: 'virteex-projects-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent implements OnInit {
  private projectsService = inject(ProjectsService);
  items: Project[] = [];

  ngOnInit() {
    this.projectsService.getProjects().subscribe({
      next: (projects) => {
        this.items = projects;
      },
      error: (err) => {
        console.error('Failed to load projects', err);
      }
    });
  }
}
