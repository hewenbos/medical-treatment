export type ILogin = {
  mobile: string
  password: string
  code?: string
}

export type Icode = {
  mobile: string
  type: 'login' | 'register' | 'changeMobile' | 'forgetPassword' | 'bindMobile'
}

export type IcodeLogin = {
  mobile: string
  code: string | undefined
}
