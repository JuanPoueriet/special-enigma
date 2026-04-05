import { Test, TestingModule } from '@nestjs/testing';
import { UserProfileController } from './user-profile.controller';
import {
    GetUserProfileUseCase,
    UpdateUserProfileUseCase,
    UploadAvatarUseCase,
    GetAuditLogsUseCase
} from '@virtex/domain-identity-application';
import { vi, describe, beforeEach, it, expect } from 'vitest';
import { BadRequestException } from '@nestjs/common';

describe('UserProfileController', () => {
  let controller: UserProfileController;

  const mockUseCase = () => ({
    execute: vi.fn()
  });

  beforeEach(() => {
    controller = new UserProfileController(
        mockUseCase() as any, // getProfile
        mockUseCase() as any, // updateProfile
        mockUseCase() as any, // uploadAvatar
        mockUseCase() as any  // getAuditLogs
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getMyProfile', () => {
    it('should return user profile', async () => {
      const userId = '123';
      const userEntity = { id: userId, email: 'test@test.com' };
      const currentUser = { sub: userId };

      const getProfile = (controller as any).getProfile;
      getProfile.execute.mockResolvedValue(userEntity);

      const result = await controller.getMyProfile(currentUser as any);

      expect(getProfile.execute).toHaveBeenCalledWith(userId);
      expect(result.id).toBe(userId);
    });
  });

  describe('uploadAvatarImage', () => {
    it('should throw if no file provided', async () => {
      const currentUser = { sub: '123' };
      await expect(controller.uploadAvatarImage(currentUser as any, null)).rejects.toThrow(BadRequestException);
    });
  });
});
