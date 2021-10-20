/*
Corpus is from: https://github.com/jesus-seijas-sp/nlpjs-examples/blob/master/01.quickstart/02.filecorpus/corpus-en.json
And a minor edit was made based on it
*/
require('dotenv').config();
const { Client, Intents } = require('discord.js');
const { dockStart } = require('@nlpjs/basic');
let nlp;
// const deploy = require('./deploy');
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
	// deploy();
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
			if (response['answer']) {
				await message.reply({
					content: response["answers"][Math.floor(response["answers"].length * Math.random())]["answer"]
				})
			}else{
				await message.reply({
					content: "Sorry, I am just a 3-day-old baby, I am still learning"
				})
			}
		})();
	}
});
client.login(`${process.env.BOT_TOKEN}`);

// client.on('interactionCreate', async (interaction)=>{
// 	if(!interaction.isCommand()) return;
// 	if(interaction.commandName === 'say'){
// 		const response = await nlp.process('en', interaction.options);
// 		await interaction.reply( {content: response["answers"][Math.floor(response["answers"].length * Math.random())]["answer"]})
// 	}
// });

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