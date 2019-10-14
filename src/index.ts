import Discord from 'discord.js';
import RadioCommand from './commands/radio';

const config = {
    prefix: "_"
};

// Create an instance of a Discord client
const client = new Discord.Client();

// The token of your bot - https://discordapp.com/developers/applications/me
const token = 'NjMzNDAwNzU1MTc2NDcyNTg1.XaTang.KAyeteEv69y3UKaQ_sa2flVqPAk';


let voiceChannelState = false;

client.on('ready', () => {
    console.log('I am ready!');
    client.user!.setActivity(
        'Kapot maken',
        { type: 'PLAYING' }
    ).then((r:any) => console.log('ready', r));
} );

client.on("presenceUpdate", (oldMember: Discord.GuildMember, newMember: Discord.GuildMember) => {
    if (oldMember.presence.status !== newMember.presence.status && (newMember.presence.status === "online" || newMember.presence.status === "offline")) {
        console.log('Presence Update', {
            id: newMember.id,
            status: newMember.presence.status
        });
    }
});

// Create an event listener for messages
client.on('message', async message => {

    if (message.author!.bot) return;
    if(message === null) return ;
    // Only ftn related commands in #fortnite-bot text-channel

    // Check if message starts with our prefix
    if (message.content.indexOf(config.prefix) !== 0) return;

    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);

    let command = "";

    command = args.shift().toLowerCase();
    switch (command) {
        case "radio":
            radioCommand(message, args);
            break;
        case "prune":
            PruneCommand(message, args);
            break;

        default:
            break;
    }
});

client.login(token);

function PruneCommand(message: Discord.Message , args: string[]) {
    if (message.member.roles.find("name", "Mod")) {
        var amount = parseInt(args[0]);
        if (!isNaN(amount) && amount <= 50) {
            message.channel.fetchMessages({ limit: (amount + 1) })
                .then((messages) => {
                    message.channel.send(`:bomb: **Removing** ${amount}** ${amount > 1 ? 'messages' : 'message'}. (Self destruct in 5 seconds)**`)
                        .then((message:any) => {
                            message.delete(5000);
                        })
                    messages.forEach(message => {
                        message.delete();
                    });
                })
                .catch(err => message.channel.send(err));
        }
    } else {
        message.channel.send(':octagonal_sign: **No permission.**')
            .then((message:any) => {
                message.delete(5000);
            })
    }

}

function radioCommand(message: Discord.Message, args: string[]) {
    RadioCommand(message,  args, voiceChannelState);
    message.delete();
}



// function GetStatsBr(username, platform, message) {
//     let fortnitetrackerURL = platform == "ps4" ? `https://fortnitetracker.com/profile/psn/${username}` : `https://fortnitetracker.com/profile/${platform}/${username}`;
//     fortniteAPI.getStatsBR(username, platform)
//         .then((stats) => {
//             message.channel.send({
//                 embed: {
//                     color: 15343655,
//                     title: "Click here for full stats of " + username,
//                     url: fortnitetrackerURL,
//                     thumbnail: {
//                         url: client.user.avatarURL
//                     },
//                     fields: [
//                         {
//                             name: "K/D",
//                             value: stats.lifetimeStats["k/d"],
//                             inline: true
//                         },
//                         {
//                             name: "Win %",
//                             value: stats.lifetimeStats["win%"],
//                             inline: true
//                         },
//                         {
//                             name: "Wins",
//                             value: stats.lifetimeStats["wins"],
//                             inline: true
//                         },
//                         {
//                             name: "Matches",
//                             value: stats.lifetimeStats["matches"],
//                             inline: true
//                         },
//                         {
//                             name: "Kills",
//                             value: stats.lifetimeStats["kills"],
//                             inline: true
//                         },
//                         {
//                             name: "Time played",
//                             value: stats.lifetimeStats["timePlayed"],
//                             inline: true
//                         }]
//                 }
//             });
//         })
//         .catch((err) => {
//             message.channel.send(err);
//         });
// }
