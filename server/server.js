const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('../client/dist'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require('./routes/htmlRoutes')(app);

//Listens for all available connections on the specified port
app.listen(PORT, '0.0.0.0', () => console.log(`Now listening on port: ${PORT}`));
