var express = require("express");
const axios = require("axios");
var router = express.Router();
let pincode = ''
const mongoose =  require('mongoose')
const Alerts = require('../models/alerts')
/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("vacinate", { title: "Express", sessions: "" });
});

router.get('/alert', (req,res,next) => {
  res.render("alert", {error: ''})
})

router.post('/alert', async(req,res,next) => {

  const {pincode, number} = req.body

  const newAlert = new Alerts({
    pincode : pincode,
    phoneNumber: number
  })

  if(number.length != 10 || pincode.length !=6) {
      return res.render("alert",{error: 'Pincode and Phone Number should be valid one'})
  }
  const savedAlert = await newAlert.save()
  console.log(savedAlert)
  res.render("alert",{error: `Alert created for ${pincode} and ${number} combination.`})
})


router.post('/',  (req,res,next) => {
  pincode =  req.body.pincode
  console.log('here')
  res.redirect('/vacinate')
})

router.get("/vacinate", async (req, res, next) => {
  let url
  if(pincode && pincode.length >0){
     url = `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${pincode}&date=31-03-2021`
  } else {
    url = "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=608001&date=31-03-2021"
  }
  var sessions = await axios.get(
    url, {headers: {
      method: "GET",
      scheme: "https",
      accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
      "accept-encoding": "gzip, deflate, br",
      "user-agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36",
    }}
  );
  console.log(sessions['data']['sessions']);
  return res.render("vacinate", { title: "Express", sessions: sessions['data']['sessions'], error: '' });
});

module.exports = router;
