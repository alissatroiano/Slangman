import type { MenuItem } from '@devvit/public-api';
import { Service } from '../service/Service.ts';
import Words from "../data/words.js"

export const saveDictionaryToRedis: MenuItem = {
  label: '[Slangman] Save dictionary to Redis',
  location: 'subreddit',
  forUserType: 'moderator',
  onPress: async (_event, context) => {
    const service = new Service(context);

    await service.upsertDictionary('main');
    context.ui.showToast('Dictionary saved to Redis');
  },
};
