
import { ApiResponse } from "./apiResponse";
import { Readings } from "./entity/readings";

export class ApiToDBParser{

    parse(apiResponse:ApiResponse): Readings[]{
        const readings:Readings[] = [];
        for (let i = 0; i < apiResponse.readings.length; i++){
            const reading = new Readings();
            reading.device_id = apiResponse.device_id;
            reading.sensor_id = apiResponse.sensor_id;
            reading.time = String(apiResponse.readings[i][0]);
            reading.value = Number(apiResponse.readings[i][1])
            readings.push(reading);
        }

        return readings;
    }

}