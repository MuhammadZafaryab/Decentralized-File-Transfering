// File: communication.js
const { calculateHash } = require('./helpers');

async function transferChunks(chunks, transferHandler) {
    for (const chunk of chunks) {
        let success = false;
        let attempts = 0;

        while (!success && attempts < 3) {
            try {
                const result = await transferHandler(chunk.chunk);
                if (calculateHash(result) === chunk.hash) {
                    success = true;
                } else {
                    throw new Error('Data integrity check failed');
                }
            } catch (error) {
                attempts++;
                console.error(`Retrying chunk transfer: ${attempts} attempt(s)`);
            }
        }

        if (!success) {
            throw new Error('Failed to transfer chunk after 3 attempts');
        }
    }
}

module.exports = { transferChunks };
