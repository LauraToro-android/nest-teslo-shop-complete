# teslo-shop-backend
API backend providing products and catalogs for Angular Teslo Shop.


# 🧠 Teslo Shop API – Backend (NestJS)

Backend de una aplicación e-commerce desarrollado con NestJS, diseñado para simular un sistema real de tienda online con autenticación, autorización por roles y gestión de productos.

Este proyecto forma parte de una aplicación fullstack junto a un frontend en Angular.

---

## 🚀 Tecnologías utilizadas

- NestJS
- TypeScript
- PostgreSQL
- TypeORM
- JWT (JSON Web Tokens)
- Passport (auth strategy)
- Bcrypt
- Class Validator

---

## 🏗️ Arquitectura

El proyecto sigue una arquitectura modular basada en NestJS:

- **Modules** → separación por dominio (auth, users, products, etc.)
- **Controllers** → definición de endpoints REST
- **Services** → lógica de negocio
- **Entities** → modelo de base de datos
- **DTOs** → validación de datos de entrada

Este enfoque permite escalabilidad, mantenimiento y separación de responsabilidades.

---

## 🔐 Autenticación y autorización

Se ha implementado un sistema completo de autenticación y autorización:

### Autenticación
- Registro de usuarios
- Login con email y contraseña
- Generación de JWT
- Validación de tokens

### Autorización (RBAC)
Sistema de roles basado en:

- `user`
- `admin`

El acceso a ciertos endpoints está restringido según el rol del usuario mediante guards.

Ejemplo:
- Usuarios normales → acceso a catálogo
- Admin → gestión de productos

---

## 👤 Gestión de usuarios

- Creación de usuarios
- Asignación de roles
- Protección de rutas mediante JWT
- Control de acceso basado en permisos

---

## 🛒 Gestión de productos

- CRUD de productos (crear, leer, actualizar, eliminar)
- Asociación de productos a categorías
- Validaciones de datos

---

## 🗄️ Base de datos

- PostgreSQL como base de datos relacional
- Uso de TypeORM para entidades y relaciones
- Constraints aplicados para asegurar integridad de datos
- Refactorización de estructura para mejorar consistencia del modelo

---

## ♻️ Refactor y mejoras

Se ha realizado refactor del proyecto para:

- Mejorar la estructura del código
- Limpiar lógica duplicada
- Optimizar relaciones en base de datos
- Mejorar la mantenibilidad del backend

---

## 🤖 Uso de Inteligencia Artificial

Durante el desarrollo he utilizado herramientas de IA (como ChatGPT o Copilot) como apoyo para:

- Resolver errores técnicos
- Generar ideas de refactor
- Mejorar estructura de código
- Aprender mejores prácticas

Todas las soluciones han sido revisadas y adaptadas manualmente.

---

## 🔗 Relación con frontend

Este backend está diseñado para ser consumido por una aplicación frontend en Angular, formando parte de una arquitectura fullstack.


## 👩‍💻 Sobre el proyecto

Este backend ha sido desarrollado de forma autónoma como proyecto personal para consolidar conocimientos en desarrollo backend, arquitectura de software y APIs REST.
