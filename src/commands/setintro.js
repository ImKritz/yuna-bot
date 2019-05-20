const Command = require('../command.js');

function setIntro(intro){
	this.bot.database.ref(`bot/${msg.guild.id}/users/${msg.author.id}`).child('intro').setValue(intro);
}

module.exports = class SetIntroCommand extends Command{
	constructor(bot){
		super(bot, {
			name: 'setintro',
			alias: [
				'setwho'
			],
			usage: '<Description>',
			options: [
			],
			description: 'Sets what people see when they use the /info command on you',
		});
	}

	//Access
	hasPermission(msg){
		return msg.member.hasPermission("CREATE_INSTANT_INVITE");
	}

	function 

	process(msg, suffix){
		const oldInfo = this.bot.database.ref(`bot/${msg.guild.id}/users/${msg.author.id}`);
		
		var oldIntro = "None";

		//
		var newData = {};
		var dataIntro = suffix;
		var dataLink = "";

		oldInfo.once('value', function(snapshot){
			if(snapshot.exist()){
				oldData = snapshot.val();

				newData['link'] = oldData.link;
				newData['intro'] = oldData.intro;
			}
			setIntro(oldData.intro);
		});

		return 'Successful setted a new intro';
	}
}