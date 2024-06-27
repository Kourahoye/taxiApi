import { CanActivateFn, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

export const authchildGuard: CanActivateFn = (route, state) => {
  const token = sessionStorage.getItem('token')
  const redirect = new Router
  if (token){
  try {
    const valideToken = jwtDecode(token).exp
    const curtime = Date.now()
    if (valideToken) {
      if (valideToken < curtime) return true
      else {
        return redirect.createUrlTree(['login'])
      }
    }
    else {
      return redirect.createUrlTree(['login'])

    }
  } catch (error) {
    console.log(error)
    {redirect.createUrlTree(['login'])
      return false
  }
  }
}
else {
  redirect.createUrlTree(['login'])
  return false
}
}
