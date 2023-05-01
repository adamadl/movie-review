// *****************************************************
// <!-- Section 1 : Import Dependencies -->
// *****************************************************

const express = require('express'); // To build an application server or API
const app = express();
const pgp = require('pg-promise')(); // To connect to the Postgres DB from the node server
const bodyParser = require('body-parser');
const session = require('express-session'); // To set the session object. To store or access session data, use the `req.session`, which is (generally) serialized as JSON by the store.
const bcrypt = require('bcrypt'); //  To hash passwords
const axios = require('axios'); // To make HTTP requests from our server. We'll learn more about it in Part B.

// *****************************************************
// <!-- Section 2 : Connect to DB -->
// *****************************************************

// database configuration
const dbConfig = {
  host: 'db', // the database server
  port: 5432, // the database port
  database: process.env.POSTGRES_DB, // the database name
  user: process.env.POSTGRES_USER, // the user account to connect with
  password: process.env.POSTGRES_PASSWORD, // the password of the user account
};

const db = pgp(dbConfig);

// test your database
db.connect()
  .then(obj => {
    console.log('Database connection successful'); // you can view this message in the docker compose logs
    obj.done(); // success, release the connection;
  })
  .catch(error => {
    console.log('ERROR:', error.message || error);
  });

const user = {
    username: undefined,
    password: undefined,
    first_name: undefined,
    last_name: undefined,
    email: undefined,
  };

// *****************************************************
// <!-- Section 3 : App Settings -->
// *****************************************************

app.set('view engine', 'ejs'); // set the view engine to EJS
app.use(bodyParser.json()); // specify the usage of JSON for parsing request body.
app.use(express.static('resources'));

// initialize session variables
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
  })
);

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// *****************************************************
// <!-- Section 4 : API Routes -->
// *****************************************************

// TODO - Include your API routes here
app.get('/', (req, res) => {
    res.redirect('/main'); //this will call the /anotherRoute route in the API
});

app.get('/main', (req, res) => {
    res.render('pages/main'); //this will call the /anotherRoute route in the API
});

// app.get('/search/:searchTerm', async (req, res) => {
// //     const searchTerm = req.params.searchTerm;
// //     try {
// //       const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchTerm}`);
// //       const item = response.data.results[0];
// //       res.send(item);
// //     } catch (error) {
// //       console.error(error);
// //       res.status(500).send('Error fetching search results');
// //     }
// //   });
// });
// app.get('/search', async (req, res) => {
//     const searchTerm = req.query.searchTerm;
//     try {
//       const results = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchTerm}`);
//       const items = results.data.results;
//     //   const item = results.length > 0 ? results[0] : null;
//       res.render('pages/main', { results: items });
//     } catch (error) {
//       console.error(error);
//       res.status(500).send('Error fetching search results');
//     }
//   });
// app.get('/search', async (req, res) => {
//     const searchTerm = req.query.searchTerm;
//     try {
//       const results = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=22bc16482d9f894742fe650ab0900ca7&query=movies`);
//       const items = results.data.results.map(item => ({
//         name: item.title,
//         image: item.poster_path,
//         date: item.release_date,
//         overview: item.overview
//       }));
//       res.render('pages/main', { results: items });
//     } catch (error) {
//       console.error(error);
//       res.render('pages/main', { results: [], error:true });
//     }
// });
app.get('/search', async (req, res) => {
    try {
      const searchQuery = req.query.search;
      const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=22bc16482d9f894742fe650ab0900ca7&query=${searchQuery}`);
      const results = response.data.results;
      const firstResult = results.length > 0 ? results[0] : null;
      if (firstResult) {
        res.json(firstResult);
      } else {
        res.json({ error: 'No results found' });
      }
    } catch (error) {
      console.log(error);
      res.json({ error: 'An error occurred while fetching the search results' });
    }
  });
// *****************************************************
// <!-- Section 5 : Start Server-->
// *****************************************************
// starting the server and keeping the connection open to listen for more requests
app.listen(3000);
console.log('Server is listening on port 3000');