"use client";

import { useId, useState } from "react";
import { ChevronDown, X } from "lucide-react";
import { cn } from "cn";
import { DIFFICULTY_LABEL, STATUS_LABEL } from "@/data/resources";
import { useModal } from "../projects/use-modal";
import {
  EMPTY_STATE,
  activeFilterCount,
  applyPatch,
  coursesFor,
  isFiltering,
  programsFor,
  type Facets,
  type ResourceState,
} from "./resource-utils";

const FOCUS = "focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-2 focus-visible:outline-primary";

export type OnChange = (patch: Partial<ResourceState>) => void;

const LABEL = "mb-1.5 block text-[11px] font-semibold tracking-widest text-muted-foreground uppercase";

function Select({
  id,
  label,
  value,
  onChange,
  disabled,
  children,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  disabled?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="min-w-0">
      <label htmlFor={id} className={LABEL}>
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          value={value}
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}
          className={cn(
            "h-11 w-full appearance-none truncate rounded-lg border border-primary/20 bg-card pr-9 pl-3 text-sm font-medium text-foreground disabled:opacity-60",
            FOCUS
          )}
        >
          {children}
        </select>
        <ChevronDown className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
      </div>
    </div>
  );
}

/** A collapsible checkbox group. Inside a group the choices are OR; groups combine with AND. */
function CheckGroup<T extends string>({
  id,
  label,
  options,
  selected,
  onChange,
  defaultOpen = false,
}: {
  id: string;
  label: string;
  options: { value: T; label: string }[];
  selected: T[];
  onChange: (next: T[]) => void;
  defaultOpen?: boolean;
}) {
  if (options.length === 0) return null;
  return (
    <details id={id} open={defaultOpen || selected.length > 0} className="group border-t border-primary/10 py-3">
      <summary className={cn("flex min-h-10 cursor-pointer list-none items-center justify-between gap-2 rounded text-sm font-semibold text-foreground [&::-webkit-details-marker]:hidden", FOCUS)}>
        <span>
          {label}
          {selected.length > 0 && <span className="ml-2 rounded-md bg-primary px-1.5 py-0.5 text-[11px] text-primary-foreground">{selected.length}</span>}
        </span>
        <ChevronDown className="size-4 text-muted-foreground transition-transform group-open:rotate-180" aria-hidden="true" />
      </summary>
      <fieldset className="mt-2 min-w-0">
        <legend className="sr-only">{label}</legend>
        <ul className="max-h-52 overflow-y-auto pr-1">
          {options.map((o) => {
            const on = selected.includes(o.value);
            return (
              <li key={o.value}>
                <label className="flex min-h-9 cursor-pointer items-center gap-2.5 rounded text-sm text-foreground hover:text-primary">
                  <input
                    type="checkbox"
                    checked={on}
                    onChange={() => onChange(on ? selected.filter((v) => v !== o.value) : [...selected, o.value])}
                    className={cn("size-4 shrink-0 accent-primary", FOCUS)}
                  />
                  <span className="[overflow-wrap:anywhere]">{o.label}</span>
                </label>
              </li>
            );
          })}
        </ul>
      </fieldset>
    </details>
  );
}

