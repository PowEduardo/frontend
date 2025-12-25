docker build -t frontend .
docker rm -f frontend 2>/dev/null || true
docker run -m 1g --name frontend -p 9010:80 -d frontend