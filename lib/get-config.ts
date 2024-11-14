import {Dashboard} from '@/types/widgets';

export const getConfig = async () => {
  return ((await import('../data/config.json')).default as Dashboard[]);
}