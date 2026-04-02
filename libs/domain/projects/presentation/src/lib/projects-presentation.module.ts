import { Module } from '@nestjs/common';
import { ProjectsController } from './controllers/projects.controller';
import { ProjectsApplicationModule } from '@virtex/domain-projects-application';
import { ProjectsInfrastructureModule } from '@virtex/domain-projects-infrastructure';

@Module({
  imports: [ProjectsApplicationModule, ProjectsInfrastructureModule],
  controllers: [ProjectsController],
})
export class ProjectsPresentationModule {}
