
let {PythonShell} = require('python-shell')
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/hello', (req, res) => {
  let pyshell = new PythonShell('testMath.py');
  var temp = 'bad reponse from python'
// sends a message to the Python script via stdin
  pyshell.send('hello');

  pyshell.on('message', function (message) {
    // received a message sent from the Python script (a simple "print" statement)
    console.log(message);
    res.send({ express: message });
  });

  pyshell.end(function (err,code,signal) {
    // if (err) throw err;
    console.log('The exit code was: ' + code);
    console.log('The exit signal was: ' + signal);
    console.log('finished');
    console.log('finished');
  });
  // res.send({ express: temp });
  // end the input stream and allow the process to exit

});
app.get('/api/testMath', callD_alembert);
function callD_alembert(req, res) {
  // using spawn instead of exec, prefer a stream over a buffer
  // to avoid maxBuffer issue
  var spawn = require("child_process").spawn;
  var process = spawn('python', ["./testMath.py"]);
  process.stdout.on('data', function (data) {
    res.send(data.toString());
  });
}
app.post('/api/world', (req, res) => {
  console.log(req.body);
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`,
  );
});



app.listen(port, () => console.log(`Listening on port ${port}`));
