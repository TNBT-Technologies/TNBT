import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, Copy, RotateCcw } from "lucide-react";
import Magnetic from "../components/ui/Magnetic";
import { EASE_OUT } from "../lib/motion";
import { BUDGETS, PROJECT_TYPES } from "../data/services";
import { SITE } from "../data/site";
import { contactMode, submitBrief } from "../lib/contact";
import { projectIntentStore, useStore } from "../lib/store";

const EMPTY = { name: "", email: "", phone: "", projectType: "", budget: "", message: "", company: "" };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(v) {
  const errors = {};
  if (!v.name.trim()) errors.name = "Please tell us your name.";
  if (!v.email.trim()) errors.email = "We need an email to reply to.";
  else if (!EMAIL_RE.test(v.email.trim())) errors.email = "That email doesn't look quite right.";
  if (v.phone.trim() && !/^[+\d][\d\s()-]{6,}$/.test(v.phone.trim())) errors.phone = "Please enter a valid phone number.";
  if (!v.projectType) errors.projectType = "Pick the closest option — you can explain below.";
  if (v.message.trim().length < 20) errors.message = "A sentence or two about the project helps (20+ characters).";
  return errors;
}

function Field({ label, optional, error, id, children }) {
  return (
    <div className="group/field relative">
      <label htmlFor={id} className="eyebrow flex items-center gap-2 transition-colors duration-200 group-focus-within/field:text-signal">
        {label}
        {optional && <span className="normal-case tracking-normal text-dim">(optional)</span>}
      </label>
      {children}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-signal transition-transform duration-300 ease-out group-focus-within/field:scale-x-100"
        style={error ? { transform: "scaleX(1)", background: "var(--color-danger)" } : undefined}
      />
      {error && (
        <p id={`${id}-error`} className="absolute left-0 top-full mt-1.5 text-xs text-danger">
          {error}
        </p>
      )}
    </div>
  );
}

const inputClass =
  "mt-3 block w-full border-0 border-b border-line-strong bg-transparent px-0 pb-3 pt-1 text-[16px] text-fog placeholder:text-dim focus:outline-none focus-visible:outline-none";

function ChipGroup({ name, legend, options, value, onChange, error, optional }) {
  const errorId = `${name}-error`;
  return (
    <fieldset aria-describedby={error ? errorId : undefined}>
      <legend className="eyebrow flex items-center gap-2">
        {legend}
        {optional && <span className="normal-case tracking-normal text-dim">(optional)</span>}
      </legend>
      <div className="mt-4 flex flex-wrap gap-2">
        {options.map((opt) => {
          const checked = value === opt;
          return (
            <label key={opt} className="relative">
              <input
                type="radio"
                name={name}
                value={opt}
                checked={checked}
                onChange={() => onChange(opt)}
                onClick={() => optional && checked && onChange("")}
                className="peer sr-only"
              />
              <span
                className={`inline-flex min-h-10 items-center rounded-full border px-4 text-sm transition-[background-color,border-color,color,transform] duration-200 active:scale-[0.97] peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-signal ${
                  checked ? "border-signal bg-signal font-medium text-ink" : "border-line-strong text-fog/85 hover:border-fog/40"
                }`}
              >
                {opt}
              </span>
            </label>
          );
        })}
      </div>
      {error && (
        <p id={errorId} className="mt-2 text-xs text-danger">
          {error}
        </p>
      )}
    </fieldset>
  );
}

