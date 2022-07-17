export const omit = (keys: string[], obj: {}) =>
    Object.fromEntries(Object.entries(obj).filter(([k]) => !keys.includes(k)));
