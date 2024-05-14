import { CanDeactivateFn } from '@angular/router';
import { ICanComponentDeactivate } from '../../shared/interfaces/ICanComponentDeactivate';

export const createProductCategoryCandeactivateGuard: CanDeactivateFn<
  ICanComponentDeactivate
> = (component, currentRoute, currentState, nextState) => {
  return component.canDeactivate();
};
