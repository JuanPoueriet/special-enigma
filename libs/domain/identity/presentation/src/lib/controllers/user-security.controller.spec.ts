import { Test, TestingModule } from '@nestjs/testing';
import { UserSecurityController } from './user-security.controller';
import {
    ForceLogoutUseCase,
    ForgotPasswordUseCase
} from '@virtex/domain-identity-application';
import { UserRepository } from '@virtex/domain-identity-domain';
import { vi, describe, beforeEach, it, expect } from 'vitest';
import { NotFoundException } from '@nestjs/common';

describe('UserSecurityController', () => {
  let controller: UserSecurityController;

  const mockUseCase = () => ({
    execute: vi.fn()
  });

  const mockRepo = () => ({
    findById: vi.fn(),
    save: vi.fn()
  });

  beforeEach(() => {
    controller = new UserSecurityController(
        mockUseCase() as any, // forceLogoutUseCase
        mockUseCase() as any, // forgotPasswordUseCase
        mockRepo() as any      // userRepository
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
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
});
