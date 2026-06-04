// Server component. Fetches each metric in parallel with Next ISR. Falls back
// to the editor-set `fallback` string on upstream failure (or hides the metric
// if no fallback is set). The whole section renders nothing if every metric
// resolves to "no value" — better than showing a half-empty grid.

type Metric = {
  label?: string;
  source?: "github" | "npm" | "static";
  githubRepo?: string;
  githubMetric?: "stars" | "forks" | "openIssues" | "watchers";
  npmPackage?: string;
  npmMetric?: "weekly" | "monthly";
  staticValue?: string;
  suffix?: string;
  fallback?: string;
};

type Props = {
  s: {
    eyebrow?: string;
    headline?: string;
    intro?: string;
    layout?: "grid-2" | "grid-3" | "grid-4";
    metrics?: Metric[];
    revalidateSeconds?: number;
    showAsOf?: boolean;
  };
};

const GITHUB_FIELD: Record<NonNullable<Metric["githubMetric"]>, string> = {
  stars: "stargazers_count",
  forks: "forks_count",
  openIssues: "open_issues_count",
  watchers: "subscribers_count",
};

async function fetchGithubMetric(
  repo: string,
  metric: NonNullable<Metric["githubMetric"]>,
  revalidate: number,
): Promise<number> {
  const res = await fetch(`https://api.github.com/repos/${repo}`, {
    headers: { Accept: "application/vnd.github+json" },
    next: { revalidate, tags: ["live-stats"] },
  });
  if (!res.ok) throw new Error(`GitHub ${res.status}: ${repo}`);
  const data = (await res.json()) as Record<string, unknown>;
  const value = data[GITHUB_FIELD[metric]];
  if (typeof value !== "number") {
    throw new Error(`GitHub field ${GITHUB_FIELD[metric]} missing on ${repo}`);
  }
  return value;
}

async function fetchNpmMetric(
  pkg: string,
  metric: NonNullable<Metric["npmMetric"]>,
  revalidate: number,
): Promise<number> {
  const period = metric === "monthly" ? "last-month" : "last-week";
  const res = await fetch(
    `https://api.npmjs.org/downloads/point/${period}/${encodeURIComponent(pkg)}`,
    { next: { revalidate, tags: ["live-stats"] } },
  );
  if (!res.ok) throw new Error(`npm ${res.status}: ${pkg}`);
  const data = (await res.json()) as { downloads?: number };
  if (typeof data.downloads !== "number") {
    throw new Error(`npm downloads missing for ${pkg}`);
  }
  return data.downloads;
}

const compact = new Intl.NumberFormat("en", {
  notation: "compact",
  maximumFractionDigits: 1,
});

const formatNumber = (n: number) => (n >= 10000 ? compact.format(n) : n.toLocaleString("en"));

type Resolved = { label: string; value: string; stale: boolean };

async function resolveMetric(
  m: Metric,
  defaultRevalidate: number,
): Promise<Resolved | null> {
  const label = m.label ?? "";
  const suffix = m.suffix ?? "";
  try {
    if (m.source === "static") {
      if (!m.staticValue) return null;
      return { label, value: `${m.staticValue}${suffix}`, stale: false };
    }
    if (m.source === "github" && m.githubRepo) {
      const n = await fetchGithubMetric(
        m.githubRepo,
        m.githubMetric ?? "stars",
        defaultRevalidate,
      );
      return { label, value: `${formatNumber(n)}${suffix}`, stale: false };
    }
    if (m.source === "npm" && m.npmPackage) {
      const n = await fetchNpmMetric(
        m.npmPackage,
        m.npmMetric ?? "weekly",
        defaultRevalidate,
      );
      return { label, value: `${formatNumber(n)}${suffix}`, stale: false };
    }
    throw new Error("Metric is missing required source config");
  } catch {
    if (m.fallback) return { label, value: `${m.fallback}${suffix}`, stale: true };
    return null;
  }
}

export async function LiveStatsBlock({ s }: Props) {
  const metrics = s.metrics ?? [];
  if (metrics.length === 0) return null;
  const revalidate = Math.max(60, s.revalidateSeconds ?? 3600);

  const resolved = (
    await Promise.all(metrics.map((m) => resolveMetric(m, revalidate)))
  ).filter((r): r is Resolved => r !== null);

  if (resolved.length === 0) return null;

  const cols = s.layout ?? "grid-3";
  const colsClass =
    cols === "grid-2"
      ? "md:grid-cols-2"
      : cols === "grid-4"
        ? "md:grid-cols-2 lg:grid-cols-4"
        : "md:grid-cols-3";

  const anyStale = resolved.some((r) => r.stale);
  const asOfLabel = new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date());

  return (
    <section className="py-20 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        {!!s.eyebrow && (
          <div className="font-mono text-xs uppercase tracking-widest text-orange-500 mb-2 text-center">
            {s.eyebrow}
          </div>
        )}
        {!!s.headline && (
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            {s.headline}
          </h2>
        )}
        {!!s.intro && (
          <p className="text-neutral-400 text-center max-w-2xl mx-auto mb-12">
            {s.intro}
          </p>
        )}
        <div className={`grid gap-6 ${colsClass}`}>
          {resolved.map((r, i) => (
            <div
              key={i}
              className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-8 text-center"
            >
              <div className="text-4xl md:text-5xl font-bold tracking-tight text-orange-400 mb-2">
                {r.value}
              </div>
              <div className="text-sm uppercase tracking-widest text-neutral-400">
                {r.label}
              </div>
            </div>
          ))}
        </div>
        {s.showAsOf !== false && (
          <div className="mt-6 text-center text-xs text-neutral-500 font-mono">
            {anyStale ? "Cached values · " : "As of "}
            {asOfLabel}
          </div>
        )}
      </div>
    </section>
  );
}
