import { Test, TestingModule } from '@nestjs/testing';
import { UserAdminController } from './user-admin.controller';
import {
    InviteUserUseCase,
    GetJobTitlesUseCase,
    ListUsersUseCase,
    DeleteUserUseCase,
    UpdateUserUseCase,
    BlockUserUseCase
} from '@virtex/domain-identity-application';
import { UserRepository } from '@virtex/domain-identity-domain';
import { vi, describe, beforeEach, it, expect } from 'vitest';
import { NotFoundException } from '@nestjs/common';

describe('UserAdminController', () => {
  let controller: UserAdminController;

  const mockUseCase = () => ({
    execute: vi.fn()
  });

  const mockRepo = () => ({
    findById: vi.fn(),
    save: vi.fn()
  });

  beforeEach(() => {
    controller = new UserAdminController(
        mockUseCase() as any, // inviteUser
        mockUseCase() as any, // getJobTitlesUseCase
        mockUseCase() as any, // listUsersUseCase
        mockUseCase() as any, // deleteUserUseCase
        mockUseCase() as any, // updateUserUseCase
        mockUseCase() as any, // blockUserUseCase
        mockRepo() as any      // userRepository
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('setUserStatus', () => {
    it('should update user status', async () => {
      const userId = '123';
      const body = { isOnline: true };
      const userEntity = { id: userId, status: 'ONLINE', email: 'test@test.com' };
      const currentUser = { tenantId: 'tenant-1' };

      const updateUserUseCase = (controller as any).updateUserUseCase;
      updateUserUseCase.execute.mockResolvedValue(userEntity);

      const result = await controller.setUserStatus(userId, body, currentUser as any);

      expect(updateUserUseCase.execute).toHaveBeenCalledWith(userId, { status: 'ONLINE' }, currentUser.tenantId);
      expect(result.id).toBe(userId);
    });
  });

  describe('blockAndLogout', () => {
    it('should throw if user not found in tenant', async () => {
      const userId = '123';
      const currentUser = { tenantId: 'tenant-1' };
      const userRepository = (controller as any).userRepository;
      userRepository.findById.mockResolvedValue(null);

      await expect(controller.blockAndLogout(userId, currentUser as any)).rejects.toThrow(NotFoundException);
      expect(userRepository.findById).toHaveBeenCalledWith(userId, currentUser.tenantId);
    });

    it('should call blockUserUseCase if user found', async () => {
      const userId = '123';
      const currentUser = { tenantId: 'tenant-1' };
      const userRepository = (controller as any).userRepository;
      const blockUserUseCase = (controller as any).blockUserUseCase;
      userRepository.findById.mockResolvedValue({ id: userId });

      await controller.blockAndLogout(userId, currentUser as any);

      expect(blockUserUseCase.execute).toHaveBeenCalledWith(userId);
    });
  });
});
