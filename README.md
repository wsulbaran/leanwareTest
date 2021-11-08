# testBlockCoder

Simple overview of use/purpose.

## Descripción

Este proyecto registra las transacciones de los bloque de Ethereum  cuando empiezan a minar. 
Las transacciones, se guardan en una base de datos de MongoDB, para luego ser consultada a traves una api.

## Primero Paso
git clone https://github.com/wsulbaran/testBlockCoder.git

Version de Nodejs 14.*.*

Previamente tener instalado MongoDB para el registro de datos.
### Instalación
Ir al repositorio clonado y ejecutar npm install --save

Crear una copia del archivo, cp .env.json.example .env.json
### Ejecución
npm run ts:watch

npm run server

### APIS

/api/transaction/:filter  GET

Cuerpo de la peticion

// example: address, blocknumber, hash

/api/transaction/123617351

/api/transaction/address POST

Cuerpo de la peticion 

// example: "from" o "to"

{

    "origin":"to",   
    "address":""

}
## Autor

Wilfredo Sulbaran
