import "reflect-metadata"
import { DataSource } from "typeorm"
import { Readings } from "./entity/readings"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "almabike",
    password: "almabike",
    database: "almabike_db",
    synchronize: false,
    logging: false,
    entities: [Readings],
    subscribers: [],
    migrations: [],
})