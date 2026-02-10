import { Module, Global } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Project, PROJECT_REPOSITORY } from '@virteex/projects-domain';
import { MikroOrmProjectRepository } from './repositories/mikro-orm-project.repository';
// import { Task } from '@virteex/projects-domain'; // Assuming Task exists and exported

@Global()
@Module({
  imports: [
    MikroOrmModule.forFeature([Project])
  ],
  providers: [
    {
      provide: PROJECT_REPOSITORY,
      useClass: MikroOrmProjectRepository
    }
  ],
  exports: [
    MikroOrmModule,
    PROJECT_REPOSITORY
  ]
})
export class ProjectsInfrastructureModule {}
