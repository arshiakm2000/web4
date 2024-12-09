/********************************************************************************
 * WEB322 – Assignment 04
 *
 * I declare that this assignment is my own work in accordance with Seneca's
 * Academic Integrity Policy:
 *
 * https://www.senecacollege.ca/about/policies/academic-integrity-policy.html
 *
 * Name: Arshia Keshavarz Motamedi Student ID: 158672220 Date: 12/8/2024
 *
 *
 ********************************************************************************/
const express = require('express');
const path = require('path'); 
const legoData = require('./modules/legoSets');
const app = express();
const HTTP_PORT = process.env.PORT || 8080;

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Set the views directory
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Initialize lego data and start the server
legoData.initialize()
    .then(() => {
        app.listen(HTTP_PORT, () => {
            console.log(`Server is running at http://localhost:${HTTP_PORT}`);
        });
    })
    .catch(err => {
        console.error("Failed to initialize Lego data:", err);
    });

// Route for the home page
app.get('/', (req, res) => {
    res.render("home", { page: '/' });
});

// Route for the about page
app.get('/about', (req, res) => {
    res.render("about", { page: '/about' });
});

// Route for Lego sets with an optional theme query parameter
app.get('/lego/sets', (req, res) => {
    const theme = req.query.theme;
    if (theme) {
        legoData.getSetsByTheme(theme)
            .then(data => {
                res.render('sets', { sets: data, theme, page: '/lego/sets' });
            })
            .catch(err => {
                res.status(404).render('404', { page: '', message: "No sets found for the specified theme." });
            });
    } else {
        legoData.getAllSets()
            .then(data => {
                res.render('sets', { sets: data, theme: null, page: '/lego/sets' });
            })
            .catch(err => {
                res.status(500).render('500', { page: '', message: "Server error retrieving sets." });
            });
    }
});

// Route for individual set pages
app.get("/lego/set/:set_num", (req, res) => {
    const setNum = req.params.set_num;
    legoData
      .getSetByNum(setNum)
      .then((data) => {
        if (!data) {
          res.status(404).render("404", { message: "Set not found." });
        } else {
          res.render("set", { set: data });
        }
      })
      .catch(() => {
        res.status(500).render("500", {
          message: "An error occurred while fetching the set.",
        });
      });
  });
  

// Catch-all for 404 errors
app.use((req, res) => {
    res.status(404).render('404', { page: '', message: "Page not found." });
});
