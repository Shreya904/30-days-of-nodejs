const fs = require('fs');
const path = require('path');

function writeToFile(filePath, content) {
    const directory = path.dirname(filePath);

   
    if (!fs.existsSync(directory)) {
        try {
            fs.mkdirSync(directory, { recursive: true });
        } catch (err) {
            console.error(`Error creating directory: ${err.message}`);
            return;
        }
    }

    
    fs.writeFile(filePath, content, (err) => {
        if (err) {
            console.error(`Error writing to file: ${err.message}`);
        } else {
            console.log(`Data written to ${filePath}`);
        }
    });
}
writeToFile('test-files/output1.txt', 'Sample content.');


writeToFile('test-files/nonexistent-folder/output.txt', 'Content in a non-existent folder.');

