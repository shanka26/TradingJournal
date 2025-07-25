import api from './api';

// Description: Get all trades for the current user
// Endpoint: GET /api/trades
// Request: {}
// Response: { trades: Array<{ _id: string, symbol: string, type: 'buy' | 'sell' | 'call' | 'put', quantity: number, price: number, date: string, pnl: number, notes?: string, tags?: string[], images?: string[], strikePrice?: number, expirationDate?: string, contractType?: 'stock' | 'option' }> }
export const getTrades = () => {
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        trades: [
          {
            _id: '1',
            symbol: 'AAPL',
            type: 'buy',
            quantity: 100,
            price: 150.25,
            date: '2024-01-15T10:30:00Z',
            pnl: 245.50,
            notes: 'Strong earnings report, good entry point',
            tags: ['swing-trade', 'tech'],
            images: ['screenshot1.jpg'],
            contractType: 'stock'
          },
          {
            _id: '2',
            symbol: 'TSLA',
            type: 'call',
            quantity: 5,
            price: 12.50,
            date: '2024-01-14T14:15:00Z',
            pnl: 625.00,
            notes: 'Bullish on EV sector, bought calls before earnings',
            tags: ['options', 'earnings-play', 'ev'],
            images: ['screenshot2.jpg'],
            strikePrice: 250.00,
            expirationDate: '2024-02-16',
            contractType: 'option'
          },
          {
            _id: '3',
            symbol: 'MSFT',
            type: 'buy',
            quantity: 75,
            price: 380.45,
            date: '2024-01-13T09:45:00Z',
            pnl: 567.25,
            notes: 'Cloud growth momentum continues',
            tags: ['swing-trade', 'tech', 'cloud'],
            images: ['screenshot3.jpg'],
            contractType: 'stock'
          },
          {
            _id: '4',
            symbol: 'NVDA',
            type: 'put',
            quantity: 3,
            price: 45.20,
            date: '2024-01-12T11:20:00Z',
            pnl: -340.50,
            notes: 'Hedge against tech volatility, expired worthless',
            tags: ['options', 'hedge', 'semiconductors'],
            images: ['screenshot4.jpg'],
            strikePrice: 800.00,
            expirationDate: '2024-01-19',
            contractType: 'option'
          },
          {
            _id: '5',
            symbol: 'SPY',
            type: 'call',
            quantity: 10,
            price: 8.75,
            date: '2024-01-11T15:30:00Z',
            pnl: 1250.00,
            notes: 'Market rally play, sold before expiration',
            tags: ['options', 'etf', 'market-play'],
            images: ['screenshot5.jpg'],
            strikePrice: 480.00,
            expirationDate: '2024-01-26',
            contractType: 'option'
          },
          {
            _id: '6',
            symbol: 'AMZN',
            type: 'sell',
            quantity: 25,
            price: 145.80,
            date: '2024-01-10T13:20:00Z',
            pnl: -89.40,
            notes: 'Took profits after cloud earnings disappointment',
            tags: ['swing-trade', 'tech', 'profit-taking'],
            images: ['screenshot6.jpg'],
            contractType: 'stock'
          }
        ],
      });
    }, 500);
  });
  // Uncomment the below lines to make an actual API call
  // try {
  //   return await api.get('/api/trades');
  // } catch (error) {
  //   throw new Error(error?.response?.data?.message || error.message);
  // }
}

// Description: Add a new trade
// Endpoint: POST /api/trades
// Request: { symbol: string, type: 'buy' | 'sell' | 'call' | 'put', quantity: number, price: number, date: string, notes?: string, tags?: string[], images?: File[], strikePrice?: number, expirationDate?: string, contractType?: 'stock' | 'option' }
// Response: { success: boolean, trade: { _id: string, symbol: string, type: 'buy' | 'sell' | 'call' | 'put', quantity: number, price: number, date: string, pnl: number, notes?: string, tags?: string[], images?: string[], strikePrice?: number, expirationDate?: string, contractType?: 'stock' | 'option' } }
export const addTrade = (data: any) => {
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        trade: {
          _id: Date.now().toString(),
          ...data,
          pnl: Math.random() > 0.5 ? Math.random() * 1000 : -Math.random() * 500,
          images: data.images ? ['uploaded_screenshot.jpg'] : []
        }
      });
    }, 1000);
  });
  // Uncomment the below lines to make an actual API call
  // try {
  //   return await api.post('/api/trades', data);
  // } catch (error) {
  //   throw new Error(error?.response?.data?.message || error.message);
  // }
}

// Description: Update an existing trade
// Endpoint: PUT /api/trades/:id
// Request: { symbol?: string, type?: 'buy' | 'sell' | 'call' | 'put', quantity?: number, price?: number, date?: string, notes?: string, tags?: string[], strikePrice?: number, expirationDate?: string, contractType?: 'stock' | 'option' }
// Response: { success: boolean, trade: { _id: string, symbol: string, type: 'buy' | 'sell' | 'call' | 'put', quantity: number, price: number, date: string, pnl: number, notes?: string, tags?: string[], images?: string[], strikePrice?: number, expirationDate?: string, contractType?: 'stock' | 'option' } }
export const updateTrade = (id: string, data: any) => {
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        trade: {
          _id: id,
          ...data,
          pnl: Math.random() > 0.5 ? Math.random() * 1000 : -Math.random() * 500,
        }
      });
    }, 500);
  });
  // Uncomment the below lines to make an actual API call
  // try {
  //   return await api.put(`/api/trades/${id}`, data);
  // } catch (error) {
  //   throw new Error(error?.response?.data?.message || error.message);
  // }
}

