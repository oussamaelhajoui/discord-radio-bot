"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var discord_js_1 = require("discord.js");
var radio_1 = require("./commands/radio");
var config = {
    prefix: "_"
};
// Create an instance of a Discord client
var client = new discord_js_1["default"].Client();
// The token of your bot - https://discordapp.com/developers/applications/me
var token = 'NjMzNDAwNzU1MTc2NDcyNTg1.XaTang.KAyeteEv69y3UKaQ_sa2flVqPAk';
var voiceChannelState = false;
client.on('ready', function () {
    console.log('I am ready!');
    client.user.setActivity('Kapot maken', { type: 'PLAYING' }).then(function (r) { return console.log('ready', r); });
});
client.on("presenceUpdate", function (oldMember, newMember) {
    if (oldMember.presence.status !== newMember.presence.status && (newMember.presence.status === "online" || newMember.presence.status === "offline")) {
        console.log('Presence Update', {
            id: newMember.id,
            status: newMember.presence.status
        });
    }
});
// Create an event listener for messages
client.on('message', function (message) { return __awaiter(void 0, void 0, void 0, function () {
    var args, command;
    return __generator(this, function (_a) {
        if (message.author.bot)
            return [2 /*return*/];
        if (message === null)
            return [2 /*return*/];
        // Only ftn related commands in #fortnite-bot text-channel
        // Check if message starts with our prefix
        if (message.content.indexOf(config.prefix) !== 0)
            return [2 /*return*/];
        args = message.content.slice(config.prefix.length).trim().split(/ +/g);
        command = "";
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
        return [2 /*return*/];
    });
}); });
client.login(token);
function PruneCommand(message, args) {
    if (message.member.roles.find("name", "Mod")) {
        var amount = parseInt(args[0]);
        if (!isNaN(amount) && amount <= 50) {
            message.channel.fetchMessages({ limit: (amount + 1) })
                .then(function (messages) {
                message.channel.send(":bomb: **Removing** " + amount + "** " + (amount > 1 ? 'messages' : 'message') + ". (Self destruct in 5 seconds)**")
                    .then(function (message) {
                    message["delete"](5000);
                });
                messages.forEach(function (message) {
                    message["delete"]();
                });
            })["catch"](function (err) { return message.channel.send(err); });
        }
    }
    else {
        message.channel.send(':octagonal_sign: **No permission.**')
            .then(function (message) {
            message["delete"](5000);
        });
    }
}
function radioCommand(message, args) {
    radio_1["default"](message, args, voiceChannelState);
    message["delete"]();
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
