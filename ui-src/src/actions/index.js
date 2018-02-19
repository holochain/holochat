export const REGISTER = 'register'

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
