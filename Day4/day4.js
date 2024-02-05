const path = require('path');

function resolvePath(relativePath) {
    // Resolve the relative path to an absolute path
    const absolutePath = path.resolve(relativePath);

    // Print the resolved path to the console
    console.log('Resolved Path:', absolutePath);
}

resolvePath('../project/folder/file.txt');
// Expected Output: Resolved Path: /Users/username/project/folder/file.txt

resolvePath('nonexistent-folder/file.txt');
// Expected Output: Resolved Path: /Users/username/nonexistent-folder/file.txt
