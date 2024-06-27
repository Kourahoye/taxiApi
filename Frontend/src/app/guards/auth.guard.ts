import { CanActivateFn, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode'

export const authGuard: CanActivateFn = (route, state)  => {
  const token = sessionStorage.getItem('token')
  const redirect = new Router
  if (token){
  try {
    const valideToken = new Date(Number(jwtDecode(token).exp) * 1000)
    const curtime = new Date()
    if (valideToken) {
      if (valideToken < curtime)
      {
        redirect.navigate(['/login'])
        return false
      }
      else return true
    }
    else {
      redirect.navigate(['/login'])
      return false
    }
  } catch (error) {
    console.log(error)
    {redirect.navigate(['/login'])
      return false
  }
  }
}
else {
  redirect.navigate(['/login'])
  return false
}
}
