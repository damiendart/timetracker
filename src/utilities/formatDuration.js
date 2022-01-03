// Copyright (c) 2022 Damien Dart, <damiendart@pobox.com>.
// This file is distributed under the MIT licence. For more information,
// please refer to the accompanying "LICENCE" file.

function formatDuration (duration) {
  const hours = Math.floor(duration / 3600).toString().padStart(2, '0');
  const minutes = Math.floor(duration % 3600 / 60).toString().padStart(2, '0');
  const seconds = Math.floor(duration % 60).toString().padStart(2, '0');

  return `${hours}:${minutes}:${seconds}`;
}

export default formatDuration;
