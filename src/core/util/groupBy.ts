
export function groupBy<T, K extends keyof T>(items: T[], key: K) {
    const groups = new Map<T[K], T[]>();
    for (let item of items) {
      const groupKey = item[key];
      if (!groups.has(groupKey)) {
        groups.set(groupKey, []);
      }
      groups.get(groupKey)!.push(item);
    }
    return groups;
  }