import { Player } from "../interfaces/player.interface";
import { v4 as uuidv4 } from "uuid";

export function addPlayer(updatedPlayers: Player[], name: string) {
  const id = uuidv4();
  updatedPlayers.push({
    name: name,
    score: 0,
    id: id,
  });
  console.log(`${name} is connected. Total of ${updatedPlayers.length}`);
  return updatedPlayers;
}

export function updatePlayers(players: Player[], id: string) {
  const updatedPlayers = players.filter((player) => {
    if (player.id !== id) console.log(`${player.name} has been removed.`);
    return player.id !== id;
  });

  console.log(updatedPlayers);

  return updatedPlayers;
}

export function getClientById(players: Player[], id: string) {
  const player = players.forEach((player) => {
    if (player.id === id) return player;
  });
  return player;
}

export function updateLeaderboard(players: Player[], targetPlayer: Player) {
  players.forEach((player) => {
    if (player.id === targetPlayer.id) player.score += targetPlayer.score;
  });

  const updatedLeaderboard = sortLeaderboard(players);
  return updatedLeaderboard;
}

export function sortLeaderboard(players: Player[]) {
  var leaderboard = players.slice(0);
  leaderboard.sort(function (a, b) {
    return a.score - b.score;
  });

  return leaderboard;
}
