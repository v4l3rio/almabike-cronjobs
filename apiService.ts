import { ApiResponse } from "./apiResponse";
import axios from 'axios'

export class ApiService{

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