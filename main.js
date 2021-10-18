require('dotenv').config();
const { Client, Intents } = require('discord.js');
const { dockStart } = require('@nlpjs/basic');
let nlp
// const util= require('util');
(async () => {
	const dock = await dockStart({ use: ['Basic'] });
	//   console.log(util.inspect(dock,true,10));
	nlp = dock.get('nlp');
	await nlp.addCorpus('./corpus.json');
	await nlp.train();
})();
const client = new Client(
	{
		intents:
			[Intents.FLAGS.GUILDS,
			Intents.FLAGS.GUILD_MESSAGES]
	})
client.once('ready', () => {
	console.log("I am ready");
});
const prefix = '!';
client.on('messageCreate', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;
	const args = message.content.slice(prefix.length).slice(/ +/);
	const arg = args.toLowerCase();
	console.log(arg);
	if (arg) {
		(async () => {
			const response = await nlp.process('en', arg);
			console.log('start to process')
			message.reply({
				content: response["answers"][Math.floor(response["answers"].length * Math.random())]["answer"]
			})
		})();
	}
});

client.login(`${process.env.BOT_TOKEN}`);







//save for later
// const ffmpeg = require('ffmpeg');
// const SpotifyAPI = require('spotify-web-api-node');
// const mySpotify = new SpotifyAPI({
// 	clientId: process.env.SPOTIFY_CLIENT_ID,
// 	clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
// })
// mySpotify.setAccessToken(process.env.);
// mySpotify.getArtistAlbums('43ZHCT0cAZBISjO8DG9PnE').then(
// 	function (data) {
// 		console.log('Artist albums', data.body);
// 	},
// 	function (err) {
// 		console.error(err);
// 	}
// );