import {Dashboard} from '@/types/widgets';
import {get} from '@vercel/edge-config';
import {ConfigType} from '@/lib/config-schema';


export const getConfig = async ():Promise<ConfigType> => {
  try {
    const dashboards = await get('dashboards') as Dashboard[];
    if (!dashboards) {
      throw new Error('Config is missing')
    }

    return dashboards;
  } catch {
    return (await import('../data/config.json')).default;
  }
}