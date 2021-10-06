#!/bin/bash
# Este script se encarga de hacer el release de la version indicada del front.
# Concretamente interactuar con la API de Artifactory y copia de snapshot a release la imagen docker y el zip de config
# Recibe como parametro: version_a_relesear, user_de_artifactory, pass_de_artifactory

set -e

if [ "$#" -ne 3 ]; then
    echo "Este script require VERSION USER y PASS en este orden"
    exit 1
fi

VERSION=$1
USER=$2
PASS=$3

echo "Release version: $VERSION, con user $USER y pass $PASS"

curl --insecure -u $USER:$PASS -X POST "https://artifactory.gscorp.ad/artifactory/api/copy/obi/snapshot/obi-frontend/$VERSION?to=/obi/release/obi-frontend/$VERSION"
curl --insecure -u $USER:$PASS -X POST "https://artifactory.gscorp.ad/artifactory/api/copy/obi-generic-local/snapshot/ar/com/supervielle/obi-frontend/$VERSION/obi-frontend-$VERSION-config.zip?to=obi-generic-local/release/ar/com/supervielle/obi-frontend/$VERSION/obi-frontend-$VERSION-config.zip"

VERSION=$(cat package.json | grep version | cut -d'"' -f4)
MAJOR=`echo $VERSION | awk -F '.' '{print $1}'`
MINOR=`echo $VERSION | awk -F '.' '{print $2}'`
OLD_PATCH=`echo $VERSION | awk -F '.' '{print $3}'`
NEW_PATCH=`echo "$OLD_PATCH+1" | bc`
NEW_VERSION="$MAJOR.$MINOR.$NEW_PATCH"

echo "Generando tag: $VERSION"
git tag -a $VERSION -m "Release"
git push origin $VERSION

echo "Actualizando version a: $NEW_VERSION"
cat package.json | sed "s/$VERSION/$NEW_VERSION/g" | tee package.json.new  > /dev/null
mv -f package.json.new package.json

git add package.json
git commit -m "Version incrementa a $NEW_VERSION"
git push origin develop