/** Every filter group. Used by the desktop rail and by the mobile sheet, so both offer the same filters. */
export function FilterGroups({
  idPrefix,
  state,
  facets,
  onChange,
}: {
  idPrefix: string;
  state: ResourceState;
  facets: Facets;
  onChange: OnChange;
}) {
  const programs = programsFor(facets, state.industry);
  const courses = coursesFor(facets, state.industry, state.program);

  return (
    <div>
      <CheckGroup
        id={`${idPrefix}-type`}
        label="Resource type"
        defaultOpen
        options={facets.types}
        selected={state.types}
        onChange={(types) => onChange({ types })}
      />

      <div className="grid gap-3 border-t border-primary/10 py-4">
        <Select id={`${idPrefix}-industry`} label="Industry" value={state.industry} onChange={(v) => onChange({ industry: v })}>
          <option value="">All industries</option>
          {facets.industries.map((i) => (
            <option key={i} value={i}>
              {i}
            </option>
          ))}
        </Select>
        <Select
          id={`${idPrefix}-program`}
          label="Program"
          value={state.program}
          onChange={(v) => onChange({ program: v })}
          disabled={programs.length === 0}
        >
          <option value="">{programs.length === 0 ? "No programs listed" : "All programs"}</option>
          {programs.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </Select>
        <Select
          id={`${idPrefix}-course`}
          label="Course"
          value={state.course}
          onChange={(v) => onChange({ course: v })}
          disabled={courses.length === 0}
        >
          <option value="">{courses.length === 0 ? "No courses listed" : "All courses"}</option>
          {courses.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </Select>
      </div>

      <CheckGroup
        id={`${idPrefix}-topics`}
        label="Topics"
        options={facets.topics.map((t) => ({ value: t, label: t }))}
        selected={state.topics}
        onChange={(topics) => onChange({ topics })}
      />

      <div className="grid gap-3 border-t border-primary/10 py-4">
        {/* Difficulty is only offered when resources actually have difficulty values. */}
        {facets.difficulties.length > 0 && (
          <Select
            id={`${idPrefix}-difficulty`}
            label="Difficulty"
            value={state.difficulty}
            onChange={(v) => onChange({ difficulty: v as ResourceState["difficulty"] })}
          >
            <option value="">All levels</option>
            {facets.difficulties.map((d) => (
              <option key={d} value={d}>
                {DIFFICULTY_LABEL[d]}
              </option>
            ))}
          </Select>
        )}
        <Select id={`${idPrefix}-status`} label="Status" value={state.status} onChange={(v) => onChange({ status: v as ResourceState["status"] })}>
          <option value="">All statuses</option>
          {facets.statuses.map((s) => (
            <option key={s} value={s}>
              {STATUS_LABEL[s]}
            </option>
          ))}
        </Select>
      </div>

      <CheckGroup
        id={`${idPrefix}-format`}
        label="Format"
        options={facets.formats}
        selected={state.formats}
        onChange={(formats) => onChange({ formats })}
      />
    </div>
  );
}

/** Desktop: a compact left rail that stays in view while the results scroll. */
export function FilterRail({
  state,
  facets,
  onChange,
  onReset,
}: {
  state: ResourceState;
  facets: Facets;
  onChange: OnChange;
  onReset: () => void;
}) {
  return (
    <aside
      aria-label="Resource filters"
      className="hidden lg:sticky lg:top-24 lg:block lg:max-h-[calc(100dvh-7rem)] lg:w-64 lg:shrink-0 lg:self-start lg:overflow-y-auto lg:pr-2 xl:w-72"
    >
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-bold tracking-widest text-foreground uppercase">Filters</h3>
        {isFiltering(state) && (
          <button type="button" onClick={onReset} className={cn("min-h-8 rounded px-1 text-sm font-medium text-primary underline-offset-4 hover:underline", FOCUS)}>
            Clear all
          </button>
        )}
      </div>
      <FilterGroups idPrefix="rail" state={state} facets={facets} onChange={onChange} />
    </aside>
  );
}

function SheetBody({
  initial,
  facets,
  onApply,
  onCancel,
}: {
  initial: ResourceState;
  facets: Facets;
  onApply: (s: ResourceState) => void;
  onCancel: () => void;
}) {
  // The sheet edits a draft; nothing changes in the results until "Apply Filters".
  const [draft, setDraft] = useState(initial);
  const title = useId();
  const count = activeFilterCount(draft);
  return (
    <>
      <div className="flex items-center justify-between border-b border-primary/10 px-5 py-4">
        <h3 id={title} className="text-lg font-semibold tracking-tight">
          Filters{count > 0 && ` (${count})`}
        </h3>
        <button type="button" onClick={onCancel} aria-label="Close filters" className={cn("flex size-10 items-center justify-center rounded-full hover:bg-muted", FOCUS)}>
          <X className="size-5" aria-hidden="true" />
        </button>
      </div>
      <div className="overflow-y-auto overscroll-contain px-5 py-4">
        <FilterGroups idPrefix="sheet" state={draft} facets={facets} onChange={(patch) => setDraft((d) => applyPatch(d, patch, facets))} />
      </div>
      <div className="grid grid-cols-2 gap-3 border-t border-primary/10 bg-background px-5 py-4">
        <button
          type="button"
          onClick={() => setDraft(EMPTY_STATE)}
          className={cn("min-h-12 rounded-lg border border-primary/25 text-base font-semibold text-foreground hover:bg-muted", FOCUS)}
        >
          Clear All
        </button>
        <button
          type="button"
          onClick={() => onApply(draft)}
          className={cn("min-h-12 rounded-lg bg-primary text-base font-semibold text-primary-foreground hover:bg-primary/90", FOCUS)}
        >
          Apply Filters
        </button>
      </div>
    </>
  );
}

/** Phones and tablets: the filters open in a bottom sheet instead of squeezing a sidebar. */
export function FilterSheet({
  open,
  state,
  facets,
  onApply,
  onClose,
}: {
  open: boolean;
  state: ResourceState;
  facets: Facets;
  onApply: (s: ResourceState) => void;
  onClose: () => void;
}) {
  const ref = useModal(open);
  return (
    <dialog
      ref={ref}
      aria-label="Filters"
      onClose={onClose}
      onClick={(e) => e.target === ref.current && ref.current?.close()}
      className="fixed inset-x-0 top-auto bottom-0 m-0 max-h-[88dvh] w-full max-w-none flex-col overflow-hidden rounded-t-2xl border border-primary/15 bg-background p-0 text-foreground shadow-2xl backdrop:bg-foreground/50 open:flex motion-safe:open:animate-in motion-safe:open:slide-in-from-bottom motion-safe:open:duration-300"
    >
      {open && (
        <SheetBody
          initial={state}
          facets={facets}
          onApply={(s) => {
            onApply(s);
            ref.current?.close();
          }}
          onCancel={() => ref.current?.close()}
        />
      )}
    </dialog>
  );
}
