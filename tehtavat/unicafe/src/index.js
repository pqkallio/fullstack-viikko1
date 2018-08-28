import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

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

const Statistic = ({ title, value }) => {
    return (
        <tr>
            <td>{title}</td>
            <td>{value}</td>
        </tr>
    )
}

const Statistics = ({ hyvia, neutraaleja, huonoja, keskiarvo, positiivisia }) => {
    return (
        <div>
            <table>
                <Statistic title='hyvä' value={hyvia} />
                <Statistic title='neutraali' value={neutraaleja} />
                <Statistic title='huono' value={huonoja} />
                <Statistic title='keskiarvo' value={keskiarvo().toFixed(2)} />
                <Statistic title='positiivisia' value={prosentteina(positiivisia())} />
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
            'hyvia': 0,
            'neutraaleja': 0,
            'huonoja': 0
        }
    }

    lisaaHyva = () => this.setState({ hyvia: this.state.hyvia + 1 })

    lisaaNeutraali = () => this.setState({ neutraaleja: this.state.neutraaleja + 1 })
    
    lisaaHuono = () => this.setState({ huonoja: this.state.huonoja + 1 })

    arvosteluja = () => this.state.hyvia + this.state.neutraaleja + this.state.huonoja

    keskiarvo = () => {
        const summa = this.state.hyvia - this.state.huonoja
        const keskiarvo = (summa / this.arvosteluja())

        return isFinite(keskiarvo) ? keskiarvo : 0
    }

    positiivisia = () => {
        const positiivistenOsuus = this.state.hyvia / this.arvosteluja()

        return isFinite(positiivistenOsuus) ? positiivistenOsuus : 0
    }

    render() {
        return (
            <div>
                <FeedbackDiv title={this.feedback_title} lisaaHyva={this.lisaaHyva} 
                             lisaaNeutraali={this.lisaaNeutraali} lisaaHuono={this.lisaaHuono} />
                <StatsDiv title={this.stats_title} hyvia={this.state.hyvia}
                          neutraaleja={this.state.neutraaleja} huonoja={this.state.huonoja}
                          keskiarvo={this.keskiarvo} positiivisia={this.positiivisia} />
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
