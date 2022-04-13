var express = require('express');
var router = express.Router();

var journeyModel = require('../models/journey');
<<<<<<< HEAD
var userModel = require('../models/user')

// Data -----------------------------------------------------------------------------
=======
var userModel= require('../models/users');

>>>>>>> 1c77cd5435cd8f86f2f20b07cf396d79bbd28c35
var city = ["Paris","Marseille","Nantes","Lyon","Rennes","Melun","Bordeaux","Lille"]
var date = ["2018-11-20","2018-11-21","2018-11-22","2018-11-23","2018-11-24"]



<<<<<<< HEAD
/* GET Login page. */
router.get('/', function(req, res, next) {

  if(req.session.user == undefined) {
    req.session.user = [];
  }

  res.render('login', {alertMessage:''});
});

/* GET Homepage page. */
router.get('/index', function(req, res, next) {

  if(req.session.user == undefined) {
    req.session.user = [];
  }

  res.render('index', {user:req.session.user });
});

/* GET Homepage page. */
router.get('/confirmReservation', async function(req, res, next) {


  //console.log('/confirmReservation : We have this user in session --> :', req.session.user)
  
  // We want to update our onGoingTicket for our user
  var user = await userModel.findById(req.session.user._id)
  
  //console.log(' /confirmReservation : we found the user --->',user);

  //console.log(' /confirmReservation : session --->',req.session.myTickets);

  for(i = 0; i<req.session.myTickets.length; i++){

    user.historyTickets.push({

      departure: req.session.myTickets[i].ticketDeparture,
      arrival: req.session.myTickets[i].ticketArrival,
      date: req.session.myTickets[i].ticketDate,
      departureTime: req.session.myTickets[i].ticketDepartureTime,
      price: req.session.myTickets[i].ticketPrice,

    })
  }

  await user.save()

  req.session.myTickets = []

  res.render('index', {user:req.session.user });
  
});

/* GET Last trips page. */
router.get('/myLastTrips', async function(req, res, next) {

  var historicTravel = [];

  var user = await userModel.findById(req.session.user._id)
  
  //console.log("On a bien le user suivant dans myLastTrips -->",user.historyTickets);
  res.render('myLastTrips', { title: 'Express',historicTravel:user.historyTickets });     
  
});

/* Post Sign-in */
router.post('/sign-in', async function(req, res, next) {

   //console.log(' /sign-In : result from the front -->',req.body)

  var user = await userModel.find({ email: req.body.signInEmail, password: req.body.signInPassword })
  if(user.length > 0){

    //console.log(' /sign IN : We do have a user with this email')

    // Session
    req.session.user = user[0]

    // We can render the next page 
    res.render('index', {user:req.session.user });

  }else{

    //console.log(' /Sign IN : We dont have a user with this email, so he needs to sign-up first')

    // We can render the next page 
    res.render('login', {alertMessage:'You need to sign-up first' });
    
  }
  
});

/* Post Sign-in */
router.post('/sign-up', async function(req, res, next) {

  // console.log(' /Sign-Up : result from the front -->',req.body)

  var user = await userModel.find({ email: req.body.signUpEmail })
  
  if(user.length > 0){

    //console.log('We already have a user with this email')

    // Session
    req.session.user = user

    // We can render the next page 
    res.render('index', { title: 'Express',user:req.session.user });

  }else{

    //console.log(' /Sign-UP : We dont have a user with this email, so we need to save it')

    var newUser = new userModel ({
      name: req.body.signUpName, 
      firstName: req.body.signUpFirstName, 
      password: req.body.signUpPassword, 
      email: req.body.signUpEmail, 
    });

    await newUser.save()

    //console.log(' /Sign-UP : Our new user -->',newUser)

    // Session
    req.session.user = newUser

    // We can render the next page 
    res.render('index', {user: req.session.user});
    
  }  
});

