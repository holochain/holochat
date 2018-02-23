export const REGISTER = 'register'
export const MYPROFILE = 'myProfile'


export function register (profile, then) {
  return {
    type: REGISTER,
    meta: {
      isHc: true,
      namespace: 'profiles',
      data: profile,
      then
    }
  }
}

export function myProfile (then) {
  return {
    type: MYPROFILE,
    meta: {
      isHc: true,
      namespace: 'profiles',
      data: '',
      then
    }
  }
}
