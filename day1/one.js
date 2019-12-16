const fs = require('fs');
const rl = require('readline');

const reducor = (accumulator, val) => accumulator += (Math.floor(val/3) - 2);

function main() {
  const input = fs.createReadStream('input.txt');
  const lineReader = rl.createInterface({input});

  const nums = [];

  lineReader.on('line', line => nums.push(line));

  lineReader.on('close', () => {
    const result = nums.reduce(reducor, 0);
    console.log(result);
  });
}

main();
