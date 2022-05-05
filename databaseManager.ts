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
        try{
            await AppDataSource.manager.save(reading)
        }
        catch(err){
            // console.log("ERRORE NEL DATABASE MANAGER - INSERIMENTO");
        }
    }
}