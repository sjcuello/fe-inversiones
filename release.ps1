param (
    $Version
)

if ($Version -eq $null ) {
    echo "Este script require VERSION"
    exit 1
}

echo "Release version: ${VERSION}"

Invoke-WebRequest -UseDefaultCredentials -Method post -Uri https://artifactory.gscorp.ad/artifactory/api/copy/obi/snapshot/obi-frontend/${VERSION}?to=/obi/release/obi-frontend/${VERSION}
Invoke-WebRequest -UseDefaultCredentials -Method post -Uri https://artifactory.gscorp.ad/artifactory/api/copy/obi-generic-local/snapshot/ar/com/supervielle/obi-frontend/${VERSION}/obi-frontend-${VERSION}-config.zip?to=obi-generic-local/release/ar/com/supervielle/obi-frontend/${VERSION}/obi-frontend-${VERSION}-config.zip