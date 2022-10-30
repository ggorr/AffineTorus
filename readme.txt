not working
docker run -p 9007:80 -d --name nginx-torus -v ./html:/usr/share/nginx/html nginx

working
docker run -d --name nginx-torus -p 9007:80 --mount type=bind,source="C:\Users\kpark\Documents\Web\docker\nginx-torus",target="/usr/share/nginx/html" nginx