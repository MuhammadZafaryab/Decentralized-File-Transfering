// File: helpers.js
const crypto = require('crypto');
const zlib = require('zlib');

function encrypt(data, key, iv) {
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    return Buffer.concat([cipher.update(data), cipher.final()]);
}

function decrypt(data, key, iv) {
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
    return Buffer.concat([decipher.update(data), decipher.final()]);
}

function compress(data) {
    return zlib.deflateSync(data);
}

function decompress(data) {
    return zlib.inflateSync(data);
}

function calculateHash(data) {
    if (!Buffer.isBuffer(data)) {
        throw new Error('Data for hash calculation must be a Buffer');
    }
    return crypto.createHash('sha256').update(data).digest('hex');
}



module.exports = { encrypt, decrypt, compress, decompress, calculateHash };