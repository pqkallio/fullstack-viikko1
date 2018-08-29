import React from 'react'
import ReactDOM from 'react-dom'

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]

const MostVotedDiv = ({ mostVotedIndex, nVotes }) => {
    return (
        <div>
            <h2>anecdote with most votes:</h2>
            <AnecdoteDiv anecdoteIndex={mostVotedIndex} nVotes={nVotes} />
        </div>
    )
}

const AnecdoteDiv = ({ anecdoteIndex, nVotes }) => {
    return (
        <div>
            <p>{anecdotes[anecdoteIndex]}</p>
            <p>has {nVotes} votes</p>
        </div>
    )
}

class App extends React.Component {
  constructor(props) {
    super(props)

    const votesArray = new Array(anecdotes.length)
    votesArray.fill(0, 0, anecdotes.length)

    this.state = {
      anecdote: 0,
      votes: votesArray,
      mostVoted: 0
    }
  }

  getRandomAnecdote = () => () => {
      const randomIndex = Math.floor(Math.random() * this.props.anecdotes.length)
      
      this.setState({anecdote: randomIndex})
  }

  voteCurrentAnecdote = () => () => {
      const copyOfVotes = [...this.state.votes]
      const anecdote = this.state.anecdote

      copyOfVotes[anecdote] += 1      
      this.setState({ votes: copyOfVotes })

      const mostVoted = copyOfVotes.indexOf(Math.max(...copyOfVotes))
      if (this.state.mostVoted !== mostVoted) {
          this.setState({ mostVoted: mostVoted })
      }
  }

  render() {
    return (
      <div>
        <AnecdoteDiv anecdoteIndex={this.state.anecdote}
                     nVotes={this.state.votes[this.state.anecdote]} />
        <button onClick={this.voteCurrentAnecdote()}>vote</button>
        <button onClick={this.getRandomAnecdote()}>next anecdote</button>
        <MostVotedDiv mostVotedIndex={this.state.mostVoted}
                      nVotes={this.state.votes[this.state.mostVoted]} />
      </div>
    )
  }
}

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