// Description: Delete a trade
// Endpoint: DELETE /api/trades/:id
// Request: {}
// Response: { success: boolean, message: string }
export const deleteTrade = (id: string) => {
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: 'Trade deleted successfully'
      });
    }, 500);
  });
  // Uncomment the below lines to make an actual API call
  // try {
  //   return await api.delete(`/api/trades/${id}`);
  // } catch (error) {
  //   throw new Error(error?.response?.data?.message || error.message);
  // }
}

// Description: Process trade screenshot with AI
// Endpoint: POST /api/trades/process-image
// Request: { image: File }
// Response: { success: boolean, extractedData: { symbol: string, type: 'buy' | 'sell' | 'call' | 'put', quantity: number, price: number, date: string, strikePrice?: number, expirationDate?: string, contractType?: 'stock' | 'option' } }
export const processTradeImage = (image: File) => {
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      const symbols = ['AAPL', 'TSLA', 'MSFT', 'NVDA', 'GOOGL', 'AMZN', 'META', 'SPY', 'QQQ'];
      const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];
      const isOption = Math.random() > 0.6; // 40% chance of being an option
      const tradeTypes = isOption ? ['call', 'put'] : ['buy', 'sell'];
      const randomType = tradeTypes[Math.floor(Math.random() * tradeTypes.length)];

      const baseData = {
        symbol: randomSymbol,
        type: randomType,
        quantity: isOption ? Math.floor(Math.random() * 20) + 1 : Math.floor(Math.random() * 200) + 1,
        price: isOption ? Math.random() * 50 + 1 : Math.random() * 500 + 50,
        date: new Date().toISOString(),
        contractType: isOption ? 'option' : 'stock'
      };

      if (isOption) {
        baseData.strikePrice = Math.random() * 600 + 100;
        const futureDate = new Date();
        futureDate.setDate(futureDate.getDate() + Math.floor(Math.random() * 60) + 1);
        baseData.expirationDate = futureDate.toISOString().split('T')[0];
      }

      resolve({
        success: true,
        extractedData: baseData
      });
    }, 2000);
  });
  // Uncomment the below lines to make an actual API call
  // try {
  //   const formData = new FormData();
  //   formData.append('image', image);
  //   return await api.post('/api/trades/process-image', formData, {
  //     headers: { 'Content-Type': 'multipart/form-data' }
  //   });
  // } catch (error) {
  //   throw new Error(error?.response?.data?.message || error.message);
  // }
}

// Description: Get current open trades for the user
// Endpoint: GET /api/trades/open
// Request: {}
// Response: { openTrades: Array<{ _id: string, symbol: string, type: 'buy' | 'call' | 'put', quantity: number, entryPrice: number, currentPrice: number, entryDate: string, unrealizedPnl: number, percentChange: number, strikePrice?: number, expirationDate?: string, contractType?: 'stock' | 'option' }> }
export const getOpenTrades = () => {
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        openTrades: [
          {
            _id: 'open1',
            symbol: 'AAPL',
            type: 'buy',
            quantity: 100,
            entryPrice: 150.25,
            currentPrice: 155.80,
            entryDate: '2024-01-15T10:30:00Z',
            unrealizedPnl: 555.00,
            percentChange: 3.69,
            contractType: 'stock'
          },
          {
            _id: 'open2',
            symbol: 'TSLA',
            type: 'call',
            quantity: 5,
            entryPrice: 12.50,
            currentPrice: 18.75,
            entryDate: '2024-01-14T14:15:00Z',
            unrealizedPnl: 3125.00,
            percentChange: 50.00,
            strikePrice: 250.00,
            expirationDate: '2024-02-16',
            contractType: 'option'
          },
          {
            _id: 'open3',
            symbol: 'NVDA',
            type: 'put',
            quantity: 2,
            entryPrice: 35.20,
            currentPrice: 28.90,
            entryDate: '2024-01-16T11:20:00Z',
            unrealizedPnl: 1260.00,
            percentChange: 17.90,
            strikePrice: 800.00,
            expirationDate: '2024-02-23',
            contractType: 'option'
          },
          {
            _id: 'open4',
            symbol: 'SPY',
            type: 'buy',
            quantity: 50,
            entryPrice: 485.30,
            currentPrice: 478.95,
            entryDate: '2024-01-17T09:45:00Z',
            unrealizedPnl: -317.50,
            percentChange: -1.31,
            contractType: 'stock'
          }
        ],
      });
    }, 600);
  });
  // Uncomment the below lines to make an actual API call
  // try {
  //   return await api.get('/api/trades/open');
  // } catch (error) {
  //   throw new Error(error?.response?.data?.message || error.message);
  // }
}

// Description: Close an open trade
// Endpoint: POST /api/trades/:id/close
// Request: { closePrice: number, closeDate: string }
// Response: { success: boolean, message: string, closedTrade: { _id: string, symbol: string, type: string, quantity: number, entryPrice: number, closePrice: number, pnl: number, closeDate: string } }
export const closeOpenTrade = (id: string, closePrice: number) => {
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: 'Trade closed successfully',
        closedTrade: {
          _id: id,
          symbol: 'MOCK',
          type: 'buy',
          quantity: 100,
          entryPrice: 150.00,
          closePrice: closePrice,
          pnl: (closePrice - 150.00) * 100,
          closeDate: new Date().toISOString()
        }
      });
    }, 1000);
  });
  // Uncomment the below lines to make an actual API call
  // try {
  //   return await api.post(`/api/trades/${id}/close`, { closePrice, closeDate: new Date().toISOString() });
  // } catch (error) {
  //   throw new Error(error?.response?.data?.message || error.message);
  // }
}