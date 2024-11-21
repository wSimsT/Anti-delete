import dotenv from 'dotenv'
import { Client, IntentsBitField } from 'discord.js'

dotenv.config()

var listOfSecrets= "";

const client = new Client({
    intents:[
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
        IntentsBitField.Flags.GuildMembers
    ]
})

client.on('ready', (c) => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.login(process.env.DISCORD_TOKEN)

client.on("messageCreate", (message)=>{
    if(message.author.bot){
        return;
    }
    if(message.content.toLowerCase().includes("hello")&&message.content.toLowerCase().includes("anti")){
        message.reply("Sup, "+message.author.username);
    }
    if(message.content.toLowerCase().includes("anti")&&message.content.toLowerCase().includes("repeat")){
        if(listOfSecrets.length===0){
            message.reply("Nothing has been said.");
        } else{
            message.reply(listOfSecrets)
        }
    }
})

client.on("messageDelete", (message)=>{
    listOfSecrets = message.author.globalName+ " said: "+message.content;
})