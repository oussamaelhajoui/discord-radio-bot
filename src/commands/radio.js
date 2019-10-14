"use strict";
exports.__esModule = true;
var RadioCommand = function (message, args, voiceChannelState) {
    if (args[0] == undefined)
        return;
    var streamURL = "";
    switch (args[0]) {
        case "slam":
            streamURL = "https://21253.live.streamtheworld.com/SLAM_MP3_SC?";
            break;
        case "538":
            streamURL = "http://playerservices.streamtheworld.com/api/livestream-redirect/RADIO538";
        case "3fm":
            streamURL = "http://icecast.omroep.nl/3fm-bb-mp3";
            break;
        case "qmusic":
            streamURL = "http://icecast-qmusicnl-cdp.triple-it.nl/Qmusic_nl_live_96.mp3";
            break;
        default:
            streamURL = args[0];
            break;
    }
    var voiceChannel;
    if (message != null)
        voiceChannel = message.member.voiceChannel;
    voiceChannel.join()
        .then(function (connection) {
        // @ts-ignore
        var dispatcher = connection.playStream(streamURL);
        voiceChannelState = true;
        if (message != null)
            message.channel.send(":notes: Now playing " + args[0] + ".");
        dispatcher.on("end", function (end) {
        });
    })["catch"](function (err) { return console.log(err); });
};
exports["default"] = RadioCommand;
