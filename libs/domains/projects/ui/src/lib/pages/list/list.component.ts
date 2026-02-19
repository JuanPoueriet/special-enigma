import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProjectsService, Project } from '../../core/services/projects.service';

export interface ProjectItem extends Project {
  // Add UI specific properties if needed
}

@Component({
  selector: 'virteex-projects-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent implements OnInit {
  private projectsService = inject(ProjectsService);
  items: ProjectItem[] = [];

  ngOnInit() {
    this.projectsService.getProjects().subscribe((projects) => {
      this.items = projects;
    });
  }
}
