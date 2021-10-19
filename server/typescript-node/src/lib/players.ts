import { Player } from "../interfaces/player.interface";
import { v4 as uuidv4 } from "uuid";

export function addPlayer(players: Player[], name: string) {
  players.push({
    name: name,
    score: 0,
    id: uuidv4(),
  });
  console.log(`${name} is connected. Total of ${players.length}`);
  return players;
}

export function updatePlayers(players: Player[], id: string) {
  const updatedPlayers = players.filter((player) => {
    if (player.id !== id) console.log(`${player.name} has been removed.`);
    return player.id !== id;
  });

  console.log(updatedPlayers);

  return updatedPlayers;
}

export function updateScore(players: Player[], id: string, score: number) {
  const updatedScores = players.forEach((player) => {
    if (player.id === id) player.score += score;
  });

  return updatedScores;
}

export function getLeaderboard(players: Player[]) {
  var lb = players.slice(0);
  lb.sort(function (a, b) {
    return a.score - b.score;
  });
  console.log("leaderBoard:");
  console.log(lb);
  // for (var player in players){
  //   lb.push([player,players.player]);
  // }
  // lb.sort(function(a, b) {
  //   return a[1] - b[1];
  //       players.forEach((player) => {
  //       })
}
