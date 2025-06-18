export function nameToPattern(str: string): string {
  const patterns = [
    "mask-[url('/patterns/beams.svg')]",
    "mask-[url('/patterns/bevel.svg')]",
    "mask-[url('/patterns/diamonds.svg')]",
    "mask-[url('/patterns/squares.svg')]",
  ];
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }
  return patterns[Math.abs(hash) % patterns.length]!;
}
