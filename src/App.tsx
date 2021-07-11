import { Chart } from 'react-google-charts'
import { Component } from 'react'
import axios from 'axios'
import './App.css'

interface ICandle {
  time: Date
  open: number
  close: number
  high: number
  low: number
  volume: number
}

type MyState = { candles: ICandle[] }

class App extends Component<{}, MyState> {
  constructor(props: any) {
    super(props)
    this.state = {
      candles: [],
    }
  }
  async componentDidMount() {
    const URL = 'http://localhost:3000/api/candles'
    try {
      const { data } = await axios(URL)
      const candles = data.candles
      this.setState({ candles })
    } catch (err) {
      console.log(err)
    }
  }
  render() {
    let candleData: Array<Array<string | number | Date>> = [
      ['date', 'low', 'open', 'close', 'high'],
    ]
    this.state.candles.forEach((candle) => {
      const arr = []
      arr.push(candle.time)
      arr.push(+candle.low)
      arr.push(+candle.open)
      arr.push(+candle.close)
      arr.push(+candle.high)
      candleData.push(arr)
    })
    return (
      <div>
        <Chart
          width={'100%'}
          height={350}
          chartType="CandlestickChart"
          loader={<div>Loading Chart</div>}
          data={candleData}
          options={{
            legend: 'none',
          }}
          rootProps={{ 'data-testid': '1' }}
        />
      </div>
    )
  }
}

export default App
