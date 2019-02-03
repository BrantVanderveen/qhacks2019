
let {PythonShell} = require('python-shell')
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/sentiment', (req, res) => {
  console.log(req);
  console.log(res);
  let pyshell = new PythonShell('TweetScraper/run_and_export.py');
  var temp = 'bad reponse from python'
// sends a message to the Python script via stdin
  pyshell.send('hello');

  pyshell.on('message', function (message) {
    // received a message sent from the Python script (a simple "print" statement)
    console.log(message);
    //res.send({ express: message });
  });

  pyshell.end(function (err,code,signal) {
    // if (err) throw err;
    console.log('The exit code was: ' + code);
    console.log('The exit signal was: ' + signal);
    console.log('finished');
    console.log('finished');
  });
  setTimeout(()=> {
    var fs = require("fs");
    var contents = fs.readFileSync("jsonfile.json");
    res.send(contents)
  }, 1000);

  // res.send({ express: temp });
  // end the input stream and allow the process to exit

});

app.listen(port, () => console.log(`Listening on port ${port}`));
