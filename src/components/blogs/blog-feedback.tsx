"use client";

import { useId, useState } from "react";
import { MessageSquare, Star } from "lucide-react";
import { cn } from "cn";
import { LIMITS, submitComment, submitReview, useBlogFeedback } from "@/lib/blog-feedback";

const FIELD =
  "w-full rounded-xl border border-primary/20 bg-background px-4 py-3 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";
const SUBMIT =
  "inline-flex min-h-11 items-center justify-center rounded-full bg-primary px-6 text-base font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

const dateOf = (iso: string) =>
  iso ? new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "";

function Stars({ value, className }: { value: number; className?: string }) {
  return (
    <span className={cn("inline-flex gap-0.5", className)} role="img" aria-label={`Rated ${value} out of 5`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          aria-hidden="true"
          className={cn("size-4", n <= Math.round(value) ? "fill-amber-400 text-amber-400" : "fill-transparent text-foreground/25")}
        />
      ))}
    </span>
  );
}

function StarInput({ value, onChange }: { value: number; onChange: (n: number) => void }) {
  const name = useId();
  const [hover, setHover] = useState(0);
  const shown = hover || value;
  return (
    <fieldset>
      <legend className="mb-2 text-sm font-semibold text-foreground">Your rating</legend>
      <div className="flex gap-1" onMouseLeave={() => setHover(0)}>
        {[1, 2, 3, 4, 5].map((n) => (
          <label key={n} className="cursor-pointer" onMouseEnter={() => setHover(n)}>
            <input
              type="radio"
              name={name}
              value={n}
              checked={value === n}
              onChange={() => onChange(n)}
              className="peer sr-only"
            />
            <span className="sr-only">{n} out of 5</span>
            <Star
              aria-hidden="true"
              className={cn(
                "size-8 rounded transition-colors peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-primary",
                n <= shown ? "fill-amber-400 text-amber-400" : "fill-transparent text-foreground/25"
              )}
            />
          </label>
        ))}
      </div>
    </fieldset>
  );
}

function ReviewForm({
  slug,
  initial,
  saved,
  onSaved,
}: {
  slug: string;
  initial?: { name: string; rating: number; text: string };
  saved: boolean;
  onSaved: () => void;
}) {
  const [name, setName] = useState(initial?.name ?? "");
  const [rating, setRating] = useState(initial?.rating ?? 0);
  const [text, setText] = useState(initial?.text ?? "");
  const [error, setError] = useState("");
  const editing = Boolean(initial);

  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        if (!rating) return setError("Please choose a star rating.");
        if (!name.trim()) return setError("Please enter your name.");
        setError("");
        submitReview(slug, { name, rating, text });
        onSaved();
      }}
      className="grid gap-4"
    >
      <StarInput value={rating} onChange={setRating} />
      <div>
        <label htmlFor={`${slug}-review-name`} className="mb-2 block text-sm font-semibold text-foreground">
          Name
        </label>
        <input
          id={`${slug}-review-name`}
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={LIMITS.name}
          autoComplete="name"
          className={FIELD}
        />
      </div>
      <div>
        <label htmlFor={`${slug}-review-text`} className="mb-2 block text-sm font-semibold text-foreground">
          Review <span className="font-normal text-muted-foreground">(optional)</span>
        </label>
        <textarea
          id={`${slug}-review-text`}
          value={text}
          onChange={(e) => setText(e.target.value)}
          maxLength={LIMITS.review}
          rows={4}
          placeholder="What did you think of this article?"
          className={FIELD}
        />
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <button type="submit" className={SUBMIT}>
          {editing ? "Update review" : "Submit review"}
        </button>
        <p role="status" className={cn("text-sm", error ? "text-red-600" : "text-brand-green")}>
          {error || (saved ? "Thanks — your review has been saved." : "")}
        </p>
      </div>
    </form>
  );
}

function CommentForm({ slug }: { slug: string }) {
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        if (!name.trim()) return setError("Please enter your name.");
        if (!text.trim()) return setError("Please write a comment.");
        setError("");
        submitComment(slug, { name, text });
        setText("");
        setSaved(true);
      }}
      className="grid gap-4"
    >
      <div>
        <label htmlFor={`${slug}-comment-name`} className="mb-2 block text-sm font-semibold text-foreground">
          Name
        </label>
        <input
          id={`${slug}-comment-name`}
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={LIMITS.name}
          autoComplete="name"
          className={FIELD}
        />
      </div>
      <div>
        <label htmlFor={`${slug}-comment-text`} className="mb-2 block text-sm font-semibold text-foreground">
          Comment
        </label>
        <textarea
          id={`${slug}-comment-text`}
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            setSaved(false);
          }}
          maxLength={LIMITS.comment}
          rows={4}
          placeholder="Join the conversation…"
          className={FIELD}
        />
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <button type="submit" className={SUBMIT}>
          Post comment
        </button>
        <p role="status" className={cn("text-sm", error ? "text-red-600" : "text-brand-green")}>
          {error || (saved ? "Comment posted." : "")}
        </p>
      </div>
    </form>
  );
}

