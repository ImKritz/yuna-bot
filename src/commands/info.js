const Command = require('../command.js');

module.exports = class InfoCommand extends Command{
	constructor(bot){
		super(bot, {
			name: 'info',
			alias: [
			],
			usage: '<@Username>',
			options: [
			],
			description: 'Gives complete infomation about you or another user',
		});
	}

	//Access
	hasPermission(msg){
		return true;
	}

	process(msg, suffix){
		var user = msg.mentions.users.first();
		if (user == null) user = msg.author;
		//this.bot.database.ref(`bot/${msg.guild.id}/events`)
		var data = this.bot.database.ref(`bot/${msg.guild.id}/users/${user.id}`);
		/*
		data.once('value', function(snapshot){
			if(!snapshot.hasChild(user.id)){
				this.bot.database.ref(`bot/${msg.guild.id}/users/${user.id}`).set({
					link: '',
					intro: 'None'
				});
			}
		});
		*/

		data.once('value', function(snapshot){
			var introduction = "None";
			var link = "https://www.youtube.com/";
			
			if (snapshot.exists()){
				var snapValue = snapshot.val();

				introduction = snapValue.intro;
				link = snapValue.link;
			}

			/*
			if (snapshot.exists() == false){
				msg.reply("OKay");
				this.bot.database.ref(`bot/${msg.guild.id}/users/${user.id}`).set({
					link: "",
					intro: "",
				});
			}
			*/
			
			msg.channel.send("", {embed: {
				color: 3447003,
				author: {
					name: user.username
				},
				description: introduction,
				url: link,
				thumbnail: {
					url: user.avatarURL
				},
				footer: {
					text: 'Reputation: 0'
				}
			}});
			
		});

		msg.delete();
		return;
	}
}
