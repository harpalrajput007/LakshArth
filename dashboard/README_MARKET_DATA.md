# Market Data Integration Guide

## Current Implementation

The dashboard currently displays simulated Nifty and Sensex data that updates every 30 seconds. The data includes:
- **NIFTY 50** (NSE)
- **SENSEX** (BSE)
- Market status indicator (Open/Closed)
- Real-time updates with change values and percentages

## Features

✅ **Live Market Data Display**
- Realistic Nifty and Sensex values
- Change in points and percentage
- Color-coded positive/negative changes
- Market open/closed status with pulsing indicator

✅ **Responsive Design**
- Works on desktop and mobile devices
- Adaptive layout for different screen sizes

✅ **Professional Styling**
- Modern card-based design
- Hover effects and animations
- Professional color scheme

## Getting Real Market Data

To integrate real market data, you can use the following APIs:

### Option 1: Alpha Vantage API (Recommended)
1. Sign up at [Alpha Vantage](https://www.alphavantage.co/support/#api-key)
2. Get your free API key
3. Update `API_KEY` in `src/services/marketDataService.js`
4. Uncomment the API calls in the service

### Option 2: Yahoo Finance API
- Use Yahoo Finance API for real-time data
- Requires additional setup and API keys

### Option 3: NSE/BSE Direct APIs
- Direct integration with NSE and BSE APIs
- Requires registration and approval

## File Structure

```
dashboard/src/
├── components/
│   └── TopBar.js              # Main market data display
├── services/
│   └── marketDataService.js   # Market data fetching logic
└── index.css                  # Styling for market data
```

## Customization

### Adding More Indices
1. Add new index data to the `marketData` state
2. Create new index cards in the JSX
3. Add corresponding CSS styles

### Changing Update Frequency
- Modify the interval in `TopBar.js` (currently 30 seconds)
- Consider API rate limits when using real data

### Styling Customization
- Modify colors in `index.css`
- Update card designs and animations
- Adjust responsive breakpoints

## Market Hours

The system automatically detects Indian market hours:
- **Trading Days**: Monday to Friday
- **Trading Hours**: 9:15 AM to 3:30 PM IST
- **Status Indicator**: Shows open/closed with visual feedback

## Future Enhancements

- [ ] Real-time WebSocket integration
- [ ] Historical data charts
- [ ] More indices (Bank Nifty, Nifty IT, etc.)
- [ ] Market news feed
- [ ] Watchlist integration with market data
