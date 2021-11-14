require('dotenv').config();
const axios = require('axios');

require('dotenv').config();


const { Client, Intents, Role } = require('discord.js');

const bot = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGES]
});

bot.on('ready', () => {
    console.log(`Bot ${bot.user.tag} is logged in!`);


});

bot.login(process.env.BOT_TOKEN); // Replace the macro with your token

bot.on('guildMemberAdd', (member) => {
    // console.log(member)
});
// Welcome Message
bot.on('guildMemberAdd', (member) => {
    member.roles.add('908010320675635200');
    const channelId = '909346460603125800'; // The Channel ID you just copied
    const welcomeMessage = `Hey <@${member.user.id}> ! Welcome to our community! Please enter the verification code recieved on your email at <#909278509552267274> to get full access`;
    member.guild.channels.fetch(channelId).then(channel => {
        channel.send(welcomeMessage)
    });
});
bot.on('messageCreate', (message) => {
    if (message.author.id != '907633615599452160' && message.author.id != '707101869964656723' && message.content.toLowerCase() != 'clearchat' && message.channel.id != '909278509552267274') {
        console.log("ok");
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
                    console.log(user.discordid);
                    if (user.discordid == message.author.id) {
                        if (user.activated == false) {
                            message.delete();
                            message.member.roles.add('908010320675635200');
                            message.member.roles.remove('908013072428445766');
                            message.author.send(`<@${message.author.id}> Please verify your account first. Check your email for the verification code.  If you are once verified and now seeing this message, Then it seems the admin had deactivated your membership. Check the reason with <@707101869964656723>`)

                        }
                        flag = true

                    } else {
                        message.delete();
                        message.member.roles.add('908010320675635200');
                        message.member.roles.remove('908013072428445766');
                        message.author.send(`<@${message.author.id}> Please verify your account first. Check your email for the verification code.  If you are once verified and now seeing this message, Then it seems the admin had deactivated your membership. Check the reason with <@707101869964656723>`)
                    }
                }
            })



        })
    }
})


bot.on('messageCreate', (message) => {
    if (message.author.id == '707101869964656723') {
        if (message.content.toLowerCase().startsWith("clearchat")) {
            async function clear() {
                message.delete();
                message.channel.bulkDelete(100);

            }
            clear();
        }
    }

    if (message.channelId == '909278509552267274' && message.author.id != '907633615599452160' && message.content.toLowerCase() != 'clearchat') {


        axios.post(process.env.API_URL + '/login', {


            email: process.env.USER_NAME,
            password: process.env.PASS


        }).then(function (response) {
            var token = response.data.token
            axios.get(process.env.API_URL + '/data', {
                headers: {
                    'x-access-token': token
                }
            }).then(function (response) {

                // console.log(message.author.id)
                // loop
                var data = response.data
                var i;
                var flag = false;

                // console.log(data);
                var hasMatch = false;

                for (var index = 0; index < data.length; ++index) {

                    var user = data[index];

                    if (user.activationCode == message.content) {
                        hasMatch = true;
                        break;
                    }
                }
                if (hasMatch) {
                    axios.get(process.env.API_URL + '/activate/' + user._id, {
                        headers: {
                            'x-access-token': token
                        }
                    }).then(function (response) {
                        usersname = user.name
                        axios.get(process.env.API_URL + '/add/' + user._id + '/' + message.author.id, {
                            headers: {
                                'x-access-token': token
                            }
                        }).then(function (response) {
                            message.reply(usersname + ', You have been verified!')
                            //  add role
                            console.log(message.content);
                            message.member.roles.add('908013072428445766');
                            message.member.roles.remove('908010320675635200');
                        }
                        )

                    })
                }

            }).catch(function (error) {

                console.log(error);
            }
            );
        }
        ).catch(function (error) {
            console.log(error);
        });



    }

});



