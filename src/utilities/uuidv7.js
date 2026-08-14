// Copyright (C) Damien Dart, <damiendart@pobox.com>.
// This file is distributed under the MIT licence. For more information,
// please refer to the accompanying "LICENCE" file.

// As Time Tracker can be run in insecure contexts, the availability of
// "crypto.randomUUID()" cannot be guaranteed, hence the homemade UUIDv7
// implementation (based on <https://antonz.org/uuidv7/#javascript>).
// This implementation does not guaranteed monotonicity when multiple
// UUIDs are generated within the same millisecond.

export default function uuidv7() {
  const timestamp = BigInt(Date.now());
  const value = new Uint8Array(16);

  crypto.getRandomValues(value);

  value[0] = Number((timestamp >> 40n) & 0xffn);
  value[1] = Number((timestamp >> 32n) & 0xffn);
  value[2] = Number((timestamp >> 24n) & 0xffn);
  value[3] = Number((timestamp >> 16n) & 0xffn);
  value[4] = Number((timestamp >> 8n) & 0xffn);
  value[5] = Number(timestamp & 0xffn);
  value[6] = (value[6] & 0x0f) | 0x70;
  value[8] = (value[8] & 0x3f) | 0x80;

  return Array.from(value)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}
