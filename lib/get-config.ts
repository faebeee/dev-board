import {Dashboard} from '@/types/widgets';
import {get} from '@vercel/edge-config';


export const getConfig = async () => {
    const dashboards = await get('dashboards') as Dashboard[];
    if (!dashboards) {
      throw new Error('Config is missing')
    }

    return dashboards;
}