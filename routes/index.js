var express = require('express');
var router = express.Router();

var journeyModel = require('../models/journey')

var city = ["Paris","Marseille","Nantes","Lyon","Rennes","Melun","Bordeaux","Lille"]
var date = ["2018-11-20","2018-11-21","2018-11-22","2018-11-23","2018-11-24"]



/* GET home page. */
router.get('/', function(req, res, next) {
  console.log ("--/ je suis la page login")
  res.render('login', { title: 'Express' });
});


/* GET homepage. */
router.get('/homepage', async function(req, res, next) {

  var city = await journeyModel.find();

  res.render('homepage', { city });
});


/* POST homepage. */
router.post('/tickets', async function(req, res, next) {

  var city = await journeyModel.find({ departure: req.body.departure, arrival: req.body.arrival  });
  console.log('city',city);
  console.log('req.body.datetime',req.body.datetime);

  // var empty = city.length;


  if (city.length > 0) {
    res.render('tickets', { city });
  } else {
    res.redirect('/no-trains')
  } 
});


/* POST no-trains. */
router.get('/no-trains', async function(req, res, next) {

  
  res.render('no-trains', {  });
});


/* GET tickets. */
router.get('/my-tickets-trains', async function(req, res, next) {

  

  res.render('my-tickets-trains', {  });
});


// Remplissage de la base de donnée, une fois suffit
router.get('/save', async function(req, res, next) {

  // How many journeys we want
  var count = 300

  // Save  ---------------------------------------------------
    for(var i = 0; i< count; i++){

    departureCity = city[Math.floor(Math.random() * Math.floor(city.length))]
    arrivalCity = city[Math.floor(Math.random() * Math.floor(city.length))]

    if(departureCity != arrivalCity){

      var newUser = new journeyModel ({
        departure: departureCity , 
        arrival: arrivalCity, 
        date: date[Math.floor(Math.random() * Math.floor(date.length))],
        departureTime:Math.floor(Math.random() * Math.floor(23)) + ":00",
        price: Math.floor(Math.random() * Math.floor(125)) + 25,
      });
       
       await newUser.save();
       

    }

  }
  res.render('homepage', { newUser });
});


// Cette route est juste une verification du Save.
// Vous pouvez choisir de la garder ou la supprimer.
router.get('/result', function(req, res, next) {

  // Permet de savoir combien de trajets il y a par ville en base
  for(i=0; i<city.length; i++){

    journeyModel.find( 
      { departure: city[i] } , //filtre
  
      function (err, journey) {

          console.log(`Nombre de trajets au départ de ${journey[0].departure} : `, journey.length);
      }
    )

  }


  res.render('index', { title: 'Express' });
});

  
  //Sign in
  router.post('/sign-in', function(req, res, next) {
    console.log ("--POST/ je suis la page login")
    console.log("--POST/sign-in req.body", req.body);
    res.render('', { title: 'Express' });
  });

module.exports = router;
