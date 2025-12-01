const fs = require('fs');
const path = require('path');

// Get API URL from environment variable or use default
const apiUrl = process.env.API_URL || 'https://job-tracker-application-full-stack.onrender.com';

// Path to environment.prod.ts
const envPath = path.join(__dirname, '../src/environments/environment.prod.ts');

// Read the file
let content = fs.readFileSync(envPath, 'utf8');

// Replace the API URL
content = content.replace(
  /apiUrl:\s*['"`][^'"`]*['"`]/,
  `apiUrl: '${apiUrl}'`
);

// Write back to file
fs.writeFileSync(envPath, content, 'utf8');

console.log(`✅ Updated API URL in environment.prod.ts to: ${apiUrl}`);

