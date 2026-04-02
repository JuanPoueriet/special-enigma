import { Injectable, Inject } from '@nestjs/common';
import { Project, type ProjectRepository, PROJECT_REPOSITORY } from '@virtex/domain-projects-domain';

export class CreateProjectDto {
  tenantId!: string;
  name!: string;
  description?: string;
  startDate!: Date;
}

@Injectable()
export class CreateProjectUseCase {
  constructor(
    @Inject(PROJECT_REPOSITORY) private readonly projectRepository: ProjectRepository
  ) {}

  async execute(dto: CreateProjectDto): Promise<Project> {
    if (!dto.name || dto.name.trim().length < 3) {
      throw new Error('Project name must be at least 3 characters long');
    }

    const startDate = new Date(dto.startDate);
    if (startDate.getTime() < new Date().setHours(0, 0, 0, 0)) {
        throw new Error('Project start date cannot be in the past');
    }

    const project = new Project(dto.tenantId, dto.name, startDate);
    if (dto.description) project.description = dto.description;
    await this.projectRepository.save(project);
    return project;
  }
}
