import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Photo } from "../../modules/photo/entities/photo.entity";
import { Todo } from "../../modules/todo/entities/todo.entity";
import { User } from '../../modules/user/entities/user.entity';
const host = process.env.DATABASE_HOST || 'localhost';
const port = +process.env.DATABASE_PORT || 3306;
const username = process.env.DATABASE_USER || 'root';
const password = process.env.DATABASE_PASSWORD || 'root';
const database = process.env.DATABASE_NAME || 'test';

const typeOrmConfig: TypeOrmModuleOptions = {
    name: "default",
    type: 'mysql',
    host: host,
    port: port,
    username: username,
    password: password,
    database: database,
    entities: [User,Photo, Todo],
    //entities: ["src/modules/**/**/*.entity{.ts,.js}"],
    migrationsRun: true,
    logging: true,
    migrationsTableName: "migrations",
    //migrations: ["src/shared/migrations/*{.ts,.js}"],
    synchronize: false,
    // cli: {
    //     migrationsDir: 'src/migration'
    // }
}

export = typeOrmConfig;

/*export const typeOrmConfig: TypeOrmModuleOptions = {
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
    //entities: ["src/modules/**//**///entity{.ts,.js}"],
    //extra: {
    //    trustServerCertificate: true,
    //}
    /*cli: {
        migrationsDir: 'src/migration'
    }*/
//}