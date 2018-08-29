import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const hyvatAvain = 'hyvia'
const neutrAvain = 'neutraaleja'
const huonoAvain = 'huonoja'

const prosentteina = (arvo) => (arvo * 100).toFixed(1).toString() + '%'

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

const FeedbackButtons = ({ handleClick }) => {
    return (
        <div>
            <Button title='hyvä' handleClick={handleClick(hyvatAvain)} />
            <Button title='neutraali' handleClick={handleClick(neutrAvain)} />
            <Button title='huono' handleClick={handleClick(huonoAvain)} />
        </div>
    )
}

const FeedbackDiv = ({ title, handleClick }) => {
    return (
        <div>
            <Header title={title} />
            <FeedbackButtons handleClick={handleClick} />
        </div>
    )
}

const Statistic = ({ title, value }) => {
    return (
        <tr>
            <td>{title}</td>
            <td>{value}</td>
        </tr>
    )
}

const Statistics = ({ hyvia, neutraaleja, huonoja, keskiarvo, positiivisia }) => {
    const yhteensa = hyvia + neutraaleja + huonoja

    if (yhteensa === 0) {
        return (
            <div>
                <p>ei yhtään palautetta annettu</p>
            </div>
        )
    }

    return (
        <div>
            <table>
                <tbody>
                    <Statistic title='hyvä' value={hyvia} />
                    <Statistic title='neutraali' value={neutraaleja} />
                    <Statistic title='huono' value={huonoja} />
                    <Statistic title='keskiarvo' value={keskiarvo().toFixed(2)} />
                    <Statistic title='positiivisia' value={prosentteina(positiivisia())} />
                </tbody>
            </table>
        </div>
    )
}

const StatsDiv = ({ title, hyvia, neutraaleja, huonoja, keskiarvo, positiivisia }) => {
    return (
        <div>
            <Header title={title} />
            <Statistics hyvia={hyvia} neutraaleja={neutraaleja} huonoja={huonoja}
                        keskiarvo={keskiarvo} positiivisia={positiivisia} />
        </div>
    )
}

class App extends React.Component {
    constructor() {
        super()
        this.feedback_title = 'anna palautetta'
        this.stats_title = 'statistiikka'

        this.state = {
            [hyvatAvain]: 0,
            [neutrAvain]: 0,
            [huonoAvain]: 0
        }
    }

    arvosteluja = () => this.state[hyvatAvain] + this.state[neutrAvain] + this.state[huonoAvain]

    keskiarvo = () => {
        const summa = this.state[hyvatAvain] - this.state[huonoAvain]
        const keskiarvo = (summa / this.arvosteluja())

        return isFinite(keskiarvo) ? keskiarvo : 0
    }

    positiivisia = () => {
        const positiivistenOsuus = this.state[hyvatAvain] / this.arvosteluja()

        return isFinite(positiivistenOsuus) ? positiivistenOsuus : 0
    }

    lisaaArvostelu = (arvostelu) => () => this.setState({[arvostelu]: this.state[arvostelu] + 1})

    render() {
        return (
            <div>
                <FeedbackDiv title={this.feedback_title} handleClick={this.lisaaArvostelu} />
                <StatsDiv title={this.stats_title} hyvia={this.state[hyvatAvain]}
                          neutraaleja={this.state[neutrAvain]} huonoja={this.state[huonoAvain]}
                          keskiarvo={this.keskiarvo} positiivisia={this.positiivisia} />
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
