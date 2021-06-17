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

type AdmissionFeeCalculatorState = {
  feeClassifications: FeeClassification[]
}

export default class AdmissionFeeCalculator extends Component<
  {},
  AdmissionFeeCalculatorState
> {
  constructor(props: {}) {
    super(props)
    const adults: FeeClassification = {
      name: 'adults',
      description: '',
      unitPrice: 1000,
      numOfPeople: 0,
      totalPrice: 0,
    }
    const students: FeeClassification = {
      name: 'students',
      description: 'high school students',
      unitPrice: 700,
      numOfPeople: 0,
      totalPrice: 0,
    }
    const children: FeeClassification = {
      name: 'children',
      description: 'elementary school students',
      unitPrice: 300,
      numOfPeople: 0,
      totalPrice: 0,
    }
    const infants: FeeClassification = {
      name: 'baby',
      description: 'bub bub!',
      unitPrice: 0,
      numOfPeople: 0,
      totalPrice: 0,
    }
    this.state = {
      feeClassifications: [adults, students, children, infants],
    }
  }

  handleNumOfPeopleChange(idx: number, num: number) {
    const currentFC = this.state.feeClassifications[idx]
    const newTotalPrice = currentFC.unitPrice * num
    const newFC: FeeClassification = Object.assign({}, currentFC, {
      numOfPeople: num,
      totalPrice: newTotalPrice,
    })
    const feeClassifications = this.state.feeClassifications.slice()
    feeClassifications[idx] = newFC
    this.setState({ feeClassifications })
  }

  render() {
    const details = this.state.feeClassifications.map((fc, idx) => {
      return (
        <Detail
          key={idx.toString()}
          classification={fc}
          onNumOfPeopleChange={(n) => this.handleNumOfPeopleChange(idx, n)}
        />
      )
    })
    const numOfPeople = this.state.feeClassifications
      .map((fc) => fc.numOfPeople)
      .reduce((p, c) => p + c)
    const totalAmount = this.state.feeClassifications
      .map((fc) => fc.totalPrice)
      .reduce((p, c) => p + c)

    return (
      <>
        {details}
        <Summary numOfPeople={numOfPeople} totalAmount={totalAmount} />
      </>
    )
  }
}
