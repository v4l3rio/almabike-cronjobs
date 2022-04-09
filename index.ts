import { CronJob } from 'cron';
import {ApiService} from './apiService'
/**
 * Example API call GET
 * https://api.smartcitizen.me/v0/devices/:device/readings?all_intervals=true&from=2022-01-02&rollup=60s&sensor_id=55&to=2022-03-15
 */

class GetDataFromAPI {

  cronJob: CronJob;
  apiService: ApiService = new ApiService();

    constructor() {
        this.cronJob = new CronJob('* * * * *', () => {
            console.log('GET DATA FROM API');
            this.apiService.getDataFromAPI();
        });

        // Start job
        if (!this.cronJob.running) {
        this.cronJob.start();
        }
    }


}


const dataGetter = new GetDataFromAPI();