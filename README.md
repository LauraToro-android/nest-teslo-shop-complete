
# 🛒 Nest Teslo Shop API

Backend de e-commerce desarrollado con **NestJS**, **TypeScript** y **MySQL**.

La aplicación expone una API REST completa con autenticación JWT, gestión de productos, subida de archivos, seed de base de datos, documentación Swagger y despliegue en Render.

---

![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge\&logo=nestjs\&logoColor=white)

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge\&logo=typescript\&logoColor=white)

![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge\&logo=mysql\&logoColor=white)

![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge\&logo=docker\&logoColor=white)

---

## 🚀 Demo

* API: https://nest-teslo-shop-complete-dzzh.onrender.com
* Swagger: https://nest-teslo-shop-complete-dzzh.onrender.com/api

---

## ✨ Features

* JWT Authentication
* CRUD de productos
* Gestión de inventario y stock
* Upload de archivos
* Seed automático de base de datos
* Migraciones con TypeORM
* Swagger / OpenAPI
* Docker Compose
* Variables de entorno
* Arquitectura modular
* Deploy en Render

---

## 🧰 Stack tecnológico

### Backend

* NestJS
* Node.js
* Express
* TypeScript

### Base de datos

* MySQL
* TypeORM

### Validación y seguridad

* JWT Authentication
* class-validator
* class-transformer
* CORS

### Gestión de archivos

* Multer
* File handling

### Calidad de código

* ESLint
* Prettier
* Husky
* lint-staged

### Testing

* Mocha
* Supertest
* Sinon

---

## 🧱 Arquitectura del proyecto

El proyecto sigue una arquitectura modular basada en NestJS:

```text
src/
├── auth/          # Autenticación y autorización
├── products/      # Gestión de productos
├── files/         # Gestión de archivos
├── seed/          # Datos iniciales
├── common/        # Helpers y utilidades compartidas
├── migrations/    # Migraciones de base de datos
```

Cada módulo encapsula su propia lógica de negocio, controladores y servicios para mantener una arquitectura escalable y mantenible.

---

## 🗄️ Base de datos y DataSource

El proyecto utiliza TypeORM DataSource como configuración independiente de NestJS.

Esto permite:

* Ejecutar migraciones desde CLI
* Ejecutar seeds de base de datos
* Compartir configuración entre aplicación y herramientas externas

Archivo principal:

```text
src/data-source.ts
```

---

## ⚙️ Instalación

Clonar repositorio:

```bash
git clone https://github.com/LauraToro-android/nest-teslo-shop-complete.git
```

Instalar dependencias:

```bash
npm install
```

---

## 🔐 Variables de entorno

Crear archivo `.env`:

```env
DB_HOST=localhost
DB_PORT=3306
DB_NAME=tesloDB
DB_USER=root
DB_PASSWORD=password

JWT_SECRET=supersecretkey
PORT=3000
```

El proyecto incluye un archivo `.env.template` como referencia.

---

## 🐳 Docker

Levantar la infraestructura:

```bash
docker compose up -d
```

Docker Compose permite levantar la base de datos y el entorno necesario de forma automática.

---

## ▶️ Ejecutar aplicación

Modo desarrollo:

```bash
npm run start:dev
```

---

## 🔄 Migraciones

Ejecutar migraciones:

```bash
npm run migration:run
```

Crear nueva migración:

```bash
npm run migration:create
```

---

## 🌱 Seed de base de datos

Endpoint para poblar la base de datos:

```http
GET /api/seed
```

Este endpoint inserta datos iniciales necesarios para pruebas y desarrollo.

---

## 📁 Gestión de archivos

El proyecto incluye un módulo de gestión de archivos encargado de la subida y procesamiento de imágenes.

### Funcionalidades

* Upload de archivos mediante `multipart/form-data`
* Procesamiento de archivos con Multer
* Organización modular de la lógica de archivos

---

## 📚 Documentación API

La API incluye documentación interactiva generada automáticamente con Swagger (OpenAPI 3).

### Acceso

```text
/api
```

Swagger permite:

* Visualizar endpoints
* Probar requests
* Ver responses y DTOs
* Facilitar integración frontend-backend

---

## 📸 Capturas

### Swagger API

![Swagger](./screenshots/swagger.png)

---

## 📈 Mejoras futuras

* Tests unitarios y e2e
* CI/CD con GitHub Actions
* Deploy cloud avanzado
* Roles y permisos
* Optimización y cache
* Monitorización y logs

---

## 👩‍💻 Autor

Laura Toro

Proyecto desarrollado como práctica avanzada de backend utilizando tecnologías modernas del ecosistema Node.js y NestJS.

---

## 📚 Aprendizajes

Este proyecto me permitió profundizar en:

* Arquitectura modular con NestJS
* APIs REST
* TypeORM y migraciones
* Docker
* JWT Authentication
* Swagger / OpenAPI
* Organización de proyectos backend reales
* Gestión de base de datos relacional
