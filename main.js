// File: main.js
const { divideFile, reconstructFile } = require('./fileprocessor');
const { transferChunks } = require('./communication');

(async () => {
    const filePath = 'largeFile.txt'; // Input file
    const outputPath = 'reconstructedFile.txt';

    console.log('Dividing file into chunks...');
    const chunks = divideFile(filePath);

    console.log('Transferring chunks to destination node...');
    async function transferChunks(chunks, transferHandler) {
        for (const chunk of chunks) {
            console.log(`Before transfer: ${chunk.chunk.toString('hex')}`);
            
            // Simulate the transfer
            const receivedChunk = await transferHandler(chunk.chunk);
    
            console.log(`After transfer: ${receivedChunk.toString('hex')}`);
    
            // Ensure the chunk is unchanged during transfer
            if (chunk.chunk.toString('hex') !== receivedChunk.toString('hex')) {
                throw new Error('Data was altered during transfer!');
            }
        }
    }
    
    
    

    console.log('Reconstructing file at destination...');
    reconstructFile(chunks, outputPath);

    console.log('File transfer complete.');
})();
