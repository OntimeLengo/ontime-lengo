declare module '*.html' {
  const content: string;
  export default content;
}

declare namespace Express {
  export interface Request {
    user: string;
    token: string;
  }
}
