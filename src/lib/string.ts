const capitalize = (str: string): string =>
  str.charAt(0).toUpperCase() + str.slice(1);

/**
 * Extract the locale from the path
 * @param path  The path to extract the locale from
 * @returns
 */
const getLocaleFromPath = (path: string): string => path.split("/")[1];

export { capitalize, getLocaleFromPath };
