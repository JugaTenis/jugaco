export interface Stats {
  userCount: number;
  friendshipCount: number;
  clubCount: number;
  matchCount: number;
  cityCount: number;
}

export interface BrandStats {
  global: Stats;
  tenis: Stats;
  padel: Stats;
  fetchedAt: Date;
}

const REVALIDATE_SECONDS = 300;

async function fetchStats(origin: string): Promise<Stats> {
  const res = await fetch(`${origin}/api/stats`, {
    next: { revalidate: REVALIDATE_SECONDS },
  });
  const data = await res.json();
  // The platform answers 200 with placeholder numbers when its DB is down.
  if (!res.ok || data.error) throw new Error(`stats unavailable from ${origin}`);
  return data;
}

/**
 * The tennis endpoint counts users, friendships and matches globally (legacy
 * behaviour, all sports), while clubs are tennis-scoped. Padel is scoped in
 * every field. Cities are only reported globally.
 * ponytail: tennis = global − padel overcounts nothing but attributes
 * cross-sport players to tennis; swap for a sport-scoped endpoint if it matters.
 */
export async function getBrandStats(): Promise<BrandStats | null> {
  try {
    const [tennisEndpoint, padel] = await Promise.all([
      fetchStats("https://www.jugatenis.com"),
      fetchStats("https://www.jugapadel.app"),
    ]);
    const global: Stats = {
      ...tennisEndpoint,
      clubCount: tennisEndpoint.clubCount + padel.clubCount,
    };
    const tenis: Stats = {
      userCount: global.userCount - padel.userCount,
      friendshipCount: global.friendshipCount - padel.friendshipCount,
      matchCount: global.matchCount - padel.matchCount,
      clubCount: tennisEndpoint.clubCount,
      cityCount: global.cityCount,
    };
    return { global, tenis, padel, fetchedAt: new Date() };
  } catch (error) {
    console.error(error);
    return null;
  }
}

export const formatCount = (n: number) => n.toLocaleString("es-AR");
