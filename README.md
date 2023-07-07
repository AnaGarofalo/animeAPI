# animeAPI

Rutas:

GENRES

GET /genres/getFromApi -> se usa para llenar los genres de la base de datos desde la API
GET /genres -> trae todos los géneros con el siguiente formato {id, name}
POST /genres -> crea un género, enviar por body: {name:'nombre'}
PUT /genres/:genreId -> modifica el nombre de un género, requiere enviar por body: {name:'nombre'}
DELETE /genres/:genreId -> elimina un género

PRODUCERS

GET /producers/getFromApi -> se usa para llenar los productores de la base de datos desde la API
GET /producers/full -> trae todos los productores con el siguiente formato {id, title, japaneseTitle, image, about}
GET /producers/min -> trae todos los productores con el siguiente formato {id, title}
POST /producers -> crea un productor, enviar por body: {title:String, japaneseTitle:String, about:String, image:String}
PUT /producers/:id -> modifica cualquier propiedad del productor, necesita enviar por body un objeto con la propiedad y el valor a cambiar
DELETE /producers/:id -> elimina un productor

ANIMES

GET /anime/getFromApi -> guarda todos los animes de la API en la bdd
GET /anime -> trae todos los animes en el siguiente formato: {id, title, score, image, genres:[{id, name}], producers:[{id, title}]}
GET /anime/:id -> trae un anime con el siguiente formato: {id, title, japaneseTitle, status, sinopsis, scored, scoredBy, image, episodes, aired:{from:Date, to:Date}, genres:[{id, name}], producers:[{id, title}]}
POST /anime -> crea un anime, requiere enviar por body: { title, japaneseTitle, status, sinopsis, scored, scoredBy, image, episodes, aired:{from:Date, to:Date}, genres:[ String, String], producers:[String, String]} Nota: puede enviarse un género que aún no exista en la bdd y será creado, no así con los productores
DELETE /anime/:id ->elimina un anime
