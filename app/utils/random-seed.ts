export function randomSeed(): string {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
}

export function avatarUrl(seed: string): string {
  return `https://api.dicebear.com/9.x/bottts-neutral/svg?seed=${seed}`;
}
