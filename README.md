# VueJS_Laravel_Spring-Boot_MySQL

Por [`Sergi Mic贸 Ortiz`](https://github.com/sergimicoortiz)  y  [`Juan Luis L贸pez del Barco`](https://github.com/JuanLuisLopez-code)

## Table of Contents

1. Kamaron
2. Instalar
3. Tecnologias


# Kamaron! 馃
_Bienvenidas y bienvenidos a Kamaron_

1. **Home:**
   Carousel e infiniteScroll de las mesas m谩s grandes(capacidad de comensales)

2. **Reservation:**
   Obtenci贸n de mesas, filtros, paginaci贸n, acceso al details

3. **Details:**
   Ver detalles de la propia mesa, calendario con dias de reservas y colores para distinguir si se puede o no reservar.

4. **Profile:**
   Ver detalles de tu perfil en concreto, adem谩s poder acceder al listado entero de tus reservas y a partir de ah铆 poder
   updatear o borrar la propia reserva si es necesario.

5. **Login:**
   Register y Login de usuario.

6. **Dashboard:**
   Solo tienen acceso los administradores, contiene todos los cruds: categorias, mesas, reservas, usuarios.
   Los administradores en este apartado puedes acceder al FileUpload en el CRUD de categorias.
   Acceso de los administradores a la acceptaci贸n de una reserva.

## Instalar 馃捒

---

### `Requisitos`
Es necesario crear el fichero .env en la carpeta backend y el secrets.js del frontend. El contenido puede ser el mismo que el de los ficheros de ejemplo.

Tener instalado las siguientes herramientas:

- [Vue](https://vuejs.org/) v3
- [Laravel](https://laravel.com/) v9
- [Spring-boot](https://spring.io/projects/spring-boot) v2.7.6
- [MySQL](https://www.mysql.com/)

### `Puesta en marcha`

#### Backend
  ```
  cd backend
  chmod 777 -R .
  php artisan key:generate
  php artisan jwt:secret
  php artisan storage:link
  php artisan migrate:fresh --seed
  ```

  #### Frontend
  ```
  cd frontend
  npm install -D
  npm run dev
  ```

## Tecnolog铆as 馃懆鈥嶐煉?

---

Lista de tecnolog铆as utilizadas en este proyecto:

`Backend` 馃彈锔?

- [Laravel](https://laravel.com/) v9
  - Routes
  - Models
  - Controllers
  - DB validation
  - File upload
  - Mysql
    - Relationships
    - Schema
  - Middleware_auth
    - Header
    - Token JWT
  - Seeders y factorys: users y products

- [Spring-boot](https://spring.io/projects/spring-boot) v2.7.6
  - Routes
  - Models
  - Controllers
  - DB validation
  - MySQL
    - Relationships
    - Schema
  - Middleware_auth
    - Header
    - Token JWT
    - Token Blacklist

`Frontend` 馃彌锔?

- [Vue](https://vuejs.org/) v3
  - JavaSpript
  - Estructurado en Modules
  - Routes
  - Models
  - Components
  - Reactive Forms
    - Validation
  - Lazy load
  - Guards
  - Service with axios 
  - Authentication JWT enviado por Headers
  - Store y composables
  - Librerias:
    - Toaster
    - V-Calendar
    - DataTables
    - vue-select
  
  

`BBDD`馃捑

- [MySQL](https://www.mysql.com/)