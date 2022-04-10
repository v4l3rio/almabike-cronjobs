import "reflect-metadata";
import {Readings} from './entity/readings';
import { AppDataSource } from "./dataSource"

export class DatabaseManager{

    constructor(){
        console.log("Connetto...");
        AppDataSource.initialize();
        console.log("Connessione avvenuta!");
    }

    async insertInDB(reading:Readings){
        console.log("Inserting a new user into the database...")
        await AppDataSource.manager.save(reading)
        console.log("Saved a new user with id: " + reading.id)
    }
}