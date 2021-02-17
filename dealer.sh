#!/bin/bash

npm run build
scp -r -P 443 dist/* dealer@reparto.g06.batoilogic.es:/var/www/dealer/html
