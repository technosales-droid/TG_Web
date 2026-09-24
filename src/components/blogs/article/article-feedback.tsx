"use client";

import { useId, useState, type FormEvent } from "react";
import { MessageCircle, Star } from "lucide-react";
import { useAccess } from "@/components/access/access-provider";
import { addComment, addReview, LIMITS, useBlogFeedback, type Comment } from "@/lib/blog-feedback";
import { cn } from "cn";

const FOCUS = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";
const FIELD = "w-full rounded-xl border border-primary/15 bg-background px-3.5 py-2.5 text-base text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:outline-2 focus-visible:outline-primary/30";
const TONES = ["bg-primary/15 text-primary", "bg-brand-sky/20 text-[#0a4a66]", "bg-[#0b3d50]/15 text-[#0b3d50]"];

const when = (t: number) => new Date(t).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

function Avatar({ name, size = "md" }: { name: string; size?: "sm" | "md" }) {
  const initial = (name.trim()[0] ?? "?").toUpperCase();
  const tone = TONES[[...name].reduce((n, c) => n + c.charCodeAt(0), 0) % TONES.length];
  return (
    <span aria-hidden="true" className={cn("flex shrink-0 items-center justify-center rounded-full font-semibold", tone, size === "md" ? "size-11 text-base" : "size-8 text-sm")}>
      {initial}
    </span>
  );
}

function Stars({ value, className }: { value: number; className?: string }) {
  return (
    <span role="img" aria-label={`${value} out of 5 stars`} className={cn("inline-flex gap-0.5", className)}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Star key={n} aria-hidden="true" className={cn("size-4", n <= value ? "fill-amber-400 text-amber-400" : "text-primary/25")} />
      ))}
    </span>
  );
}

function Empty({ icon: Icon, title, text }: { icon: typeof Star; title: string; text: string }) {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-dashed border-primary/20 px-6 py-8 text-center">
      <Icon className="size-6 text-primary/60" aria-hidden="true" />
      <p className="mt-2 font-semibold text-foreground">{title}</p>
      <p className="mt-1 max-w-md text-sm text-muted-foreground">{text}</p>
    </div>
  );
}

/** Collapsed "Share your thoughts" bar that opens into a compact composer. */
function Composer({
  placeholder,
  limit,
  submitLabel,
  rating,
  autoFocus,
  author,
  beforeOpen,
  onSignOut,
  onSubmit,
  onCancel,
}: {
  placeholder: string;
  limit: number;
  submitLabel: string;
  rating?: boolean;
  autoFocus?: boolean;
  /** First name of the signed-in visitor. Posting always uses it; there is no name field. */
  author: string;
  /** Runs before the composer opens: sends a visitor without an access profile through the AccessGate. */
  beforeOpen?: () => Promise<boolean>;
  onSignOut?: () => void;
  onSubmit: (v: { name: string; text: string; rating: number }) => void;
  onCancel?: () => void;
}) {
  const uid = useId();
  const [open, setOpen] = useState(Boolean(autoFocus));
  const [text, setText] = useState("");
  const [stars, setStars] = useState(0);
  const [error, setError] = useState("");

  const reset = () => {
    setOpen(false);
    setText("");
    setStars(0);
    setError("");
    onCancel?.();
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!author) return setError("Please continue with your access profile to post.");
    if (rating && !stars) return setError("Please choose a star rating.");
    if (text.trim().length < 5) return setError("Please write a little more.");
    onSubmit({ name: author, text: text.trim(), rating: stars });
    reset();
  };

  if (!open) {
    return (
      <button
        type="button"
        onClick={async () => {
          if (!beforeOpen || (await beforeOpen())) setOpen(true);
        }}
        className={cn("flex w-full items-center gap-3 rounded-2xl border border-primary/15 bg-card p-3 text-left transition-colors hover:bg-muted", FOCUS)}
      >
        <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-muted text-primary" aria-hidden="true">
          <MessageCircle className="size-5" />
        </span>
        <span className="text-base text-muted-foreground">{placeholder}</span>
      </button>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-3 rounded-2xl border border-primary/20 bg-card p-4 sm:p-5" noValidate>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">
          Posting as <span className="font-semibold text-foreground">{author}</span>
          {onSignOut && (
            <>
              {" "}
              &middot;{" "}
              <button type="button" onClick={onSignOut} className={cn("rounded font-medium text-primary underline underline-offset-2", FOCUS)}>Not you?</button>
            </>
          )}
        </p>
        {rating && (
          <fieldset className="flex items-center gap-1">
            <legend className="sr-only">Your rating</legend>
            {[1, 2, 3, 4, 5].map((n) => (
              <label key={n} className="cursor-pointer rounded-md p-1 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-primary">
                <input type="radio" name={`${uid}-rating`} value={n} checked={stars === n} onChange={() => setStars(n)} className="sr-only" />
                <Star className={cn("size-6 transition-colors", n <= stars ? "fill-amber-400 text-amber-400" : "text-primary/30")} aria-hidden="true" />
                <span className="sr-only">{n} star{n > 1 ? "s" : ""}</span>
              </label>
            ))}
          </fieldset>
        )}
      </div>
      <label htmlFor={`${uid}-text`} className="sr-only">{placeholder}</label>
      <textarea id={`${uid}-text`} value={text} onChange={(e) => setText(e.target.value)} maxLength={limit} rows={3} autoFocus={autoFocus || undefined} placeholder={placeholder} className={cn(FIELD, "resize-y")} />
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p role="alert" className="min-h-5 text-sm text-destructive">{error}</p>
        <div className="flex gap-2">
          <button type="button" onClick={reset} className={cn("min-h-10 rounded-full px-4 text-sm font-medium text-muted-foreground hover:bg-muted", FOCUS)}>Cancel</button>
          <button type="submit" className={cn("min-h-10 rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground hover:bg-primary/90", FOCUS)}>{submitLabel}</button>
        </div>
      </div>
    </form>
  );
}

