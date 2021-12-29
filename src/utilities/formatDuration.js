function formatDuration (duration) {
  const hours = Math.floor(duration / 3600).toString().padStart(2, '0');
  const minutes = Math.floor(duration % 3600 / 60).toString().padStart(2, '0');
  const seconds = Math.floor(duration % 60).toString().padStart(2, '0');

  return `${hours}:${minutes}:${seconds}`;
}

export default formatDuration;