const initialOf = (name: string) => name.trim().charAt(0).toUpperCase() || "?";

function Avatar({ name }: { name: string }) {
  return (
    <span aria-hidden="true" className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
      {initialOf(name)}
    </span>
  );
}

export function BlogFeedback({ slug }: { slug: string }) {
  const { reviews, comments, myReviewId } = useBlogFeedback(slug);
  const [reviewSaved, setReviewSaved] = useState(false);
  const mine = reviews.find((r) => r.id === myReviewId);
  const average = reviews.length ? reviews.reduce((n, r) => n + r.rating, 0) / reviews.length : 0;

  return (
    <div className="grid gap-12">
      <section aria-labelledby="reviews-heading">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 id="reviews-heading" className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Reviews
          </h2>
          {reviews.length > 0 && (
            <p className="flex items-center gap-3 text-sm text-muted-foreground">
              <Stars value={average} />
              <span>
                <span className="font-semibold text-foreground">{average.toFixed(1)}</span> from {reviews.length}{" "}
                {reviews.length === 1 ? "review" : "reviews"}
              </span>
            </p>
          )}
        </div>

        <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
          <div className="rounded-[1.75rem] border border-primary/10 bg-card p-6 sm:p-8">
            <h3 className="mb-4 text-lg font-semibold text-foreground">{mine ? "Your review" : "Rate this article"}</h3>
            <ReviewForm
              key={mine ? "mine" : "new"}
              slug={slug}
              initial={mine && { name: mine.name, rating: mine.rating, text: mine.text }}
              saved={reviewSaved}
              onSaved={() => setReviewSaved(true)}
            />
          </div>

          {reviews.length === 0 ? (
            <p className="flex items-center rounded-[1.75rem] border border-dashed border-primary/25 p-8 text-base text-muted-foreground">
              No reviews yet. Be the first to rate this article.
            </p>
          ) : (
            <ul className="grid content-start gap-4">
              {reviews.map((r) => (
                <li key={r.id} className="rounded-2xl border border-primary/10 bg-card p-5">
                  <div className="flex items-center gap-3">
                    <Avatar name={r.name} />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-foreground">{r.name}</p>
                      <p className="text-xs text-muted-foreground">{dateOf(r.createdAt)}</p>
                    </div>
                    <Stars value={r.rating} className="ml-auto" />
                  </div>
                  {r.text && <p className="mt-3 text-base leading-relaxed [overflow-wrap:anywhere] whitespace-pre-line text-foreground/85">{r.text}</p>}
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <section aria-labelledby="comments-heading">
        <h2 id="comments-heading" className="flex items-center gap-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Comments
          <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">{comments.length}</span>
        </h2>

        <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
          <div className="rounded-[1.75rem] border border-primary/10 bg-card p-6 sm:p-8">
            <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-foreground">
              <MessageSquare className="size-5 text-primary" aria-hidden="true" />
              Leave a comment
            </h3>
            <CommentForm slug={slug} />
          </div>

          {comments.length === 0 ? (
            <p className="flex items-center rounded-[1.75rem] border border-dashed border-primary/25 p-8 text-base text-muted-foreground">
              No comments yet. Start the conversation.
            </p>
          ) : (
            <ul className="grid content-start gap-4">
              {comments.map((c) => (
                <li key={c.id} className="rounded-2xl border border-primary/10 bg-card p-5">
                  <div className="flex items-center gap-3">
                    <Avatar name={c.name} />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-foreground">{c.name}</p>
                      <p className="text-xs text-muted-foreground">{dateOf(c.createdAt)}</p>
                    </div>
                  </div>
                  <p className="mt-3 text-base leading-relaxed [overflow-wrap:anywhere] whitespace-pre-line text-foreground/85">{c.text}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <p className="text-sm text-muted-foreground">
        Reviews and comments are saved in this browser for now, so only you can see them.
      </p>
    </div>
  );
}
