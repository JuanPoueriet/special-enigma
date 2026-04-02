import { Injectable, Inject } from '@nestjs/common';
import { UserRepository } from '@virtex/domain-identity-domain';
import { User } from '@virtex/domain-identity-domain';

export interface ListUsersOptions {
  page: number;
  pageSize: number;
  searchTerm?: string;
  statusFilter?: string;
  sortColumn?: string;
  sortDirection?: 'ASC' | 'DESC';
  tenantId?: string;
}

@Injectable()
export class ListUsersUseCase {
  constructor(
    @Inject(UserRepository) private readonly userRepository: UserRepository
  ) {}

  async execute(options: ListUsersOptions): Promise<{ data: User[]; total: number }> {
    return this.userRepository.findAll(options);
  }
}
