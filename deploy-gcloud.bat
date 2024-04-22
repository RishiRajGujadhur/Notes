set GCLOUD_PROJECT=gcloud-docker-example-420010
set REPO=note-repository
set REGION=africa-south1
set IMAGE=notes-project-image
set IMAGE_TAG=%REGION%-docker.pkg.dev/%GCLOUD_PROJECT%/%REPO%/%IMAGE%

docker build -t %IMAGE_TAG% -f Dockerfile --platform linux/x86_64 .
docker push %IMAGE_TAG%
pause 