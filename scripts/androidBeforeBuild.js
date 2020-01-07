const fs = require('fs');
const util = require('util');
const stat = util.promisify(fs.stat);

module.exports = function(ctx) {
    console.log(process.cwd());
    fs.copyFile('./scripts/build-extras.gradle', './platforms/android/app/build-extras.gradle', (err) => {
        if (err) throw err;
        console.log('source.txt was copied to destination.txt');
      });
}