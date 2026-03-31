const fs = require('fs');
const path = require('path');

/**
 * Validates a Postman collection JSON file
 * @param {string} filePath - Path to the Postman collection JSON file
 * @returns {object} - Validation result with status and errors
 */
function validatePostmanCollection(filePath) {
    const result = {
        valid: false,
        errors: [],
        warnings: [],
        info: {}
    };

    // Check if file exists
    if (!fs.existsSync(filePath)) {
        result.errors.push(`File not found: ${filePath}`);
        return result;
    }

    // Read the file
    let fileContent;
    try {
        fileContent = fs.readFileSync(filePath, 'utf8');
    } catch (err) {
        result.errors.push(`Error reading file: ${err.message}`);
        return result;
    }

    // Parse JSON
    let collection;
    try {
        collection = JSON.parse(fileContent);
    } catch (err) {
        result.errors.push(`Invalid JSON: ${err.message}`);
        return result;
    }

    // Check for Postman collection format
    if (!collection.info || !collection.info.schema) {
        result.errors.push('Missing "info.schema" field - not a valid Postman collection');
        return result;
    }

    // Validate info object
    if (!collection.info.name) {
        result.errors.push('Missing "info.name" field');
    }

    // Check schema version
    const schemaVersion = collection.info.schema;
    result.info.schemaVersion = schemaVersion;

    // Validate items array exists
    if (!collection.item || !Array.isArray(collection.item)) {
        result.errors.push('Missing or invalid "item" array');
    }

    // Validate item structure recursively
    function validateItem(item, path = 'item') {
        if (!item) return;

        // Check for request
        if (item.request) {
            if (typeof item.request !== 'object') {
                result.warnings.push(`${path}.request should be an object`);
            }
        }

        // Check for response
        if (item.response && !Array.isArray(item.response)) {
            result.warnings.push(`${path}.response should be an array`);
        }

        // Recursively validate nested items
        if (item.item && Array.isArray(item.item)) {
            item.item.forEach((subItem, index) => {
                validateItem(subItem, `${path}.item[${index}]`);
            });
        }
    }

    if (collection.item && Array.isArray(collection.item)) {
        collection.item.forEach((item, index) => {
            validateItem(item, `item[${index}]`);
        });
    }

    // Check for authentication
    if (collection.auth && typeof collection.auth !== 'object') {
        result.warnings.push('auth should be an object');
    }

    // Check for variable
    if (collection.variable && !Array.isArray(collection.variable)) {
        result.warnings.push('variable should be an array');
    }

    // Determine if valid
    result.valid = result.errors.length === 0;

    return result;
}

// Main execution
const args = process.argv.slice(2);
const collectionPath = args[0] || 'beeSuite Updated API Collection.postman_collection.json';
const absolutePath = path.resolve(collectionPath);

console.log(`Validating Postman collection: ${absolutePath}\n`);

const result = validatePostmanCollection(absolutePath);

console.log('Validation Result:');
console.log('==================');
console.log(`Status: ${result.valid ? '✓ VALID' : '✗ INVALID'}`);
console.log(`Schema Version: ${result.info.schemaVersion || 'N/A'}`);
console.log(`Errors: ${result.errors.length}`);
console.log(`Warnings: ${result.warnings.length}`);

if (result.errors.length > 0) {
    console.log('\nErrors:');
    console.log('-------');
    result.errors.forEach((error, index) => {
        console.log(`${index + 1}. ${error}`);
    });
}

if (result.warnings.length > 0) {
    console.log('\nWarnings:');
    console.log('---------');
    result.warnings.forEach((warning, index) => {
        console.log(`${index + 1}. ${warning}`);
    });
}

process.exit(result.valid ? 0 : 1);
