async function getStatus(url) {
  const { default: fetch } = await import('node-fetch');
  const res = await fetch(url);
  return res.status;
}

module.exports = { getStatus };