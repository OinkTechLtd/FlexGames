const fs = require('fs');

const dnsList = [
  "1.1.1.1",
  "1.0.0.1",
  "8.8.8.8",
  "8.8.4.4",
  "9.9.9.9",
  "149.112.112.112",
  "dns.adguard-dns.com",
  "dns.nextdns.io"
];

fs.writeFileSync('dns-list.json', JSON.stringify(dnsList, null, 2));
console.log('DNS list updated successfully!');