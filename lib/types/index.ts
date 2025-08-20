export interface CryptoCurrency {
  id: string
  name: string
  symbol: string
  current_price: number
  price_change_percentage_24h: number
}

export interface WeatherData {
  location: string
  temperature: number
  condition: string
  humidity: number
  wind_speed: number
}

export interface APIData {
  crypto?: CryptoCurrency[]
  weather?: WeatherData
  // 可以根据需要添加更多数据类型
}

export interface ChartDataPoint {
  time: string
  value: number
}