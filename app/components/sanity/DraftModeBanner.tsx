import Link from "next/link";

// Rendered only when next/headers draftMode().isEnabled is true. Gives editors
// a clear "you are previewing unpublished content" cue plus a one-click exit.
export function DraftModeBanner() {
  return (
    <div className="fixed bottom-4 left-1/2 z-[60] -translate-x-1/2 transform">
      <div className="flex items-center gap-3 rounded-full border border-orange-500/40 bg-orange-500/15 px-4 py-2 text-sm text-orange-200 backdrop-blur-md shadow-lg">
        <span className="inline-block h-2 w-2 rounded-full bg-orange-400 animate-pulse" />
        <span className="font-mono uppercase tracking-wider text-xs">
          Draft mode
        </span>
        <Link
          href="/api/draft-mode/disable"
          className="text-xs underline-offset-4 hover:underline"
        >
          Exit preview
        </Link>
      </div>
    </div>
  );
}
