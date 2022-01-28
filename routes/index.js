var express = require('express');
var router = express.Router();

var journeyModel = require('../models/journey');
var userModel= require('../models/users');

var city = ["Paris","Marseille","Nantes","Lyon","Rennes","Melun","Bordeaux","Lille"]
var date = ["2018-11-20","2018-11-21","2018-11-22","2018-11-23","2018-11-24"]



/* GET home page. */
router.get('/', function(req, res, next) {
  console.log ("--/ je suis la page login")
  
  res.render('login', { title: 'Express' });
});


/* GET homepage. */
router.get('/homepage', async function(req, res, next) {

  req.session.email = req.body.email;
  req.session.password = req.body.password;

  console.log('req.session.email',req.session.email);
  console.log('req.session.password',req.session.password);

  res.render('homepage', { email: req.session.email, pass: req.session.password });
});


/* POST homepage. */
router.post('/tickets', async function(req, res, next) {

  console.log('req.body',req.body)

  var datetime = req.body.datetime;
  console.log('datetime',datetime);

  var date = new Date(req.body.datetime);
  console.log('date',date);

  var city = await journeyModel.find({ departure: req.body.departure, arrival: req.body.arrival, date: date });

  if (city.length > 0) {
    res.render('tickets', { city, date, datetime });
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

  req.query.departure

  res.render('my-tickets-trains', {  });
});

/* GET tickets. */
router.get('/my-last-trips', async function(req, res, next) {

  
  res.render('my-last-trips', {  });
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


//Sign up
router.post('/sign-up', async function(req, res, next) {
  console.log ("--POST/sign-up je suis la page login")
  console.log("--POST/sign-up req.body.email :", req.body.email)
  const user = await userModel.findOne( { email: req.body.email} );
  console.log("--POST/sign-up user :", user);

  if(!user){
  var newUser = userModel({
    username: req.body.username,
    userfirstname: req.body.userfirstname,
    email: req.body.email,
    password: req.body.password,
    });

    const userSaved = await newUser.save();

    console.log("--POST/sign-up userSaved :", userSaved);
    req.session.email =userSaved.email
    console.log("--POST/sign-up req.session.email :", req.session.email);
    req.session.password =userSaved.password
    console.log("--POST/sign-up req.session.password :", req.session.password);

    res.redirect('/');}
  
});

  
  //Sign in
  router.post('/sign-in', async function(req, res, next) {
    console.log ("--POST/sign-in je suis la page login")
    console.log("--POST/sign-in req.body.email :", req.body.email)
    console.log("--POST/sign-in req.body.password :", req.body.password)
    
    const searchUser= await userModel.findOne({
      email: req.body.email,
      password: req.body.password
    })
    console.log("--POST/sign-in req.session.email", req.session.email);
    console.log("--POST/sign-in searchUser", searchUser);

    if (searchUser!=null){
      searchUser.email = req.session.email
        res.redirect('/homepage')
    } else {res.redirect ('/')};
  });


  
module.exports = router;
