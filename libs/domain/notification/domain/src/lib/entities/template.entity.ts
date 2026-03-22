import { v4 } from 'uuid';

export class NotificationTemplate {
  id: string = v4();
  name!: string;
  description?: string;
  isActive: boolean = true;
  versions: TemplateVersion[] = [];
  createdAt: Date = new Date();
  updatedAt: Date = new Date();
}

export class TemplateVersion {
  id: string = v4();
  template!: NotificationTemplate;
  version!: string;
  content!: string;
  metadata?: Record<string, any>;
  isDefault: boolean = false;
  createdAt: Date = new Date();
  approvedAt?: Date;
  approvedBy?: string;
}