function CopyEmail() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(SITE.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${SITE.email}`;
    }
  };
  return (
    <button type="button" onClick={copy} className="inline-flex items-center gap-2 text-sm text-signal transition-colors duration-200 hover:text-fog">
      {copied ? <Check size={15} /> : <Copy size={15} />}
      <span aria-live="polite">{copied ? "Copied" : `Copy ${SITE.email}`}</span>
    </button>
  );
}

export default function ContactForm() {
  const uid = useId();
  const formRef = useRef(null);
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [result, setResult] = useState(null);
  const [failure, setFailure] = useState("");
  const intent = useStore(projectIntentStore);

  // A "Discuss…" link elsewhere on the page pre-selects the project type.
  useEffect(() => {
    if (intent.type) setValues((v) => ({ ...v, projectType: intent.type }));
  }, [intent]);

  const set = (key) => (value) => {
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };
  const onInput = (key) => (e) => set(key)(e.target.value);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (values.company) return; // honeypot: bots fill hidden fields
    const found = validate(values);
    setErrors(found);
    const firstInvalid = Object.keys(found)[0];
    if (firstInvalid) {
      const el = formRef.current?.querySelector(`[name="${firstInvalid}"]`);
      el?.focus({ preventScroll: false });
      return;
    }
    setStatus("sending");
    setFailure("");
    try {
      const brief = {
        name: values.name.trim(),
        email: values.email.trim(),
        phone: values.phone.trim(),
        projectType: values.projectType,
        budget: values.budget,
        message: values.message.trim(),
      };
      const res = await submitBrief(brief);
      setResult(res);
      setStatus("sent");
    } catch (err) {
      setFailure(err?.message || "Something went wrong.");
      setStatus("error");
    }
  };

  const reset = () => {
    setValues(EMPTY);
    setErrors({});
    setStatus("idle");
    setResult(null);
  };

  const id = (name) => `${uid}-${name}`;
  const describedBy = (name) => (errors[name] ? `${id(name)}-error` : undefined);

  return (
    <div className="relative overflow-hidden rounded-[28px] border border-line bg-ink-2 p-6 shadow-[0_40px_120px_-60px_rgb(92_242_195/0.35)] sm:p-10">
      <span aria-hidden="true" className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-signal/50 to-transparent" />
      <AnimatePresence mode="wait" initial={false}>
        {status === "sent" ? (
          <motion.div
            key="sent"
            initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -8, transition: { duration: 0.15 } }}
            transition={{ duration: 0.4, ease: EASE_OUT }}
            className="flex min-h-[420px] flex-col justify-center"
            role="status"
          >
            <span className="grid h-14 w-14 place-items-center rounded-full bg-signal text-ink">
              <Check size={26} strokeWidth={2.5} />
            </span>
            {result?.mode === "endpoint" ? (
              <>
                <h3 className="mt-8 font-display text-3xl font-medium tracking-[-0.03em] text-fog sm:text-4xl">Brief received — thank you.</h3>
                <p className="mt-4 max-w-md text-mist">
                  We&apos;ll read through your project and reply to <span className="text-fog">{values.email}</span> with questions and a clear next step.
                </p>
              </>
            ) : (
              <>
                <h3 className="mt-8 font-display text-3xl font-medium tracking-[-0.03em] text-fog sm:text-4xl">Your brief is ready to send.</h3>
                <p className="mt-4 max-w-md text-mist">
                  Your email app should have opened with everything filled in — just press send. If nothing opened, email us directly at{" "}
                  <a href={`mailto:${SITE.email}`} className="text-fog underline decoration-line-strong underline-offset-4">
                    {SITE.email}
                  </a>
                  .
                </p>
                <div className="mt-4">
                  <CopyEmail />
                </div>
              </>
            )}
            <button type="button" onClick={reset} className="mt-10 inline-flex items-center gap-2 self-start text-sm text-mist transition-colors duration-200 hover:text-fog">
              <RotateCcw size={15} /> Start a new brief
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            ref={formRef}
            noValidate
            onSubmit={onSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, filter: "blur(4px)", transition: { duration: 0.18 } }}
            className="space-y-10"
            aria-describedby={`${id("note")}`}
          >
            <div className="flex items-baseline justify-between gap-4">
              <h3 className="font-display text-2xl font-medium tracking-[-0.025em] text-fog sm:text-3xl">Tell us about your project</h3>
              <span className="hidden font-mono text-[11px] uppercase tracking-[0.16em] text-dim sm:inline">~2 min</span>
            </div>

            <div className="grid gap-10 sm:grid-cols-2 sm:gap-x-8">
              <Field label="Name" id={id("name")} error={errors.name}>
                <input
                  id={id("name")}
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Your full name"
                  value={values.name}
                  onChange={onInput("name")}
                  aria-invalid={errors.name ? true : undefined}
                  aria-describedby={describedBy("name")}
                  className={inputClass}
                />
              </Field>
              <Field label="Email" id={id("email")} error={errors.email}>
                <input
                  id={id("email")}
                  name="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  autoCapitalize="none"
                  spellCheck="false"
                  placeholder="you@company.com"
                  value={values.email}
                  onChange={onInput("email")}
                  aria-invalid={errors.email ? true : undefined}
                  aria-describedby={describedBy("email")}
                  className={inputClass}
                />
              </Field>
              <Field label="Phone number" optional id={id("phone")} error={errors.phone}>
                <input
                  id={id("phone")}
                  name="phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="+91 98765 43210"
                  value={values.phone}
                  onChange={onInput("phone")}
                  aria-invalid={errors.phone ? true : undefined}
                  aria-describedby={describedBy("phone")}
                  className={inputClass}
                />
              </Field>
            </div>

            <ChipGroup name="projectType" legend="Project type" options={PROJECT_TYPES} value={values.projectType} onChange={set("projectType")} error={errors.projectType} />
            <ChipGroup name="budget" legend="Budget" optional options={BUDGETS} value={values.budget} onChange={set("budget")} />

            <Field label="Project description" id={id("message")} error={errors.message}>
              <textarea
                id={id("message")}
                name="message"
                rows={4}
                placeholder="What are you building, who is it for, and is there a timeline we should know about?"
                value={values.message}
                onChange={onInput("message")}
                aria-invalid={errors.message ? true : undefined}
                aria-describedby={describedBy("message")}
                className={`${inputClass} resize-y leading-relaxed`}
              />
            </Field>

            {/* Honeypot — hidden from people, tempting to bots. */}
            <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
              <label>
                Company website
                <input type="text" name="company" tabIndex={-1} autoComplete="off" value={values.company} onChange={onInput("company")} />
              </label>
            </div>

            <div className="flex flex-col gap-5 pt-2 sm:flex-row sm:items-center sm:justify-between">
              <Magnetic className="w-full sm:w-auto">
                <button type="submit" disabled={status === "sending"} className="btn btn-primary w-full disabled:cursor-wait disabled:opacity-80 sm:w-auto">
                  {status === "sending" ? (
                    <>
                      <span aria-hidden="true" className="h-4 w-4 animate-spin rounded-full border-2 border-ink/30 border-t-ink" />
                      Sending…
                    </>
                  ) : (
                    <>
                      Send project brief
                      <ArrowRight size={17} aria-hidden="true" />
                    </>
                  )}
                </button>
              </Magnetic>
              <p id={id("note")} className="max-w-xs text-xs leading-relaxed text-dim">
                {contactMode === "endpoint"
                  ? "Your details are only used to reply to your enquiry."
                  : "Sending opens your email app with the brief filled in, ready to go."}
              </p>
            </div>

            <AnimatePresence>
              {status === "error" && (
                <motion.p
                  role="alert"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="rounded-2xl border border-danger/40 bg-danger/10 px-4 py-3 text-sm text-fog"
                >
                  We couldn&apos;t send your brief ({failure}). Please try again, or email{" "}
                  <a href={`mailto:${SITE.email}`} className="underline underline-offset-4">
                    {SITE.email}
                  </a>
                  .
                </motion.p>
              )}
            </AnimatePresence>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
