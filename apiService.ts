import { ApiResponse } from "./apiResponse";
import axios from 'axios'

export class ApiService{

    async getDataFromAPI(deviceID: string, sensorID:string ,from: string, to: string) {
        try {

          const { data, status } = await axios.get<ApiResponse>(
            'https://api.smartcitizen.me/v0/devices/'+deviceID+'/readings?all_intervals=true&from='+from+'&rollup=60s&sensor_id='+sensorID+'&to='+to,
            {
              headers: {
                Accept: 'application/json',
              },
            },
          );

          return [data, status] as const;

        } catch (error) {
          if (axios.isAxiosError(error)) {
            console.log('error message: ', error.message);
            return [null, 400] as const;
          } else {
            console.log('unexpected error: ', error);
            return [null, 400] as const;
          }
        }
      }

}