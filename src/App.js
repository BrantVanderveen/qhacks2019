import React, { Component } from 'react';
import logo from './qhacks.png';
import './App.css';
import { HashLoader } from 'react-spinners';
import { css } from '@emotion/core';
import { Line } from 'react-chartjs-2';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      focused: false,
      inputText: '',
      submitted: false,
      randomData:  [0, (Math.random()*100)-50, (Math.random()*100)-50, (Math.random()*100)-50, (Math.random()*100)-50, (Math.random()*100)-50, (Math.random()*100)-50],
      response: 'test reponse!'
     };
  }
  componentDidMount(prevProps, prevState, snapshot) {
    window.addEventListener("keyup", (e)=>{
      var code = e.keyCode || e.which;

      if( code === 13 ) {
        e.preventDefault();
        this.attemptSubmit();
        return false;
      }
    });
    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err));
  }
  callApi = async () => {
    const response = await fetch('/api/hello');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };
  handleSubmit = async e => {
    e.preventDefault();
    const response = await fetch('/api/world', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ post: this.state.post }),
    });
    const body = await response.text();
    this.setState({ responseToPost: body });
  };
  addFocus() {
    this.setState({
      focused: true
    })
  }
  removeFocus() {
    if(!this.state.inputText) {
      this.setState({
        focused: false,
        submitted: false
      })
    }
  }
  attemptSubmit() {
    if(!this.state.inputText) {
      return false;
    }
    this.setState({
      submitted: true,
      randomData:  [0, (Math.random()*100)-50, (Math.random()*100)-50, (Math.random()*100)-50, (Math.random()*100)-50, (Math.random()*100)-50, (Math.random()*100)-50]
    })
    console.log('submitted: ' + this.state.inputText)
    setTimeout(()=>{
      setTimeout(()=>{this.setState({submitted: false})}, 1000)
      this.setState({resultsFound: true, focused: false})
    }, 3000);
  }
  render() {
    var loadCSS = css`
      display: block;
      margin-left: -8px;
      margin-top: -30px;
      opacity: 0;
      transition: 0.5s;
    `;
    if (this.state.submitted) {
      loadCSS = css`
        display: block;
        margin-left: -8px;
        margin-top: -25px;
        opacity: 1;
        transition: 0.5s;
      `;
    }
    const data= {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [{
        backgroundColor: 'rgba(66, 244, 66, 0.3)',
        borderColor: 'rgb(66, 244, 66)',
        data: this.state.randomData,
        }]
    }
    const options = {
      legend: {
        display: false
      }
    }
    var resultsCSS = "results";
    const resultStyle = this.state.resultsFound && {'maxHeight': '600px', 'opacity': 1} || {};
    if (this.state.resultsFound) {
      resultsCSS += " showResults"
    }
    var submitState = "submitPart";
    if (!this.state.focused) {
      submitState += " hide"
    }
    if (!this.state.inputText) {
      submitState += " hideText"
    }
    if (this.state.submitted) {
      submitState += " submitted"
    }
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="qhacks-logo" alt="logo" />
          <p className="headertext">
            SCRAPE TWIT. SMASH TWAT
          </p>
          <div className="contentBox">
            <p className="subheadertext">
              <strong> A powerful sentiment analysis tool </strong> - how does the world feel about your movement, your product, or your company?
              Discover how the world is reacting to anything, from a celebrity's latest antics to a an IPO that's making a splash.
            </p>
            <p>
              {this.state.response}
            </p>
            <div className="inputWrapper">
              <div className="inputPill">
                <input type="text"
                  className="mainInput"
                  onFocus={() => this.addFocus()}
                  onBlur={() => this.removeFocus()}
                  onChange={(e)=>this.setState({inputText: e.target.value, submitted: false, resultsFound: false, focused: true})}
                  onSubmit={()=>this.attemptSubmit()}
                />
                <div className={submitState}
                  onClick={()=>this.attemptSubmit()}
                >
                  <span className="innerSubmit">
                  FEEL IT
                  </span>
                  <HashLoader
                    css={loadCSS}
                    sizeUnit={"px"}
                    size={30}
                    color={'#fff'}
                    loading={true}
                  />
                </div>
              </div>
            </div>
            <div className={resultsCSS} style={resultStyle}>
            < Line data={data} options={options}/>
            </div>
          </div>
        </header>
      </div>
    );
  }
}

export default App;
