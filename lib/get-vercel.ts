import { Vercel } from '@vercel/sdk';

export const getVercel = () => new Vercel({
  bearerToken: process.env.VERCEL_TOKEN,
});