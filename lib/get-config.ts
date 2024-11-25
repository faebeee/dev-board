import { configSchema } from '@/lib/config-schema';
import { Dashboard } from '@/lib/types/widget';
import { get } from '@vercel/edge-config';
import { promises as fs } from 'fs';

export const getConfig = async (): Promise<Dashboard[]> => {
  if (process.env.EDGE_CONFIG) {
    const dashboards = await get('dashboards') as Dashboard[];
    if (!dashboards) {
      throw new Error('Config is missing');
    }

    await configSchema.validate(dashboards);
    return dashboards;
  }

  const file = await fs.readFile(process.cwd() + '/data/config.json', 'utf8');
  const data = JSON.parse(file);
  await configSchema.validate(data);
  return data;
};