/**
 * Created by 002722 on 2017/8/10.
 */
function params(vals) {
  if (typeof vals === 'number') {
    return `id=${vals}`;
  }
  const p = Object.keys(vals).map((key) => {
    return `${encodeURIComponent(key)}=${encodeURIComponent(vals[key])}`;
  }).join('&');
  return p;
}
export default params;
