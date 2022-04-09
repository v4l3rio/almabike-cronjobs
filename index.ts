import { CronJob } from 'cron';
import axios, { AxiosRequestConfig } from 'axios'

/**
 * Example API call GET
 * https://api.smartcitizen.me/v0/devices/:device/readings?all_intervals=true&from=2022-01-02&rollup=60s&sensor_id=55&to=2022-03-15
 */

export interface ApiResponse {
    device_id: number;
    sensor_key: string;
    sensor_id: number;
    component_id: number;
    rollup: string;
    function: string;
    from: Date;
    to: Date;
    sample_size: number;
    readings: any[][];
}

class GetDataFromAPI {
  cronJob: CronJob;

  constructor() {

    this.cronJob = new CronJob('* * * * *', () => {
        console.log('GET DATA FROM API');
        this.getDataFromAPI();
    });

        // Start job
        if (!this.cronJob.running) {
        this.cronJob.start();
        }
    }

    async getDataFromAPI() {
        try {

          const { data, status } = await axios.get<ApiResponse>(
            'https://api.smartcitizen.me/v0/devices/14474/readings?all_intervals=true&from=2022-01-02&rollup=60s&sensor_id=55&to=2022-03-15',
            {
              headers: {
                Accept: 'application/json',
              },
            },
          );

          console.log(data.device_id);

          // 👇️ "response status is: 200"
          console.log('response status is: ', status);

          return data;
        } catch (error) {
          if (axios.isAxiosError(error)) {
            console.log('error message: ', error.message);
            return error.message;
          } else {
            console.log('unexpected error: ', error);
            return 'An unexpected error occurred';
          }
        }
      }

}


const dataGetter = new GetDataFromAPI();