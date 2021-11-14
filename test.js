axios = require('axios');
require('dotenv').config();

axios.post(process.env.API_URL + '/login', {


    email: process.env.USER_NAME,
    password: process.env.PASS


}).then(function (response) {
    axios.get(process.env.API_URL + '/data', {
        headers: {
            'x-access-token': response.data.token
        }
    }).then(function (response) {
        var data = response.data
        for (var index = 0; index < data.length; ++index) {

            var user = data[index];
            console.log(user.activated);
            // if (user.discordid == message.client.user.email) {
            //     flag=true

            // }else{
            //     message.delete();
            //     message.member.roles.add('908010320675635200');
            //     message.member.roles.remove('908013072428445766');
            //     message.author.send(`<@${message.author.id}> Please verify your account first. Check your email for the verification code.  If you are once verified and now seeing this message, Then it seems the admin had deactivated your membership. Check the reason with <@707101869964656723>`)
            // }
        }
    })



})