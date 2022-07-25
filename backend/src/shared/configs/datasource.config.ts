import { Photo } from '../../modules/photo/entities/photo.entity';
import { Todo } from '../../modules/todo/entities/todo.entity';
import { User } from '../../modules/user/entities/user.entity';
import { DataSourceOptions } from 'typeorm';
const host = process.env.DATABASE_HOST || 'localhost';
const port = +process.env.DATABASE_PORT || 3306;
const username = process.env.DATABASE_USER || 'root';
const password = process.env.DATABASE_PASSWORD || 'root';
const database = process.env.DATABASE_NAME || 'test';
//import dotenv from 'dotenv';
//dotenv.config();      

export function getConfig() {
    return {
    name: "default",
    type: "mysql",
    host: host,
    port: port,
    username : username,
    password : password,
    database: database,
    synchronize: false,
    migrationsRun: true,
    migrationsTableName: "migrations",
    migrations: ['src/shared/migrations/**{.ts,.js}'],
    //entities: ["src/modules/**/**/entity{.ts,.js}"],
    entities: [User, Todo, Photo],
    cli: {
        migrationsDir: "src/shared/migrations"
    },
    extra: {
        trustServerCertificate: true,
    }
    } as DataSourceOptions;
}

export function getConfigSqlServer() {
    return {
    name: "default",
    type: "mssql",
    host: "JDN-DESKTOP",
    port: 1433,
    username : "sa",
    password : "root",
    database: "sampledb",
    synchronize: false,
    migrationsRun: true,
    migrationsTableName: "migrations",
    migrations: ["src/core/migrations/*{.ts,.js}"],
    entities: ["src/modules/**/**/entity{.ts,.js}"],
    //entities: [User, Todo, Photo],
    cli: {
        migrationsDir: __dirname + "../migrations"
    },
    extra: {
        trustServerCertificate: true,
    }
    } as DataSourceOptions;
}