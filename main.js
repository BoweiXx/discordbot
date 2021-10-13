require('dotenv').config();
const {Client, Intents} = require('discord.js');
const client = new Client({intents: [Intents.FLAGS.GUILDS]});
client.once('ready', ()=>{
  console.log("I am ready")
});

client.login(`${process.env.BOT_TOKEN}`);

client.on('interactionCreate', async interaction =>{
  if (!interaction.isCommand()) return;
	const { commandName } = interaction;
	if (commandName === 'ping') {
		await interaction.reply('Pong!');
	} else if (commandName === 'server') {
		await interaction.reply('This is a testfield for bot');
	} else if (commandName === 'user') {
		await interaction.reply('User info.');
	}
})