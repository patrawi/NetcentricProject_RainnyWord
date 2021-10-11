export function startCountdown(timeLeft: number) {
  setTimeout(() => {
    return timeLeft--;
  }, 1000);
}
