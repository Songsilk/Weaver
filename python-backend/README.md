# INSTALAR DOCKER y tener internet

## Crear y ejecutar la build
docker compose build **crea la proyecto**

docker compose up **Lanza el proyecto**

La dirección de ejecución es localhost:8000


## Cerrar el entorno de desarrollo
Cerrado normal
docker compose down

Cerrado eliminando la información de la DB
docker compose down -v

docker exec -it mysql-dev bash
mysql -u root -p
rootpassword

SOURCE /docker-entrypoint-initdb.d/DBWEAVER_mysql.sql
