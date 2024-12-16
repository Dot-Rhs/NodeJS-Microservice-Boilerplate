/**
 * Unix Timestamp
 *
 * @description
 * Converts the milliseconds returned from JS Date object,
 * into seconds
 *
 * @returns {number}
 */
export default function unixTimestamp(): number {
  const date = new Date();
  return Math.floor(date.getTime() / 1000);
}
