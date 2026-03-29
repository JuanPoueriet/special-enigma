import { Injectable } from '@nestjs/common';
import { type FixedAssetRepository, FixedAsset } from '@virteex/domain-fixed-assets-domain';
import { EntityManager } from '@mikro-orm/postgresql';
import { FixedAssetOrmEntity } from '../persistence/entities/fixed-asset.orm-entity';
import { FixedAssetsPersistenceMapper } from '../persistence/mappers/fixed-assets-persistence.mapper';

@Injectable()
export class MikroOrmFixedAssetRepository implements FixedAssetRepository {
  constructor(
    private readonly em: EntityManager
  ) {}

  private get repository() {
    return this.em.getRepository(FixedAssetOrmEntity);
  }

  async save(asset: FixedAsset): Promise<void> {
    const ormEntity = FixedAssetsPersistenceMapper.toOrmEntity(asset);
    await this.repository.getEntityManager().persistAndFlush(ormEntity);
  }

  async findAll(): Promise<FixedAsset[]> {
    const assets = await this.repository.findAll();
    return assets.map(FixedAssetsPersistenceMapper.toDomainEntity);
  }
}
