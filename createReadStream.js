const fs = require('fs');
readStream = fs.createReadStream('./readmeStream.txt', { highWaterMark: 16 });

const data = [];
readStream.on('data', (chunk) => {
  data.push(chunk);
  console.log('data: ', chunk, chunk.length);
});

readStream.on('end', () => {
  console.log('end: ', Buffer.concat(data).toString());
});

readStream.on('error', (err) => {
  console.log('error: ', err);
});
