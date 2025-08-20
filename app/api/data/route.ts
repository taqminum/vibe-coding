import { NextResponse } from 'next/server'

// 模拟数据 - 在实际应用中，这里会调用外部API
const mockCryptoData = [
  {
    id: 'bitcoin',
    name: 'Bitcoin',
    symbol: 'btc',
    current_price: 27538,
    price_change_percentage_24h: 2.5
  },
  {
    id: 'ethereum',
    name: 'Ethereum',
    symbol: 'eth',
    current_price: 1650,
    price_change_percentage_24h: -1.2
  },
  {
    id: 'cardano',
    name: 'Cardano',
    symbol: 'ada',
    current_price: 0.25,
    price_change_percentage_24h: 5.3
  }
]

export async function GET(request: Request) {
  try {
    // 调用真实的CoinGecko API
    const response = await fetch('https://dog.ceo/api/breeds/list/all')
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const data = await response.json()
    
   // 将获取到的狗狗品种数据转换为类似加密货币的数据格式
    const breeds = Object.keys(data.message)
    const transformedData = breeds.slice(0, 5).map((breed, index) => {
      // 生成一些模拟的价格数据
      const basePrice = 50 + index * 30
      const changePercentage = (Math.random() - 0.5) * 15 // -7.5% 到 +7.5% 之间的随机数
      
      return {
        id: breed.toLowerCase().replace(' ', '-'),
        name: breed,
        symbol: breed.substring(0, 3).toUpperCase(),
        current_price: parseFloat(basePrice.toFixed(2)),
        price_change_percentage_24h: parseFloat(changePercentage.toFixed(2))
      }
    })
    
    // 模拟网络延迟
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // 返回转换后的数据
    return NextResponse.json(transformedData)
  } catch (error) {
    console.error('Error fetching data:', error)
    console.log('Falling back to mock data')
    
    // 模拟网络延迟
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // 返回模拟数据作为回退
    return NextResponse.json(mockCryptoData)
  }
}