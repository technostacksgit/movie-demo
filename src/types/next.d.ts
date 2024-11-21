import { IUser } from '@/models/user';

declare module 'next' {
  interface NextApiRequest {
    user?: IUser; 
  }
}
