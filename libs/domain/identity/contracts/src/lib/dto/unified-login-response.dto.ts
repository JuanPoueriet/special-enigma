import { LoginResponseDto } from './login-response.dto';
import { UserResponseDto } from './user-response.dto';

export class UnifiedLoginResponseDto extends LoginResponseDto {
  user?: UserResponseDto;
}
