const path = require('path');
const fs = require('fs');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

const SUBDIR_REGEX = /^day\d+$/;

function installNpmModules(dir) {
  return exec('npm install', { cwd: dir });
}

function getSubfolderProjects(dir) {
  return fs.readdirSync(dir)
    .filter((subdir) => subdir.match(SUBDIR_REGEX))
    .map((subdir) => path.join(dir, subdir));
}

async function main() {
  const installCalls = getSubfolderProjects(process.cwd())
    .map((dir) => installNpmModules(dir));

  await Promise.all(installCalls);
}

main();
