const fs = require('fs');
const rl = require('readline');

function fuelReduction(accumulator, moduleMass, index) {
  let result = Math.floor(moduleMass / 3) - 2;
  let addedMass = result;

  console.log(`Initial fuel requirements for module ${index}: ${addedMass}`);

  while (addedMass > 0) {
    console.log('Recalculating fuel for newly added mass');

    addedMass = Math.floor(addedMass / 3) - 2;

    if (addedMass > 0) {
      result += addedMass;
      console.log('Adding fuel mass:', addedMass);
    } else {
      console.log('Finished calculations');
    }
  }

  console.log(`Final fuel requirements for module ${index}: ${result}\n`);

  return accumulator + result;
}

function main() {
  const input = fs.createReadStream('input.txt');
  const lineReader = rl.createInterface({ input });

  const nums = [];

  lineReader.on('line', (line) => nums.push(line));

  lineReader.on('close', () => {
    const result = nums.reduce(fuelReduction, 0);
    console.log(`\nFinal total fuel requirements: ${result}`);
  });
}

main();
