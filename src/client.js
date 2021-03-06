const Discord = require("discord.js");
const fs = require("fs");
const firebase = require("firebase");
// const twilioClient = require("twilio")(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

const config = {
	apiKey: process.env.FIREBASE_TOKEN,
	authDomain: "yuna-bot7.firebaseapp.com",
	databaseURL: "https://yuna-bot7.firebaseio.com",
	projectId: "yuna-bot7",
	storageBucket: "yuna-bot7.appspot.com",
	messagingSenderId: "930341747568"
};

firebase.initializeApp(config);

module.exports = class YunaClient extends Discord.Client {
	constructor(options = {}){
		super(options);
		this.registry = {};

		this.database = firebase.database();

		this.on("warn", (m) => console.log("[warn]", m));

		//this.on("messageDelete", (msg) => console.log(`[deleted] ${new Date()} ${msg.author.username}: ${msg.content}`));		
	}

	commands(){
		return this.registry;
	}

	/**
	* Loads all the commands and their alias in the Client class
	* @param {array[{string}]} [rawCommands]
	* @return {null}
	*/
	initializeCommands(rawCommands){
		for (let index in rawCommands){
			let command = new rawCommands[index](this);
			this.registry[command.get('name')] = command;

			const alias = command.get('alias');
			for (let i in alias){
				this.registry[alias[i]] = command;
				console.log(alias[i] + ' alias loaded.');
			}
			console.log(command.get('name') + ' command loaded.');
		}
	}
}
