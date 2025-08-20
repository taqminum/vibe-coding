interface FetchDataOptions {
  retries?: number
  retryDelay?: number
}

export async function fetchData<T>(
  url: string,
  options: FetchDataOptions = {}
): Promise<T> {
  const { retries = 3, retryDelay = 1000 } = options
  
  for (let i = 0; i <= retries; i++) {
    try {
      const response = await fetch(url)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      return await response.json()
    } catch (error) {
      if (i === retries) {
        throw error
      }
      
      // 等待后重试
      await new Promise(resolve => setTimeout(resolve, retryDelay))
    }
  }
  
  throw new Error('Unexpected error in retry loop')
}