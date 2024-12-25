// File: config.js
//const crypto = require('crypto');
module.exports = {
    CHUNK_SIZE: 1024 * 1024, // 1 MB chunks
    ENCRYPTION_KEY: Buffer.from('01234567890123456789012345678901', 'utf-8'), // Fixed 32-byte key
    IV: Buffer.from('0123456789012345', 'utf-8'), // Fixed 16-byte IV
};
