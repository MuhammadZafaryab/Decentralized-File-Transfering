//fileprocessor
const fs = require('fs');
const { encrypt, decrypt, compress, decompress, calculateHash } = require('./helpers');
const { CHUNK_SIZE, ENCRYPTION_KEY, IV } = require('./config');

/**
 * Splits a file into chunks, encrypts and compresses each chunk, and calculates its hash.
 * Logs each step for debugging.
 * @param {string} filePath - The path of the file to divide.
 * @returns {Array} Array of objects containing the chunk data and its hash.
 */
function divideFile(filePath) {
    const chunks = [];
    const fileData = fs.readFileSync(filePath);

    console.log(`Dividing file: ${filePath}`);
    console.log(`File size: ${fileData.length} bytes`);

    


    for (let i = 0; i < fileData.length; i += CHUNK_SIZE) {
        const chunk = fileData.slice(i, i + CHUNK_SIZE);

        console.log(`Original chunk (${i}-${i + CHUNK_SIZE}):`, chunk.toString('hex'));

        // Encrypt the chunk
        const encryptedChunk = encrypt(chunk, ENCRYPTION_KEY, IV);
        console.log(`Encrypted chunk:`, encryptedChunk.toString('hex'));

        // Compress the chunk
        const compressedChunk = compress(encryptedChunk);
        console.log(`Compressed chunk:`, compressedChunk.toString('hex'));

         // Log type, Buffer check, and data content before hash calculation
         console.log('Type of data before hash calculation (divideFile):', typeof compressedChunk);
         console.log('Is Buffer (divideFile):', Buffer.isBuffer(compressedChunk));
         console.log('Data before hash calculation (divideFile):', compressedChunk.toString('hex'));
 

        console.log(`Data before hash calculation: ${compressedChunk.toString('hex')}`);

        // Calculate the hash for integrity check
        const hash = calculateHash(compressedChunk);
        console.log(`Chunk hash: ${hash}`);

        chunks.push({ chunk: compressedChunk, hash });
    }

    console.log(`Total chunks created: ${chunks.length}`);
    return chunks;
}

/**
 * Reconstructs a file from encrypted and compressed chunks, verifying integrity of each chunk.
 * Logs each step for debugging.
 * @param {Array} chunks - Array of objects containing chunk data and their hashes.
 * @param {string} outputPath - The path where the reconstructed file will be saved.
 */

function reconstructFile(chunks, outputPath) {
    console.log(`Reconstructing file to: ${outputPath}`);
    console.log(`Total chunks to process: ${chunks.length}`);

    const fileData = Buffer.concat(
        chunks.map(({ chunk, hash }, index) => {
            console.log(`Processing chunk ${index + 1}/${chunks.length}`);
            console.log(`Received compressed chunk:`, chunk.toString('hex'));

            // Verify hash on compressed data before decompression
            console.log('Type of data before hash calculation (compressed):', typeof chunk);
            console.log('Is Buffer (compressed):', Buffer.isBuffer(chunk));
            console.log('Data before hash calculation (compressed):', chunk.toString('hex'));

            const calculatedHash = calculateHash(chunk);
            console.log(`Expected hash: ${hash}`);
            console.log(`Calculated hash: ${calculatedHash}`);

            if (calculatedHash !== hash) {
                throw new Error(
                    `Data integrity check failed for chunk ${index + 1}. Expected: ${hash}, Got: ${calculatedHash}`
                );
            }

            // Decompress and decrypt after verifying integrity
            const decompressedChunk = decompress(chunk);
            console.log(`Decompressed chunk:`, decompressedChunk.toString('hex'));

            const decryptedChunk = decrypt(decompressedChunk, ENCRYPTION_KEY, IV);
            console.log(`Decrypted chunk:`, decryptedChunk.toString('hex'));

            return decryptedChunk;
        })
    );

    fs.writeFileSync(outputPath, fileData);
    console.log(`File reconstruction complete. Saved to: ${outputPath}`);
}


module.exports = { divideFile, reconstructFile };
