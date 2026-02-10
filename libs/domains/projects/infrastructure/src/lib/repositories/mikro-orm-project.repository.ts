import { Injectable } from '@nestjs/common';
import { ProjectRepository, Project } from '@virteex/projects-domain';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';

@Injectable()
export class MikroOrmProjectRepository implements ProjectRepository {
  constructor(
    @InjectRepository(Project)
    private readonly repository: EntityRepository<Project>
  ) {}

  async save(project: Project): Promise<void> {
    await this.repository.getEntityManager().persistAndFlush(project);
  }

  async findById(id: string): Promise<Project | null> {
    return this.repository.findOne({ id }, { populate: ['tasks'] });
  }

  async findAll(): Promise<Project[]> {
    return this.repository.findAll({ populate: ['tasks'] });
  }
}
