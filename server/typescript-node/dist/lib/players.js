"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sortLeaderboard = exports.updateLeaderboard = exports.removePlayers = void 0;
function removePlayers(players, id) {
    const updatedPlayers = players.filter((player) => {
        if (player.id === id)
            console.log(`${player.name} has been removed.`);
        return player.id !== id;
    });
    return updatedPlayers;
}
exports.removePlayers = removePlayers;
function updateLeaderboard(players, targetUser) {
    players.forEach((player) => {
        if (player.id === targetUser.id)
            player.score = targetUser.score;
    });
    const updatedLeaderboard = sortLeaderboard(players);
    return updatedLeaderboard;
}
exports.updateLeaderboard = updateLeaderboard;
function sortLeaderboard(players) {
    const leaderboard = players;
    leaderboard
        .sort(function (a, b) {
        return a.score - b.score;
    })
        .reverse();
    return leaderboard;
}
exports.sortLeaderboard = sortLeaderboard;
