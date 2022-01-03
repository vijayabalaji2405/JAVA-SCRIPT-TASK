'use strict';
const gameEvents = new Map([
  [17, '⚽️ GOAL'],
  [36, '🔁 Substitution'],
  [47, '⚽️ GOAL'],
  [61, '🔁 Substitution'],
  [64, '🔶 Yellow card'],
  [69, '🔴 Red card'],
  [70, '🔁 Substitution'],
  [72, '🔁 Substitution'],
  [76, '⚽️ GOAL'],
  [80, '⚽️ GOAL'],
  [92, '🔶 Yellow card'],
]);
// console.log(...gameEvents.values());
// console.log(gameEvents);
const events = [...new Set(gameEvents.values())];
console.log(events);
gameEvents.delete(64);
const time = [...gameEvents.keys()].pop();
console.log(time);
console.log(
  `An event happened, on average, every ${
    time / gameEvents.size
  } minutes" (keep in mind that a game has 90 minutes`
);
for (const [min, events] of gameEvents) {
  const half = min <= 45 ? `First` : `Second`;

  console.log(`[${half} Half] ${min} : ${events}`);
}
