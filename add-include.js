#!/usr/bin/env node

/**
* Add an entry in the include property of a tsconfig file. 
* Requires node 14 or later
* Built to aid in global environment vars in nx projects.
* 
* put this script in a file called add-include.js in /usr/local/bin/ an 
* give it 755 permission.
*
* Put your common types in a folder, i.e: create a folder called types in 
* your project root, and put there some declarations files.

* then do a find with exec:
* 
* cd project-root
* find apps/ libs/ -name tsconfig.\*.json -exec add-include.js "../../types/*.d.ts" "{}" \;
*
* Recomendation: this is an undoable operation, so before executing 
* the code commit your work.
*/


const fs = require("fs");

if (process.argv.length < 4) {
  console.log(`Usage: add-include.js path-of-includes files`);
  console.log(`sample: add-include.js "../../*.d.ts" "{}"`);
  process.exit(-1);
}

const [,,newlib,...archivos] = process.argv;
archivos.forEach(a => {
  if (!fs.existsSync(a)) {
    console.log(`file ${a} not found, aborting`);
    process.exit(-1);
  }
})


archivos.forEach(a => {
  console.log(`processing ${a}`);
  const data = fs.readFileSync(a);
  const config = JSON.parse(data);

  if (!Array.isArray(config.include)) {
    console.log(`invalid file ${a}, no include property found, skipping`);
    return;
  }
  if (config.include.find(s => s === newlib)) {
    console.log(`${a} already has the value, skipping`);
    return;
  }
  config.include.push(newlib);
  fs.writeFileSync(a, JSON.stringify(config));
});

console.log(`Done, modified ${archivos.length} files`);
