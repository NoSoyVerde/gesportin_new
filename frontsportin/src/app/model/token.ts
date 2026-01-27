export interface IToken {
  token: string
}

export interface IJWT{  
  "iss": string,
  "sub": string,
  "username": string,
  "iat": number,
  "exp": number

}