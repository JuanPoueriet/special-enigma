import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import {
    GetUserProfileUseCase,
    UpdateUserProfileUseCase,
    InviteUserUseCase,
    UploadAvatarUseCase,
    GetJobTitlesUseCase,
    GetAuditLogsUseCase,
    ListUsersUseCase,
    DeleteUserUseCase,
    UpdateUserUseCase,
    BlockUserUseCase,
    ForceLogoutUseCase,
    ForgotPasswordUseCase,
    UserRepository
} from '@virteex/domain-identity-application';
import { vi, describe, beforeEach, it, expect } from 'vitest';
import { UserResponseDto } from '@virteex/domain-identity-contracts';
import { NotFoundException } from '@nestjs/common';

describe('UsersController', () => {
  let controller: UsersController;

  const mockUseCase = () => ({
    execute: vi.fn()
  });

  const mockRepo = () => ({
    findById: vi.fn(),
    findByEmail: vi.fn(),
    save: vi.fn()
  });

  beforeEach(() => {
    controller = new UsersController(
        mockUseCase() as any, // getProfile
        mockUseCase() as any, // updateProfile
        mockUseCase() as any, // inviteUser
        mockUseCase() as any, // uploadAvatar
        mockUseCase() as any, // getJobTitlesUseCase
        mockUseCase() as any, // getAuditLogsUseCase
        mockUseCase() as any, // listUsersUseCase
        mockUseCase() as any, // deleteUserUseCase
        mockUseCase() as any, // updateUserUseCase
        mockUseCase() as any, // blockUserUseCase
        mockUseCase() as any, // forceLogoutUseCase
        mockUseCase() as any, // forgotPasswordUseCase
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

  describe('sendPasswordReset', () => {
    it('should trigger forgot password use case with bypass', async () => {
      const userId = '123';
      const userEntity = { id: userId, email: 'test@test.com' };
      const req = { ip: '127.0.0.1', headers: { 'user-agent': 'test' } };
      const currentUser = { tenantId: 'tenant-1' };

      const userRepository = (controller as any).userRepository;
      const forgotPasswordUseCase = (controller as any).forgotPasswordUseCase;

      userRepository.findById.mockResolvedValue(userEntity);
      forgotPasswordUseCase.execute.mockResolvedValue(undefined);

      const result = await controller.sendPasswordReset(userId, req as any, currentUser as any);

      expect(userRepository.findById).toHaveBeenCalledWith(userId, currentUser.tenantId);
      expect(forgotPasswordUseCase.execute).toHaveBeenCalledWith(
        { email: userEntity.email, recaptchaToken: '' },
        { ip: req.ip, userAgent: req.headers['user-agent'] },
        true
      );
      expect(result).toEqual({ message: 'Password reset email sent' });
    });
  });

  describe('forceLogout', () => {
    it('should throw if user not found in tenant', async () => {
      const userId = '123';
      const currentUser = { tenantId: 'tenant-1' };
      const userRepository = (controller as any).userRepository;
      userRepository.findById.mockResolvedValue(null);

      await expect(controller.forceLogout(userId, currentUser as any)).rejects.toThrow(NotFoundException);
      expect(userRepository.findById).toHaveBeenCalledWith(userId, currentUser.tenantId);
    });

    it('should call forceLogoutUseCase if user found', async () => {
      const userId = '123';
      const currentUser = { tenantId: 'tenant-1' };
      const userRepository = (controller as any).userRepository;
      const forceLogoutUseCase = (controller as any).forceLogoutUseCase;
      userRepository.findById.mockResolvedValue({ id: userId });

      await controller.forceLogout(userId, currentUser as any);

      expect(forceLogoutUseCase.execute).toHaveBeenCalledWith(userId);
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
  });
});
