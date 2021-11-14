const axios = require('axios');

require('dotenv').config();
axios.post(process.env.API_URL+'/login', {


    email: process.env.USER_NAME,
    password: process.env.PASS


}).then(function (response) {
    if (response.data.activated != true) {
       console.log(response.data);

    }
    
})