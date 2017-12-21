## Check Digit Tool

The Check Digit Tool allows HMDA filers to enter a universal load identifier (ULI) and returns a check digit.

The check digit is calculated using the ISO/IEC 7064, MOD 97-10 as it appears on the International Standard ISO/IEC 7064:2003, which is published by the International Organization for Standardization (ISO).

- https://www.iso.org/obp/ui/#iso:std:iso-iec:7064:ed-1:v1:en
- https://github.com/stvkoch/ISO7064-Mod-97-10

### Setup

Clone the repo, then from the project root directory:

```
yarn
yarn run check-digit
cd check-digit
docker run -it -p "3000:80" -v "$(pwd)/dist:/usr/share/nginx/html" nginx:1.12
```

Visit your site at your docker host IP at the above mapped port (eg `192.168.99.100:3000`)
