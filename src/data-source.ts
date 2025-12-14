import { DataSource } from 'typeorm';

// Cargar variables de entorno (necesario para las credenciales)
import * as dotenv from 'dotenv';
dotenv.config();

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT, // El '+' convierte la variable a número
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    
    // TypeORM necesita saber dónde buscar los archivos .js compilados
    entities: [
        'dist/**/*.entity.js' 
    ],

    // Ruta donde TypeORM debe buscar las migraciones
    migrations: [
        'dist/migration/*.js' 
    ],
    
    synchronize: false,
});