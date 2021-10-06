#!/bin/bash
# Este script se encarga de hacer el release de la version indicada del front.
# Interactua con la API de Artifactory y copia de snapshot a release la imagen docker y el zip de config
# A diferencia de release.sh NO incrementa el patch en la version en package.json
# Recibe como parametro: version_a_relesear

set -e

if [ "$#" -ne 1 ]; then
    echo "Este script require VERSION"
    exit 1
fi

VERSION=$1
USER=obi
PASS=kenobi

echo "Release version: $VERSION, con user $USER y pass $PASS"

curl --insecure -u $USER:$PASS -X POST "https://artifactory.gscorp.ad/artifactory/api/copy/obi/snapshot/obi-frontend/$VERSION?to=/obi/release/obi-frontend/$VERSION"
curl --insecure -u $USER:$PASS -X POST "https://artifactory.gscorp.ad/artifactory/api/copy/obi-generic-local/snapshot/ar/com/supervielle/obi-frontend/$VERSION/obi-frontend-$VERSION-config.zip?to=obi-generic-local/release/ar/com/supervielle/obi-frontend/$VERSION/obi-frontend-$VERSION-config.zip"

echo "Generando tag: $VERSION"
git tag -a $VERSION -m "Release Fix"
git push origin $VERSION
