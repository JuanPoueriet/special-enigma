import { AccountDto } from '../dtos/account.dto';

/**
 * Extiende Account con datos de presentación necesarios para la UI en tablas/árboles.
 */
export interface FlattenedAccount extends AccountDto {
  level: number;
  parentId?: string;
  isExpanded?: boolean;
  isDisabled?: boolean;
  hasChildren?: boolean; // Indica si tiene hijos para optimizar la UI
}
