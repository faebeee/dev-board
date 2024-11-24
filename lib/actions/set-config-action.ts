'use server';
import { cookies } from 'next/headers';

export async function setConfigAction(data?: string) {
  const cookieStore = await cookies();
  if (data) {
    cookieStore.set('config', JSON.stringify(data));
  } else {
    cookieStore.delete('config');
  }
}