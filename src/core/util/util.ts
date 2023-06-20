export function sleep(duration = 1000) {
  return new Promise<void>((resolve) => setTimeout(resolve, duration));
}

export function groupBy<T, K extends keyof T>(items: T[], key: K) {
  const groups = new Map<T[K], T[]>();
  for (const item of items) {
    const groupKey = item[key];
    if (!groups.has(groupKey)) {
      groups.set(groupKey, []);
    }
    groups.get(groupKey)!.push(item);
  }
  return groups;
}

function findParent<T extends { [k in K]: number }, K extends keyof T>(
  items: T[],
  parentKey: K,
) {
  return Math.min(...items.map((x) => x[parentKey]));
}

export function makeTree<
  T extends { [k in K]: number } & { child?: T[] },
  K extends keyof T,
  PK extends keyof T,
  >(nodes: T[], key: K, parentKey: PK, rootId = 0) {
  // const idMap: number[] = Array.from({ length: items.length });
  // items.forEach((item, i) => {
  //   idMap[item[key]] = i;
  // });

  const idMap = Object.fromEntries(nodes.map((item) => [item[key], item]));

  const tree: T[] = [];
  let root: T;

  if (rootId < 0) {
    rootId = findParent(nodes, parentKey);
  }

  for (const node of nodes) {
    if (node[parentKey] === rootId) {
      root = node;

      tree.push(root);

      continue;
    }

    // const parentEl = items[idMap[el[parentKey]]];
    const parentEl = idMap[node[parentKey]];
    parentEl.child = [...(parentEl.child || []), node];
  }

  return tree;
}

const extentionMap = {
  1: 'jpg',
  2: 'png',
  3: 'svg',
  9: 'pdf',
} as const;

export enum ImageFormat {
  Jpg = 1,
  Png = 2,
  Svg = 3,
  Gif = 4,
}

const validExtIds = Object.keys(extentionMap).map(Number);

export interface LegacyPicture {
  Id_Picture?: string | number;
  Id_PictureExt: keyof typeof extentionMap;
}

export interface Picture {
  id?: string | number;
  extensionId: keyof typeof extentionMap;
}

function trimSlashes(str: string) {
  return str.replace(/^\/?|\/?$/g, '');
}

export function createLegacyGetCdnImage(
  cdnUrl: string,
  noImagePlaceholder: string,
) {
  cdnUrl = trimSlashes(cdnUrl);

  function isLegacy(
    picture?: Picture | LegacyPicture,
  ): picture is LegacyPicture {
    return !!picture && !('extensionId' in picture);
  }

  return function (picture?: Picture | LegacyPicture, folder = '') {
    const id = isLegacy(picture) ? picture.Id_Picture : picture?.id;
    const extId = isLegacy(picture)
      ? picture.Id_PictureExt
      : picture?.extensionId;

    if (id == null || extId == null || !validExtIds.includes(extId)) {
      return noImagePlaceholder;
    }

    folder = trimSlashes(folder);
    const filename = trimSlashes(String(id));

    if (folder.startsWith('original')) {
      folder = 'publicbayafile';
    } else if (filename.length >= 36) {
      folder = folder.replace('-x-', `-${filename[0]}/`);
    }

    const extension = extentionMap[extId];

    return `${cdnUrl}/${folder}/${filename}.${extension}`;
  };
}

export function deviceIsMobile() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator?.userAgent,
  );
}

export function fileToDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
