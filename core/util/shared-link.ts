const mediaLinkMap = {
  twitter: 'https://twitter.com/intent/tweet?url=',
  linkedin: 'https://www.linkedin.com/shareArticle?mini=true&url=',
  whatsapp: 'https://wa.me/?text=',
  email: 'mailto:?subject=',
};

export type Media = keyof typeof mediaLinkMap;

function isMediaType(media: string): media is Media {
  return media in mediaLinkMap;
}

export function getSocialMediaLink(media: Media | string, link: string) {
  const baseUrl = (process.env.VUE_APP_URL ?? window.location.origin).replace(
    /\/?$/,
    '',
  );

  link = link
    .replace(/^\/?/, '')
    .split('/')
    .filter((part, i) => i < 1 || /^\d+$/.test(part))
    .join('/');

  link = `${baseUrl}/${link}`;

  if (!isMediaType(media)) return link;

  return mediaLinkMap[media] + encodeURIComponent(link);
}
