var express = require('express');
var app  = express();

app.use("/images",express.static('/images'))

const port = 7777;

app.set('port', process.env.port || port);
app.listen(port, () => {
  console.log(`Static Server running on port: ${port}`);
});