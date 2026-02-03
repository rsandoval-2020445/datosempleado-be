# Backend - Sistema de Gestión de Colaboradores

API REST desarrollada con Node.js y Express.js para la gestión de colaboradores.
Implementa un CRUD completo con persistencia en base de datos MySQL.

Stack Tecnológico
- Node.js
- Express.js
- MySQL
- Librería mysql2 (pool de conexiones)

Requisitos
- Node.js (versión 20.x o superior recomendada)
- MySQL Server en ejecución

Instalación y Ejecución

cd carpeta_de_destino
npm install
node index.js

El servidor se iniciará en el puerto 3000.

Asegúrese de que la base de datos MySQL esté configurada correctamente según las credenciales definidas en config/db.js o mediante variables de entorno.

Pruebas de API (Carga Masiva con Postman)

Este proyecto incluye archivos para realizar pruebas automatizadas de datos mediante Postman.
Los archivos se encuentran dentro del directorio backend.

Archivos incluidos
- SistemaColaboradores.postman_collection.json: Colección con la definición de los endpoints
- datos.json: Dataset para la carga masiva de colaboradores

Instrucciones para Postman Runner

1. Importe el archivo SistemaColaboradores.postman_collection.json en Postman.
2. Verifique que el body del endpoint POST /colaborador tenga la siguiente estructura:

{
  "nombre": "{{nombre}}",
  "apellido": "{{apellido}}",
  "direccion": "{{direccion}}",
  "edad": {{edad}},
  "profesion": "{{profesion}}",
  "estadocivil": "{{estadocivil}}"
}

3. Seleccione la colección importada y haga clic en Run Collection.
4. En el Runner, seleccione Select File y cargue el archivo datos.json.
5. Ejecute el Runner para procesar los registros automáticamente.

El sistema validará duplicados y responderá con el código HTTP correspondiente.
