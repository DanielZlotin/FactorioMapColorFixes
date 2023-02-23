const {execSync} = require('child_process');
const {readFileSync, writeFileSync} = require('fs');
const {dirname} = require('path')

const root = dirname(process.env.npm_package_json);
execSync(`rm -rf "./dist"`, {cwd: root});
execSync(`mkdir "./dist"`, {cwd: root});

const name = process.env.npm_package_name;
const version = process.env.npm_package_version;
const description = readFileSync(`${root}/README.md`).toString();

const info = JSON.parse(readFileSync(`${root}/src/info.json`).toString());
info.version = version;
info.description = description;
writeFileSync(`${root}/src/info.json`, JSON.stringify(info, null, 2));

execSync(`zip -r "./dist/${name}_${version}.zip" "./src"`, {cwd: root});
