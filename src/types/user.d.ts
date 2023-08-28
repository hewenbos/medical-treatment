export type userType =
  | {
      id: number | string
      token: string
      account: string
      mobile: number | string
      avater: string
    }
  | undefined
export type codeType =
  | {
      code: string
    }
  | undefined
