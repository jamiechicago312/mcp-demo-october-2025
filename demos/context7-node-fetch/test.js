const { getStatus } = require('./index');

(async () => {
  const status = await getStatus('https://example.com');
  if (status !== 200) {
    console.error('Expected 200, got', status);
    process.exit(1);
  }
  console.log('PASS');
})();