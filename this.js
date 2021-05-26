// console.log(this); // {}
// console.log(this === module.exports); // true

function a() {
  console.log(this === global); // true
}

// a();

// setImmediate(() => console.log('immediate'));

// process.nextTick(() => console.log('nextTick'));

// setTimeout(() => console.log('timeout'));

// Promise.resolve().then(() => console.log('promise'));

const os = require('os');

// console.log(os.cpus().length);
const crypto = require('crypto');

// console.log(crypto);

crypto.randomBytes(64, (err, buf) => {
  const salt = buf.toString('base64');
  console.log('salt', salt);
  crypto.pbkdf2('비밀번호', salt, 100000, 64, 'sha512', (err, key) => {
    console.log('password:', key.toString('base64'));
  });
});
