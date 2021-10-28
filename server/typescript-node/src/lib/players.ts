import { Player } from "../interfaces/player.interface";

export function addPlayer(
  updatedPlayers: Player[],
  name: string,
  socketId: string
) {
  updatedPlayers.push({
    name: name,
    score: 0,
    id: socketId,
  });
  console.log(`${name} is connected. Total of ${updatedPlayers.length}`);
  return updatedPlayers;
}

export function removePlayers(players: Player[], id: string) {
  const updatedPlayers = players.filter((player) => {
    if (player.id !== id) console.log(`${player.name} has been removed.`);
    return player.id !== id;
  });

  console.log(updatedPlayers);

  return updatedPlayers;
}
export function updateLeaderboard(players: Player[], targetUser: Player) {
  players.forEach((player) => {
    if (player.id === targetUser.id) player.score = targetUser.score;
  });
  const updatedLeaderboard = sortLeaderboard(players);
  return updatedLeaderboard;
}

export function sortLeaderboard(players: Player[]) {
  const leaderboard = players;
  leaderboard
    .sort(function (a, b) {
      return a.score - b.score;
    })
    .reverse();

  return leaderboard;
}
