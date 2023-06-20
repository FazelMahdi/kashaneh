import createCache from '@emotion/cache';
import { prefixer } from 'stylis';
import rtlPlugin from 'stylis-plugin-rtl';

const createEmotionCache = () => {
  return createCache({ key: 'css', prepend: true, stylisPlugins: [prefixer, rtlPlugin], });
};

export default createEmotionCache;