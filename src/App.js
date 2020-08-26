import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    quoteText: "",
    quoteAuthor: "",
    isLoading: false,
  }

  componentDidMount() {
    this.getNewQuote();
  }

  changeLoadingState = () => {
    this.setState(prevState => {
      return {
        ...prevState,
        isLoading: !prevState.isLoading
      }
    })
  }


  getNewQuote = async () => {
    this.changeLoadingState();

    const proxyUrl = 'https://whispering-tor-04671.herokuapp.com/'; //fix CORS problem
    const apiUrl = "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";
    try {
      const resp = await fetch(proxyUrl + apiUrl);
      const data = await resp.json();
      this.setState((prevState) => {
        return {
          ...prevState,
          quoteText: data.quoteText,
          quoteAuthor: data.quoteAuthor
        }
      })

      this.changeLoadingState();
    } catch (err) {
      this.componentDidMount();
      console.log(err);
    }
  }

  tweetQuote = () => {
    const { quoteText, quoteAuthor } = this.state;
    const tweetUrl = `https://twitter.com/intent/tweet?text=${quoteText} - ${quoteAuthor}`;
    window.open(tweetUrl, '_blank');
  }




  render() {
    const { quoteText, quoteAuthor, isLoading } = this.state;
    return (
      <div className="App">
        {!isLoading && <div className="quote-container">
          <div className={`quote-text ${quoteText.length > 120 && "quote-text-long"}`}>
            <i className="fas fa-quote-left"></i>
            <span>{quoteText}</span>
          </div>
          <div className="quote-author">
            <span>{quoteAuthor}</span>
          </div>
          <div className="button-container">
            <button onClick={this.tweetQuote}>
              <i className="fab fa-twitter"></i>
            </button>
            <button onClick={this.getNewQuote}>New Quote</button>
          </div>
        </div>}
        {isLoading && <div className="loader"></div>}
      </div>
    );
  }
}

export default App;

