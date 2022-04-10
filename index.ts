import { CronJob } from 'cron';
import {ApiService} from './apiService'
import { ApiToDBParser } from './apiToDBParser';
import { DatabaseManager } from './databaseManager';
/**
 * Example API call GET
 * https://api.smartcitizen.me/v0/devices/:device/readings?all_intervals=true&from=2022-01-02&rollup=60s&sensor_id=55&to=2022-03-15
 */

class GetDataFromAPI {

cronJob: CronJob;
apiService: ApiService = new ApiService();
apiToDbParser:ApiToDBParser = new ApiToDBParser();
databaseManager: DatabaseManager = new DatabaseManager();
    constructor() {
        this.cronJob = new CronJob('* * * * *', () => {
            console.log('GET DATA FROM API');
            this.apiService.getDataFromAPI().then(data => {
                const [resp, status] = data;
                if(status === 200) {
                    const readings = this.apiToDbParser.parse(resp);
                    readings.forEach(reading => {
                       this.databaseManager.insertInDB(reading);
                    })
                }
                else{
                    console.log("Error! - "+status);
                }
            });
        });

        // Start job
        if (!this.cronJob.running) {
        this.cronJob.start();
        }
    }


}


const dataGetter = new GetDataFromAPI();