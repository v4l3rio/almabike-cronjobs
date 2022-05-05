import { CronJob } from 'cron';
import {ApiService} from './apiService'
import { ApiToDBParser } from './apiToDBParser';
import { DatabaseManager } from './databaseManager';
/**
 * Example API call GET
 * https://api.smartcitizen.me/v0/devices/:device/readings?all_intervals=true&from=2022-01-02&rollup=60s&sensor_id=55&to=2022-03-15
 */

const SENSORS_LIST = ['10', '14', '53', '55', '56', '58', '87', '88', '89', '112', '113', '125', '126'];
const DEVICES_LIST = ['14465', '14464', '14474', '14473', '14472', '14471', '14470', '14469', '14468', '14467', '14466', '14461', '14460', '14450', '14451', '14463', '14462', '14459', '14458', '14457', '14456', '14455', '14454', '14449', '14435', '14413', '14436', '14433', '14434', '14432', '14431', '14430', '14429', '14428', '14426', '14427', '14425', '14424', '14423', '14422', '14421', '14420', '14419', '14418', '14417', '14415', '14416', '14414', '14412', '14409'];

class GetDataFromAPI {
cronJob: CronJob;
apiService: ApiService = new ApiService();
apiToDbParser:ApiToDBParser = new ApiToDBParser();
databaseManager: DatabaseManager = new DatabaseManager();
    constructor() {
        // this.cronJob = new CronJob('* * * * *', () => {
            console.log('GET DATA FROM API');
            DEVICES_LIST.forEach(device => {
                SENSORS_LIST.forEach(sensor => {
                    this.apiService.getDataFromAPI(device, sensor, '2022-03-01', '2022-04-28').then(data => {
                        const [resp, status] = data;
                        if(status === 200) {
                            const readings = this.apiToDbParser.parse(resp);
                            readings.forEach(reading => {
                                try{
                                    this.databaseManager.insertInDB(reading);
                                }
                                catch(error){
                                    // console.log("ERRORE NELL'INSERIMENTO INDEX");
                                }
                            })
                        }
                        else{
                            console.log("Error! ("+device+") - "+status);
                        }
                    });

                })
            })
        // });

        // Start job
        // if (!this.cronJob.running) {
            // this.cronJob.start();
        // }
    }


}


const dataGetter = new GetDataFromAPI();