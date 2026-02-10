import { Module } from '@nestjs/common';
import { ProjectsController } from './controllers/projects.controller';
import { ProjectsApplicationModule } from '@virteex/projects-application';

@Module({
  imports: [ProjectsApplicationModule],
  controllers: [ProjectsController],
})
export class ProjectsPresentationModule {}
