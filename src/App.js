import React, { Component } from 'react';
import logo from './qhacks.png';
import './App.css';
import { HashLoader } from 'react-spinners';
import { css } from '@emotion/core';
import { Line } from 'react-chartjs-2';
import $ from 'jquery';
// import test from 'jsonfile.json';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      focused: false,
      inputText: '',
      submitted: false,
      response: '',
      query: '',
      data: [],
    //  jsonData: require('jsonfile.json') //(with path)
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
  }
  callApi = async () => {
    const response = await fetch('/api/sentiment');
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

  processResults(res) {
    var i = 1;
    var j = 0;
    var sum = 0;
    const summary = [];
    for(i=1;i<=12;i++) {
      while (j < (Math.floor(res.length/12))*i && !!res[j+1]) {
        if (!summary[i-1]) {
          summary[i-1] = {
            text: res[j].text,
            avg: 0
          }
        }
        sum += res[j].polarity;
        if (j+1 === (Math.floor(res.length/12))*i) {
          summary[i-1].avg = sum/Math.floor(res.length/12);
          sum = 0;
        }
        j++;
      }
    }
    console.log(summary);
    return(summary)
  }

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
  getDataPoints() {
    return  [0, (Math.random()*100)-50, (Math.random()*100)-50, (Math.random()*100)-50, (Math.random()*100)-50, (Math.random()*100)-50, (Math.random()*100)-50];
  }
  attemptSubmit() {
    if(!this.state.inputText || this.state.query) {
      return false;
    }
    this.setState({
      submitted: true,
      query: this.state.inputText
    })
    console.log('submitted: ' + this.state.inputText)
    this.callApi()
      .then(res => {
        console.log(res);
        var processed = this.processResults(res);
        this.setState({resultsFound: true, focused: false, data: this.state.data.concat([{sentiment: processed, label: this.state.query}]), response: res, query: ''})
        setTimeout(()=>{this.setState({submitted: false})}, 1000)
      })
      .catch(err => console.log(err));
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
    const colors = [
      {
        border: 'rgba(66, 244, 66, 1)',
        bg: 'rgba(66, 244, 66, 0.3)'
      },
      {
        border: 'rgba(204, 93, 24, 1)',
        bg: 'rgba(204, 93, 24, 0.3)'
      },
      {
        border: 'rgb(25, 22, 186)',
        bg: 'rgba(25, 22, 186, 0.3)'
      }
    ];
    const datasets = this.state.data.map((datapoint, i)=> {
      return {
        label: datapoint.label,
        data: datapoint.sentiment.map((p)=>p.avg),
        backgroundColor: colors[i].bg,
        borderColor: colors[i].border
      }
    })
    const data= {
        labels: ["February", "March", "April", "May", "June", "July", "August", "September", "November", "December", "January"],
        datasets: datasets
    }
    const options = {
      legend: {
        display: false
      },
      tooltips: {
        enabled: false
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
            HOW DO YOU FEEL
          </p>
          <div className="contentBox">
            <p className="subheadertext">
              <strong> A powerful sentiment analysis tool </strong> - how does the world feel about your movement, your product, or your company?
              Discover how the world is reacting to anything, from a celebrity's latest antics to a an IPO that's making a splash.
            </p>
            <div className="inputWrapper">
              <div className="inputPill">
                <input type="text"
                  className="mainInput"
                  onFocus={() => this.addFocus()}
                  onBlur={() => this.removeFocus()}
                  onChange={(e)=>this.setState({inputText: e.target.value, submitted: false, focused: true})}
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
