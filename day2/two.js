const fs = require('fs');

const OPCODES = [1, 2, 99];

function readContents(fileName) {
  const input = fs.readFileSync(fileName, 'utf8');
  const inputArr = input.replace(/\n/g, '').split(',').map((c) => Number(c));
  return inputArr;
}

function intcode(input) {
  const output = Array.from(input);

  for (let i = 0; i < output.length; i += 4) {
    const op = output[i];

    if (op === 99) break;
    if (!OPCODES.includes(op)) throw new Error(`Bad Opcode: ${op}`);

    const val1 = output[output[i + 1]];
    const val2 = output[output[i + 2]];
    const pos = output[i + 3];

    switch (op) {
      case 1:
        output[pos] = val1 + val2;
        break;
      case 2:
        output[pos] = val1 * val2;
        break;
      default:
        throw new Error(`Bad Opcode: ${op}`);
    }
  }

  return output;
}

function preIntcode(input, noun, verb) {
  const output = Array.from(input);

  output[1] = noun;
  output[2] = verb;

  return output;
}

function findNounVerb(input, target) {
  for (let noun = 0; noun < 100; noun += 1) {
    for (let verb = 0; verb < 100; verb += 1) {
      const preIntcodeResult = preIntcode(input, noun, verb);
      const intcodeResult = intcode(preIntcodeResult);

      const result = intcodeResult[0];

      if (result === target) return [noun, verb];
    }
  }

  throw new Error(`No noun-verb pair found for target ${target}`);
}

function main() {
  const target = 19690720;
  const input = readContents('input.txt');
  const [noun, verb] = findNounVerb(input, target);
  const result = 100 * noun + verb;

  console.log(result);
}

main();
