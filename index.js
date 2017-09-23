var fs = require('fs')
var path = require('path')
var crypto = require('crypto')
var md5File = require('md5-file')

function md5Dir(dirname) {
    const files = fs.readdirSync(dirname);
    const hashes = [];
    const hash = crypto.createHash('md5')

    files.forEach((file) => {
        const filepath = path.join(dirname, file);
        const stat = fs.statSync(filepath);

        let hash;

        if (stat.isFile()) {
            hash = md5File.sync(filepath)
        } else if (stat.isDirectory()) {
            hash = md5Dir(filepath)
        } else {
            hash = null;
        }
        hashes.push(hash);
    });

    hashes.forEach((h) => {
        if (h !== null) hash.update(h)
    });

    return hash.digest('hex');
}

module.exports = md5Dir