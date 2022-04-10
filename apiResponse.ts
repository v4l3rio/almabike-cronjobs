export interface ApiResponse {
    device_id: number
    sensor_key: string
    sensor_id: number
    component_id: number
    rollup: string
    function: string
    from: string
    to: string
    sample_size: number
    readings: [string, number][]
  }
