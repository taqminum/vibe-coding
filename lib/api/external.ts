// 模拟外部API调用
export async function fetchCryptoData() {
  // 在实际应用中，这会调用真实的外部API
  // 例如: return fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false')
  
  // 模拟API响应
  const mockData = [
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
  
  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  return mockData
}