const fs = require('fs');

const dnsList = [
  { name: "Cloudflare", dns: "1.1.1.1" },
  { name: "Google", dns: "8.8.8.8" },
  { name: "Quad9", dns: "9.9.9.9" }
];

fs.writeFileSync('dns-list.json', JSON.stringify(dnsList, null, 2));
console.log('DNS list updated!');