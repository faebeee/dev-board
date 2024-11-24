
import { Dashboard } from '@/lib/types/widget';
import { get } from '@vercel/edge-config';


export const getConfig = async (): Promise<Dashboard[]> => {
  try {
    const dashboards = await get('dashboards') as Dashboard[];
    if (!dashboards) {
      throw new Error('Config is missing');
    }

    return dashboards;
  } catch {
    return [];
  }

  // try {
  //   return (await import('../data/config.json')).default;
  // } catch {
  //   return [];
  // }
};