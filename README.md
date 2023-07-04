# animeAPI

Rutas:

GENRES

GET /genres/getFromApi -> se usa para llenar los genres de la base de datos desde la API
GET /genres -> trae todos los géneros con el siguiente formato {id, name}
POST /genres -> crea un género, enviar por body: {name:'nombre'}
PUT /genres/:genreId -> modifica el nombre de un género, requiere enviar por body: {name:'nombre'}
DELETE /genres/:genreId -> elimina un género

PRODUCERS

GET /genres/getFromApi -> se usa para llenar los genres de la base de datos desde la API
GET /genres -> trae todos los géneros con el siguiente formato {id, name}
POST /genres -> crea un género, enviar por body: {name:'nombre'}
PUT /genres/:genreId -> modifica el nombre de un género, requiere enviar por body: {name:'nombre'}
DELETE /genres/:genreId -> elimina un género
