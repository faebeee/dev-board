'use server'
import { cookies } from 'next/headers'

export async function setConfigAction(data:ConfigSchema) {
  const cookieStore = await cookies();
  cookieStore.set('config', JSON.stringify(data));
}