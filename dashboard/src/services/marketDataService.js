// Market Data Service for fetching real-time Nifty and Sensex data
// Using Alpha Vantage API (free tier) or fallback to simulated data

const API_KEY = 'demo'; // Replace with your Alpha Vantage API key for real data
const BASE_URL = 'https://www.alphavantage.co/query';

export const fetchMarketData = async () => {
  try {
    // For demo purposes, we'll use simulated data
    // In production, you can uncomment the API calls below
    
    /*
    // Fetch Nifty 50 data (^NSEI)
    const niftyResponse = await fetch(
      `${BASE_URL}?function=GLOBAL_QUOTE&symbol=^NSEI&apikey=${API_KEY}`
    );
    const niftyData = await niftyResponse.json();
    
    // Fetch Sensex data (^BSESN)
    const sensexResponse = await fetch(
      `${BASE_URL}?function=GLOBAL_QUOTE&symbol=^BSESN&apikey=${API_KEY}`
    );
    const sensexData = await sensexResponse.json();
    
    return {
      nifty: {
        value: parseFloat(niftyData['Global Quote']['05. price']),
        change: parseFloat(niftyData['Global Quote']['09. change']),
        percentChange: parseFloat(niftyData['Global Quote']['10. change percent'].replace('%', ''))
      },
      sensex: {
        value: parseFloat(sensexData['Global Quote']['05. price']),
        change: parseFloat(sensexData['Global Quote']['09. change']),
        percentChange: parseFloat(sensexData['Global Quote']['10. change percent'].replace('%', ''))
      }
    };
    */
    
    // Simulated data for demo
    const baseNifty = 22450.75;
    const baseSensex = 73850.25;
    
    const niftyChange = (Math.random() - 0.5) * 200;
    const sensexChange = (Math.random() - 0.5) * 500;
    
    return {
      nifty: {
        value: baseNifty + niftyChange,
        change: niftyChange,
        percentChange: (niftyChange / baseNifty) * 100
      },
      sensex: {
        value: baseSensex + sensexChange,
        change: sensexChange,
        percentChange: (sensexChange / baseSensex) * 100
      }
    };
    
  } catch (error) {
    console.error('Error fetching market data:', error);
    
    // Fallback data
    return {
      nifty: {
        value: 22450.75,
        change: 125.50,
        percentChange: 0.56
      },
      sensex: {
        value: 73850.25,
        change: 425.75,
        percentChange: 0.58
      }
    };
  }
};

// Get market status (open/closed)
export const getMarketStatus = () => {
  const now = new Date();
  const day = now.getDay();
  const hour = now.getHours();
  const minute = now.getMinutes();
  
  // Indian market hours: 9:15 AM to 3:30 PM, Monday to Friday
  const isWeekday = day >= 1 && day <= 5;
  const isMarketHours = (hour === 9 && minute >= 15) || 
                       (hour > 9 && hour < 15) || 
                       (hour === 15 && minute <= 30);
  
  return {
    isOpen: isWeekday && isMarketHours,
    nextOpen: getNextOpenTime(),
    lastUpdate: now.toLocaleTimeString('en-IN')
  };
};

const getNextOpenTime = () => {
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(9, 15, 0, 0);
  
  return tomorrow.toLocaleString('en-IN');
};
