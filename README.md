# Api de consultas de reportes de dedicación

Visión general simple del uso
## Descripción

API que permite registrar reportes de dedicación semanales a proyectos. 
## Primeros Paso
**git clone https://github.com/wsulbaran/leanwareTest.git**

Version de Nodejs 14.*.*

Previamente tener instalado MongoDB para el registro de datos.

O Agregar en el enviroment, el string de conexion de Mongo Atlas. 
### Instalación
Ir al repositorio clonado y ejecutar **npm install --save**

Crear una copia del archivo que contiene las variables de conexion de DB y Puerto de la aplicacion, **cp .env.json.example .env.json**
### Ejecución
**npm run ts:watch**

**npm run server**

### APIS

**Como usar las Api**

Primero se debe regitrar un usuario en la db. Luego iniciar sesion con el usuario registrado, al iniciar
sesion retornara un token de autenticación. Agregar el token de autenticación en cada peticion de, **registrar proyectos, consultar proyectos, cargar reporte de dedicación,  consultar reporte de dedicación y actulizar**

**Registro de usuario**

**api** : /auth/signup

**tipo**: POST

**curl** : curl --request POST \
  --url http://localhost:3000/auth/signup \
  --header 'Content-Type: application/json' \
  --data '{	
	"email": "admin@yopmail.com",
	"firstName": "admin",
	"lastName": "admin",
	"password": "admin..",
	"typeUser": "0"
}'

**response**: {
  "status": 200,
  "success": true,
  "data": {
    "email": "admin@yopmail.com",
    "firstName": "admin",
    "lastName": "admin",
    "password": "$2b$10$rO9hqCqDRJeMQbmdd9O/KuRQ9SSv3ITlLCZJgny3MYbPMe9h/z7F6",
    "typeUser": "0",
    "_id": "61886fa6ce58b20c8450a35b",
    "createdAt": "2021-11-08T00:30:30.470Z",
    "__v": 0
  },
  "message": "Registred completed"
}

**Inicio de sesion**

**api** : /auth/login

**tipo**: POST

**curl**: curl --request POST \
  --url http://localhost:3000/auth/login \
  --header 'Content-Type: application/json' \
  --data '{	
	"email": "admin@yopmail.com",
	"password": "admin.."
}'

**response** : {
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}

**Crear Projecto**

**api** : /project/create

**tipo**: POST

**curl**: curl --request POST \
  --url http://localhost:3000/project/create \
  --header 'Authorization: bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' \
  --header 'Content-Type: application/json' \
  --data '{
	"name":"DELL"
}'

**response** : {
  "status": 200,
  "success": true,
  "data": {
    "name": "Mundo",
    "_id": "61887bface58b20c8450a369",
    "createdAt": "2021-11-08T01:23:06.327Z",
    "__v": 0
  },
  "message": "Project Created."
}

**Consultar porjectos**

**api** : project/get-projects

**tipo**: GET

**Parametro en query** : skip y limi. ?skip=1&limit=1

**curl**: curl --request GET \
  --url 'http://localhost:3000/project/get-projects?skip=1&limit=1&=' \
  --header 'Authorization: bearer  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'

**response** : {
  "status": 200,
  "success": true,
  "data": {
    "newData": [
      {
        "_id": "61886fd3ce58b20c8450a35e",
        "name": "LG",
        "createdAt": "2021-11-08T00:31:15.794Z",
        "__v": 0
      }
    ],
    "limit": 1,
    "skip": 1,
    "count": 1
  },
  "message": "List Projects."
}

**Cargar dedicación a proyecto**

**api**: /work/load

**tipo**: POST

**curl**: curl --request POST \
  --url http://localhost:3000/work/load \
  --header 'Authorization: bearer  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' \
  --header 'Content-Type: application/json' \
  --data '{
	"project":"618620982401f113569c8282",
	"percentage": 10
}'

**reponse**: {
  "status": 200,
  "success": true,
  "data": {
    "user": "6185f74758145bddc9b23324",
    "project": "61886fd3ce58b20c8450a35e",
    "percentage": 10,
    "week": 44,
    "_id": "61887f13be01698a2f181af5",
    "createdAt": "2021-11-08T01:36:19.400Z",
    "__v": 0
  },
  "message": "Work loads completed."
}

**Consultar Reportes de dedicación.**

**api**: /work/reports?skip=1&limit=10

**tipo**: GET

**Parametros de query**: skip=1&limit=10

**curl**: curl --request GET \
  --url 'http://localhost:3000/work/reports?skip=1&limit=10' \
  --header 'Authorization: bearer  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'

**response**: {
  "status": 200,
  "success": true,
  "data": {
    "data": [
      {
        "_id": "6186c9c488cfde0a5793b5ca",
        "user": "6185f74758145bddc9b23324",
        "project": "618620bc2401f113569c8284",
        "percentage": 50,
        "week": 44,
        "createdAt": "2021-11-06T18:30:28.043Z",
        "__v": 0
      }
    ],
    "limit": 1,
    "skip": 1,
    "count": 3
  },
  "message": "List reports."
}

**Actulizar Reporte de dedicación**

**api**: /work/update-work-load/6186c9c488cfde0a5793b5ca

**tipo**: PUT

**curl**: curl --request PUT \
  --url http://localhost:3000/work/update-work-load/6186c9c488cfde0a5793b5ca \
  --header 'Authorization: bearer  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' \
  --header 'Content-Type: application/json' \
  --data '{
	"percentage": 50
}'

**response**: {
  "status": 200,
  "success": true,
  "data": {
    "_id": "6186c9c488cfde0a5793b5ca",
    "user": "6185f74758145bddc9b23324",
    "project": "618620bc2401f113569c8284",
    "percentage": 50,
    "week": 44,
    "createdAt": "2021-11-06T18:30:28.043Z",
    "__v": 0
  },
  "message": "update work completed."
}
## Autor

**Wilfredo Sulbaran**
