import { ChangeEvent, Component } from 'react'

type FeeClassification = {
  name: string
  description: string
  unitPrice: number
  numOfPeople: number
  totalPrice: number
}
type DetailProps = {
  classification: FeeClassification
}
type DetailState = {
  numOfPeople: number
}

class Detail extends Component<DetailProps, DetailState> {
  constructor(props: DetailProps) {
    super(props)
    this.state = {
      numOfPeople: props.classification.numOfPeople,
    }
  }
  onNumOfPeopleChange(e: ChangeEvent<HTMLSelectElement>): void {
    const num: number = Number(e.target.value)
    this.setState({ numOfPeople: num })
  }
  render() {
    return (
      <div>
        <div className="classification-name">
          {this.props.classification.name}
        </div>
        <div className="description">
          {this.props.classification.description}
        </div>
        <div className="unit-price">
          JPY {this.props.classification.unitPrice}
        </div>
        <div className="num-people">
          <select
            value={this.state.numOfPeople}
            onChange={(e) => this.onNumOfPeopleChange(e)}
          >
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
          <span>people</span>
        </div>
      </div>
    )
  }
}

class Summary extends Component {
  render() {
    return (
      <div>
        <div className="party">
          <input type="text" className="party" value="0" />
          <span>名様</span>
        </div>
        <div className="total-amount">
          <span>合計</span>
          <input type="text" className="total-amount" value="0" />
          <span>円</span>
        </div>
      </div>
    )
  }
}
export default class AdmissionFeeCalculator extends Component {
  private details: DetailProps[] = [
    {
      classification: {
        name: 'adults',
        description: '',
        unitPrice: 1000,
        numOfPeople: 0,
        totalPrice: 0,
      },
    },
    {
      classification: {
        name: 'students',
        description: 'high school students',
        unitPrice: 700,
        numOfPeople: 0,
        totalPrice: 0,
      },
    },
    {
      classification: {
        name: 'children',
        description: 'elementary school students',
        unitPrice: 300,
        numOfPeople: 0,
        totalPrice: 0,
      },
    },
    {
      classification: {
        name: 'baby',
        description: 'bub bub!',
        unitPrice: 0,
        numOfPeople: 0,
        totalPrice: 0,
      },
    },
  ]

  render() {
    const detailsJsx = this.details.map((fc, idx) => {
      return <Detail key={idx.toString()} classification={fc.classification} />
    })
    return (
      <>
        {detailsJsx}
        <Summary />
      </>
    )
  }
}
