/**
 * Converts an object to a query string.
 */
export function toQueryString(params: { [key: string]: string }) {
  return (
    '?' +
    Object.entries(params)
      .map(
        ([key, value]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(value)}`,
      )
      .join('&')
  );
}
