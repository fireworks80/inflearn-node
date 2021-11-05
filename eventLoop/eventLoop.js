setTimeout(() => {
  console.log('timeout');
});
new Promise((resolve) => {
  resolve('hi');
}).then(console.log);