/* Post journeys */
router.post('/journeys', async function(req, res, next) {

  //console.log(' /journeys : result from the front --> : ',req.body)

  var departureCity = req.body.departureCity;
  var arrivalCity = req.body.arrivalCity; 
  var dateDeparture = req.body.journeyDate;
  
  var userId = req.body.userId

  var journey = await journeyModel.find( 
    { departure: departureCity,
      arrival:arrivalCity,
      date:dateDeparture
    }
  )

  req.session.journeyTab = []

  if(journey[0] == undefined){
              
    //console.log('/journeys : Oops, there is no tickets -->')
    res.render('page1', {journeyTab:req.session.journeyTab, userId });

  }else{

    // console.log(`Trajets au départ de ${journey[0].departure} : `, journey);

    for(var i = 0; i<journey.length; i++){

      req.session.journeyTab.push(journey[i])

    }

    //console.log(' /journeys : my journeyTab de mon back que je vais renvoyer au front -->', req.session.journeyTab)

    res.render('page1', {journeyTab:req.session.journeyTab, userId});
  }
  
});

/* Post journeys */
router.post('/myTicket', async function(req, res, next) {

  //console.log('My ticket Choice --> : ', req.body)

  if(req.session.myTickets == undefined){
    req.session.myTickets = []
  }

  // We push in our myTicketsSession to create the basket
  req.session.myTickets.push(req.body)

  // We need to format into Number the price to be able to have a total basket
  for(var i = 0; i<req.session.myTickets.length; i++){
    req.session.myTickets[i].ticketPrice =  Number(req.session.myTickets[i].ticketPrice)
  }

  // console.log('My basket ---->', req.session.myTickets)
  res.redirect('/myTicket')
  
});

/* Post journeys */
router.get('/myTicket', async function(req, res, next) {

  res.render('myTickets', {myTickets:req.session.myTickets});
  
});







// --------------------------JUST ONCE-------------------------------------
=======
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

  var date = new Date(req.query.date);

  var ticket = [
    {
      departure: req.query.departure,
      arrival: req.query.arrival,
      date: date,
      departureTime: req.query.departureTime,
      price: req.query.price
    }
  ]

  console.log('ticket ticket',ticket);

  res.render('my-tickets-trains', { ticket });
});

/* GET tickets. */
router.get('/my-last-trips', async function(req, res, next) {

  
  res.render('my-last-trips', {  });
});

>>>>>>> 1c77cd5435cd8f86f2f20b07cf396d79bbd28c35

// Remplissage de la base de donnée, une fois suffit
router.get('/save', async function(req, res, next) {

  // How many journeys we want
  var count = 300

  // Save  ---------------------------------------------------
    for(var i = 0; i< count; i++){

    departureCity = city[Math.floor(Math.random() * Math.floor(city.length))]
    arrivalCity = city[Math.floor(Math.random() * Math.floor(city.length))]

    if(departureCity != arrivalCity){

<<<<<<< HEAD
      var newJourney = new journeyModel ({
=======
      var newUser = new journeyModel ({
>>>>>>> 1c77cd5435cd8f86f2f20b07cf396d79bbd28c35
        departure: departureCity , 
        arrival: arrivalCity, 
        date: date[Math.floor(Math.random() * Math.floor(date.length))],
        departureTime:Math.floor(Math.random() * Math.floor(23)) + ":00",
        price: Math.floor(Math.random() * Math.floor(125)) + 25,
      });
<<<<<<< HEAD
       await newJourney.save();
    }

  }
  res.render('index', { title: 'Express' });
});

=======
       
       await newUser.save();
       

    }

  }
  res.render('homepage', { newUser });
});


>>>>>>> 1c77cd5435cd8f86f2f20b07cf396d79bbd28c35
// Cette route est juste une verification du Save.
// Vous pouvez choisir de la garder ou la supprimer.
router.get('/result', function(req, res, next) {

  // Permet de savoir combien de trajets il y a par ville en base
  for(i=0; i<city.length; i++){

    journeyModel.find( 
      { departure: city[i] } , //filtre
  
      function (err, journey) {

<<<<<<< HEAD
          //console.log(`Nombre de trajets au départ de ${journey[0].departure} : `, journey.length);
=======
          console.log(`Nombre de trajets au départ de ${journey[0].departure} : `, journey.length);
>>>>>>> 1c77cd5435cd8f86f2f20b07cf396d79bbd28c35
      }
    )

  }


  res.render('index', { title: 'Express' });
});


<<<<<<< HEAD

=======
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


  
>>>>>>> 1c77cd5435cd8f86f2f20b07cf396d79bbd28c35
module.exports = router;
