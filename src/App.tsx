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
    return (
      <div>
        {/* <div>{ this.state.candles }</div> */}
        <Chart
          width={'100%'}
          height={350}
          chartType="CandlestickChart"
          loader={<div>Loading Chart</div>}
          data={[
            ['date', 'a', 'b', 'c', 'd'],
            ['Mon', 20, 28, 38, 45],
            ['Tue', 31, 38, 55, 66],
            ['Wed', 50, 55, 77, 80],
            ['Thu', 77, 77, 66, 50],
            ['Fri', 68, 66, 22, 15],
          ]}
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
