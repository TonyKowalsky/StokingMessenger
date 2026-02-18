export const saveToLocalStorage = <T>(key: string, data: T) => {
  try {
    const serializedData = JSON.stringify(data);
    localStorage.setItem(key, serializedData);
  } catch (e) {
    console.error("Could not save to localStorage", e);
  }
};

export const loadFromLocalStorage = <T>(key: string): T | undefined => {
  try {
    const serializedData = localStorage.getItem(key);
    if (serializedData === null) {
      return undefined;
    }
    return JSON.parse(serializedData) as T;
  } catch (e) {
    console.error("Could not load from localStorage", e);
    return undefined;
  }
};
export const removeFromLocalStorage = (key: string) => {
  try {
    localStorage.removeItem(key);
  } catch (e) {
    console.error("Could not remove from localStorage", e);
  }
};