function CommentItem({ c, replies, onReply, replying, onDone, slug, author }: {
  author: string;
  c: Comment;
  replies: Comment[];
  onReply: () => void | Promise<void>;
  replying: boolean;
  onDone: () => void;
  slug: string;
}) {
  return (
    <li className="flex gap-3">
      <Avatar name={c.name} />
      <div className="min-w-0 flex-1">
        <div className="rounded-2xl bg-muted/70 px-4 py-3">
          <p className="text-sm font-semibold text-foreground">{c.name}</p>
          <p className="mt-0.5 break-words whitespace-pre-line text-base leading-relaxed text-foreground/90">{c.text}</p>
        </div>
        <div className="mt-1 flex items-center gap-3 pl-2 text-xs text-muted-foreground">
          <time dateTime={new Date(c.createdAt).toISOString()}>{when(c.createdAt)}</time>
          <button type="button" onClick={onReply} className={cn("min-h-8 rounded-md font-semibold hover:text-foreground", FOCUS)}>Reply</button>
        </div>
        {(replies.length > 0 || replying) && (
          <div className="mt-3 space-y-3">
            {replies.map((r) => (
              <div key={r.id} className="flex gap-2.5">
                <Avatar name={r.name} size="sm" />
                <div className="min-w-0 flex-1">
                  <div className="rounded-2xl bg-muted/70 px-3.5 py-2.5">
                    <p className="text-sm font-semibold text-foreground">{r.name}</p>
                    <p className="mt-0.5 break-words whitespace-pre-line text-[0.9375rem] leading-relaxed text-foreground/90">{r.text}</p>
                  </div>
                  <time dateTime={new Date(r.createdAt).toISOString()} className="mt-1 block pl-2 text-xs text-muted-foreground">{when(r.createdAt)}</time>
                </div>
              </div>
            ))}
            {replying && (
              <Composer
                autoFocus
                author={author}
                placeholder={`Reply to ${c.name}...`}
                limit={LIMITS.comment}
                submitLabel="Reply"
                onSubmit={(v) => addComment(slug, { name: v.name, text: v.text, parentId: c.id })}
                onCancel={onDone}
              />
            )}
          </div>
        )}
      </div>
    </li>
  );
}

export function ArticleFeedback({ slug }: { slug: string }) {
  const { reviews, comments } = useBlogFeedback(slug);
  const { session, requireAccess, signOut } = useAccess({ load: true });
  const author = session.status === "granted" ? session.displayName : "";
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const top = comments.filter((c) => !c.parentId);
  const repliesOf = (id: string) => comments.filter((c) => c.parentId === id);

  return (
    <>
      <section id="reactions" aria-labelledby="reactions-heading" className="mt-14 scroll-mt-28">
        <h2 id="reactions-heading" className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">Reader reactions</h2>
        <p className="mt-1 text-sm text-muted-foreground">Reactions are saved on this device for now.</p>
        <div className="mt-5 space-y-4">
          <Composer
            rating
            author={author}
            beforeOpen={() => requireAccess({ sourceType: "review", sourceId: slug })}
            onSignOut={author ? signOut : undefined}
            placeholder="Share your thoughts about this article..."
            limit={LIMITS.review}
            submitLabel="Post review"
            onSubmit={(v) => addReview(slug, v)}
          />
          {reviews.length === 0 ? (
            <Empty icon={Star} title="No reactions yet" text="Be the first to say how this article landed." />
          ) : (
            <ul className="space-y-3">
              {reviews.map((r) => (
                <li key={r.id} className="flex gap-3 rounded-2xl border border-primary/10 bg-card p-4">
                  <Avatar name={r.name} />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      <p className="font-semibold text-foreground">{r.name}</p>
                      <Stars value={r.rating} />
                      <time dateTime={new Date(r.createdAt).toISOString()} className="text-xs text-muted-foreground">{when(r.createdAt)}</time>
                    </div>
                    <p className="mt-1.5 break-words whitespace-pre-line leading-relaxed text-foreground/90">{r.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <section id="discussion" aria-labelledby="discussion-heading" className="mt-14 scroll-mt-28">
        <h2 id="discussion-heading" className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">Discussion</h2>
        <div className="mt-5 space-y-5">
          <Composer
            author={author}
            beforeOpen={() => requireAccess({ sourceType: "comment", sourceId: slug })}
            onSignOut={author ? signOut : undefined}
            placeholder="Add a comment..."
            limit={LIMITS.comment}
            submitLabel="Comment"
            onSubmit={(v) => addComment(slug, { name: v.name, text: v.text })}
          />
          {top.length === 0 ? (
            <Empty icon={MessageCircle} title="Start the conversation." text="Ask a question or add what you have learned. Comments are saved on this device for now." />
          ) : (
            <ul className="space-y-5">
              {top.map((c) => (
                <CommentItem
                  key={c.id}
                  c={c}
                  slug={slug}
                  author={author}
                  replies={repliesOf(c.id)}
                  replying={replyTo === c.id}
                  onReply={async () => {
                    if (await requireAccess({ sourceType: "comment", sourceId: slug })) setReplyTo(c.id);
                  }}
                  onDone={() => setReplyTo(null)}
                />
              ))}
            </ul>
          )}
        </div>
      </section>
    </>
  );
}
