import api from './api';

// Description: Get trading analytics and insights
// Endpoint: GET /api/analytics
// Request: {}
// Response: { analytics: { totalTrades: number, winRate: number, totalPnL: number, avgWin: number, avgLoss: number, bestDay: string, worstDay: string, monthlyData: Array<{ month: string, pnl: number, trades: number }>, patterns: Array<{ pattern: string, description: string, impact: string }>, riskMetrics: { maxDrawdown: number, sharpeRatio: number, volatility: number }, optionsStats: { totalOptionsContracts: number, optionsWinRate: number, avgOptionsPremium: number, mostProfitableStrategy: string } } }
export const getAnalytics = () => {
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        analytics: {
          totalTrades: 127,
          winRate: 68.5,
          totalPnL: 12847.50,
          avgWin: 245.30,
          avgLoss: -156.80,
          bestDay: '2024-01-15',
          worstDay: '2024-01-08',
          monthlyData: [
            { month: 'Jan', pnl: 2847.50, trades: 32 },
            { month: 'Dec', pnl: 1956.20, trades: 28 },
            { month: 'Nov', pnl: 3245.80, trades: 35 },
            { month: 'Oct', pnl: 1847.30, trades: 25 },
            { month: 'Sep', pnl: 2950.70, trades: 7 }
          ],
          patterns: [
            {
              pattern: 'Tuesday Morning Performance',
              description: 'You perform 23% better on Tuesday mornings between 9:30-11:00 AM',
              impact: 'positive'
            },
            {
              pattern: 'Options Expiration Week',
              description: 'Your options trades show 15% higher success rate during expiration week',
              impact: 'positive'
            },
            {
              pattern: 'Position Size Increase',
              description: 'Your average position size has increased 40% this month',
              impact: 'warning'
            },
            {
              pattern: 'Tech Stock Preference',
              description: 'Technology stocks represent 65% of your profitable trades',
              impact: 'positive'
            },
            {
              pattern: 'Put Options Strategy',
              description: 'Your put options have a lower success rate (45%) compared to calls (72%)',
              impact: 'negative'
            },
            {
              pattern: 'Friday Afternoon Trades',
              description: 'Trades after 2 PM on Fridays show 15% lower success rate',
              impact: 'negative'
            }
          ],
          riskMetrics: {
            maxDrawdown: -8.5,
            sharpeRatio: 1.42,
            volatility: 18.7
          },
          optionsStats: {
            totalOptionsContracts: 45,
            optionsWinRate: 62.2,
            avgOptionsPremium: 18.75,
            mostProfitableStrategy: 'Call Options'
          }
        }
      });
    }, 800);
  });
  // Uncomment the below lines to make an actual API call
  // try {
  //   return await api.get('/api/analytics');
  // } catch (error) {
  //   throw new Error(error?.response?.data?.message || error.message);
  // }
}

// Description: Get AI insights based on trading patterns
// Endpoint: POST /api/analytics/insights
// Request: { question: string }
// Response: { success: boolean, insight: string, data?: any }
export const getAIInsight = (question: string) => {
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      const insights = {
        'performance last month': 'Your performance last month was strong with a 15% return. You had 28 trades with a 71% win rate, generating $1,956 in profits. Your options trades contributed 35% of the total profits.',
        'apple trades': 'You\'ve made 12 Apple trades this quarter with an average return of 8.5%. Your best Apple trade was on Jan 15th with a $245 profit. You also traded 3 AAPL call options with mixed results.',
        'best performing strategy': 'Your swing trading strategy outperforms day trading by 23%. Call options have been your most profitable strategy with a 72% win rate, while put options lag at 45%.',
        'worst trades': 'Your worst trades typically occur on Friday afternoons and involve positions held over weekends. Options that expire worthless account for 15% of your losses.',
        'options performance': 'Your options trading shows a 62% win rate with an average premium of $18.75 per contract. Call options significantly outperform puts, and you tend to do better with 30-45 DTE contracts.',
        'call options': 'Your call options have a 72% success rate with an average profit of $285 per contract. Tech sector calls perform best, especially during earnings season.',
        'put options': 'Put options show a 45% win rate in your portfolio. Consider using puts primarily as hedges rather than directional bets to improve performance.'
      };

      const lowerQuestion = question.toLowerCase();
      let insight = 'I analyzed your trading data but need more specific information to provide detailed insights. Try asking about specific stocks, time periods, strategies, or options performance.';

      for (const [key, value] of Object.entries(insights)) {
        if (lowerQuestion.includes(key)) {
          insight = value;
          break;
        }
      }

      resolve({
        success: true,
        insight,
        data: null
      });
    }, 1500);
  });
  // Uncomment the below lines to make an actual API call
  // try {
  //   return await api.post('/api/analytics/insights', { question });
  // } catch (error) {
  //   throw new Error(error?.response?.data?.message || error.message);
  // }
}