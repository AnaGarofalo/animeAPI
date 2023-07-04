# animeAPI

Rutas:

GENRES
GET /genres/getFromApi -> se usa para llenar los genres de la base de datos desde la API
GET /genres -> trae todos los géneros con el siguiente formato {id, name}
POST /genres -> crea un género, enviar por body: {name:'nombre'}
