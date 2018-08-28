import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Button = ({ title, handleClick }) => {
    return (
        <button onClick={handleClick}>{title}</button>
    )
}

const Header = ({ title }) => {
    return (
        <div>
            <h2>{title}</h2>
        </div>
    )
}

const FeedbackButtons = ({ lisaaHyva, lisaaNeutraali, lisaaHuono }) => {
    return (
        <div>
            <Button title='hyvä' handleClick={lisaaHyva} />
            <Button title='neutraali' handleClick={lisaaNeutraali} />
            <Button title='huono' handleClick={lisaaHuono} />
        </div>
    )
}

const FeedbackDiv = ({ title, lisaaHyva, lisaaNeutraali, lisaaHuono }) => {
    return (
        <div>
            <Header title={title} />
            <FeedbackButtons lisaaHyva={lisaaHyva} lisaaNeutraali={lisaaNeutraali} 
                             lisaaHuono={lisaaHuono} />
        </div>
    )
}

const Stats = ({ hyvia, neutraaleja, huonoja }) => {
    const summa = hyvia - huonoja
    const arvosteluja = hyvia + neutraaleja + huonoja
    const keskiarvo = (summa / arvosteluja).toFixed(2)
    const positProsent = (hyvia / arvosteluja * 100).toFixed(1)
    
    return (
        <div>
            <p>hyvä {hyvia}</p>
            <p>neutraali {neutraaleja}</p>
            <p>huono {huonoja}</p>
            <p>keskiarvo {isFinite(keskiarvo) ? keskiarvo : (0).toFixed(2)}</p>
            <p>positiivisia {isFinite(positProsent) ? positProsent : (0).toFixed(1)}%</p>
        </div>
    )
}

const StatsDiv = ({ title, hyvia, neutraaleja, huonoja }) => {
    return (
        <div>
            <Header title={title} />
            <Stats hyvia={hyvia} neutraaleja={neutraaleja} huonoja={huonoja} />
        </div>
    )
}

class App extends React.Component {
    constructor() {
        super()
        this.feedback_title = 'anna palautetta'
        this.stats_title = 'statistiikka'

        this.state = {
            'hyvia': 0,
            'neutraaleja': 0,
            'huonoja': 0
        }
    }

    lisaaHyva = () => this.setState({ hyvia: this.state.hyvia + 1 })

    lisaaNeutraali = () => this.setState({ neutraaleja: this.state.neutraaleja + 1 })
    
    lisaaHuono = () => this.setState({ huonoja: this.state.huonoja + 1 })

    render() {
        return (
            <div>
                <FeedbackDiv title={this.feedback_title} lisaaHyva={this.lisaaHyva} 
                             lisaaNeutraali={this.lisaaNeutraali} lisaaHuono={this.lisaaHuono} />
                <StatsDiv title={this.stats_title} hyvia={this.state.hyvia}
                          neutraaleja={this.state.neutraaleja} huonoja={this.state.huonoja} />
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));

