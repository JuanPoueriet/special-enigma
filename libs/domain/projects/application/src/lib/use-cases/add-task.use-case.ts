import { Injectable, Inject } from '@nestjs/common';
import { ProjectRepository, PROJECT_REPOSITORY } from '@virteex/domain-projects-domain';
import { Task } from '@virteex/domain-projects-domain';
import { EntityNotFoundException, BadRequestException } from '@virteex/kernel-exceptions';

@Injectable()
export class AddTaskUseCase {
  constructor(
    @Inject(PROJECT_REPOSITORY) private readonly projectRepository: ProjectRepository
  ) {}

  async execute(tenantId: string, projectId: string, taskName: string, assignedToId?: string): Promise<void> {
    const project = await this.projectRepository.findById(projectId);

    if (!project) {
      throw new EntityNotFoundException('Project', projectId);
    }

    if (project.tenantId !== tenantId) {
       throw new EntityNotFoundException('Project', projectId);
    }

    if (project.status === 'COMPLETED' || project.status === 'CANCELLED') {
      throw new BadRequestException('Cannot add tasks to a completed or cancelled project');
    }

    const task = new Task(tenantId, project, taskName);
    if (assignedToId) {
      task.assignedToId = assignedToId;
    }

    project.tasks.add(task);

    await this.projectRepository.save(project);
  }
}
