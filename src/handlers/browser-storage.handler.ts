/**
 * Store data in localStorage
 * @param key Identifier string
 * @param value The object to store
 * @param ttl Time To Live, number of milliseconds that this item should be retrieved from localStorage and considered valid.
 */

export function setLocal(key: string, value: unknown, ttl?: number): void {
  let item = value;
  if (ttl) {
    const now = new Date();
    item = {
      _ttlValue: value,
      _ttlExpiry: now.getTime() + ttl,
    };
  }

  try {
    window.localStorage.setItem(key, JSON.stringify(item));
  } catch (e) {
    console.error(e);
  }
}

export function getLocal<T = unknown>(key: string): T | null {
  let value: string | null = null;

  try {
    value = window.localStorage.getItem(key);
    if (!value) {
      return null;
    }
    const item = JSON.parse(value);
    const now = new Date();
    if (item._ttlExpiry && now.getTime() > item._ttlExpiry) {
      localStorage.removeItem(key);
      return null;
    }
    return item._ttlValue ?? item;
  } catch (e) {
    if (e instanceof SyntaxError && value) {
      // In case "value" is not valid JSON-like string, we return value as string
      return value as T;
    }
  }
  return null;
}

export function removeLocal(key: string) {
  window.localStorage.removeItem(key);
}

/**
 * Store data in sessionStorage
 * @param key Identifier string
 * @param value The object to store
 * @param ttl Time To Live, number of milliseconds that this item should be retrieved from sessionStorage and considered valid.
 */

export function setSessionStorage(key: string, value: unknown, ttl?: number): void {
  let item = value;
  if (ttl) {
    const now = new Date();
    item = {
      _ttlValue: value,
      _ttlExpiry: now.getTime() + ttl,
    };
  }

  try {
    window.sessionStorage.setItem(key, JSON.stringify(item));
  } catch (e) {
    console.error(e);
  }
}

export function getSessionStorage<T = unknown>(key: string): T | null {
  let value: string | null = null;

  try {
    value = window.sessionStorage.getItem(key);
    if (!value) {
      return null;
    }
    const item = JSON.parse(value);
    const now = new Date();
    if (item._ttlExpiry && now.getTime() > item._ttlExpiry) {
      sessionStorage.removeItem(key);
      return null;
    }
    return item._ttlValue ?? item;
  } catch (e) {
    if (e instanceof SyntaxError && value) {
      // In case "value" is not valid JSON-like string, we return value as string
      return value as T;
    }
  }
  return null;
}

export function removeSessionStorage(key: string) {
  window.sessionStorage.removeItem(key);
}
