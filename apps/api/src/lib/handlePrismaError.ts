import {
  ErrorForbidden,
  ErrorInvalidRequest,
  ErrorUniqueConstraint,
} from '@/src/schema/Error/error.model';
import { Prisma } from '@prisma/client';

export const handlePrismaError = (
  e: any,
  entityName: string,
  action: string
) => {
  if (e instanceof Prisma.PrismaClientKnownRequestError) {
    console.error('Error', JSON.stringify(e, null, 2));
    switch (e.code) {
      case 'P2004': {
        if (e.meta?.['reason'] === 'ACCESS_POLICY_VIOLATION') {
          throw new ErrorForbidden(`Cannot ${action} ${entityName}`);
        }
      }
      case 'P2002': {
        throw new ErrorUniqueConstraint(`${entityName} already exists`);
      }
      default:
        throw new ErrorInvalidRequest(`Failed to ${action} ${entityName} ee`);
    }
  }

  throw new ErrorInvalidRequest(`Failed to ${action} ${entityName} gg`);
};
