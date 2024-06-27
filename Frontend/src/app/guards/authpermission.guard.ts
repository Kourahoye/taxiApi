import { CanActivateFn } from '@angular/router';

export const authpermissionGuard: CanActivateFn = (route, state) => {
  const perms = sessionStorage.getItem('type')
  if(perms == null) return false
  if (perms !='admin' && perms != 'manager') return false
  return true
};
