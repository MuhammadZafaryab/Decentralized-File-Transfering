# Decentralized-File-Transfering

Algorithms and Techniques Applied
AES-256-CBC Encryption:

Provides robust encryption for securing file chunks during transfer.
Uses a symmetric key and an initialization vector (IV) for encryption and decryption.
Zlib Compression:

Reduces the size of encrypted chunks, improving transfer speed and efficiency.
Compression also adds a layer of obfuscation, enhancing data security.
SHA-256 Hashing:

Ensures data integrity by generating a unique hash for each compressed chunk.
The hash is used to detect corruption or tampering during transfer.

File Division and Reconstruction:

The file is divided into smaller chunks for easier transfer.
Chunks are reassembled in the correct order to reconstruct the original file after transfer.
