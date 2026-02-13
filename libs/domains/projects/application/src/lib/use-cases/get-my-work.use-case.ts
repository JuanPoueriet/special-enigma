import { Injectable, Inject } from '@nestjs/common';
import { Project } from '@virteex/projects-domain';
import { ProjectRepository, PROJECT_REPOSITORY } from '@virteex/projects-domain';

@Injectable()
export class GetMyWorkUseCase {
  constructor(
    @Inject(PROJECT_REPOSITORY) private readonly projectRepository: ProjectRepository
  ) {}

  async execute(userId: string): Promise<Project[]> {
    return this.projectRepository.findByMember(userId);
  }
}
