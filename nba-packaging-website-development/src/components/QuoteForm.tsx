"use client";

import { useEffect, useRef, useState, type ChangeEvent, type FormEvent, type ReactNode } from "react";
import { AlertCircle, CheckCircle2, Loader2, Paperclip, Send, X } from "lucide-react";
import { WhatsAppIcon } from "./icons";
import { productTypeOptions } from "@/data/products";
import {
  ARTWORK_ACCEPT,
  fieldErrors,
  quoteSchema,
  validateArtwork,
  type QuoteFieldName,
} from "@/lib/validation";
import { cn, whatsappUrl } from "@/lib/utils";

type Values = {
  fullName: string;
  companyName: string;
  phone: string;
  whatsapp: string;
  email: string;
  productType: string;
  quantity: string;
  tubeDiameter: string;
  tubeSize: string;
  message: string;
};
type Errors = Partial<Record<QuoteFieldName, string>>;

const fieldOrder: QuoteFieldName[] = [
  "fullName",
  "companyName",
  "phone",
  "whatsapp",
  "email",
  "productType",
  "quantity",
  "tubeDiameter",
  "tubeSize",
  "message",
  "artwork",
];

const initialValues = (productType = ""): Values => ({
  fullName: "",
  companyName: "",
  phone: "",
  whatsapp: "",
  email: "",
  productType,
  quantity: "",
  tubeDiameter: "",
  tubeSize: "",
  message: "",
});

const makeKey = () =>
  typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
    ? crypto.randomUUID()
    : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}-${Math.random().toString(36).slice(2)}`;

const inputClass = (invalid: boolean) =>
  cn(
    "w-full rounded-xl border bg-white px-4 py-3.5 text-base text-navy outline-none transition placeholder:text-navy/35 focus:ring-4",
    invalid
      ? "border-red-400 focus:border-red-400 focus:ring-red-100"
      : "border-navy/15 hover:border-navy/30 focus:border-gold focus:ring-gold/15",
  );

export function QuoteForm({
  defaultProduct,
  idPrefix = "quote",
}: {
  defaultProduct?: string;
  idPrefix?: string;
}) {
  const [values, setValues] = useState<Values>(() => initialValues(defaultProduct));
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [formError, setFormError] = useState<string | null>(null);
  const [result, setResult] = useState<{ reference: string; name: string } | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const keyRef = useRef<string | null>(null); // idempotency key — one per inquiry
  const submittingRef = useRef(false); // synchronous guard against double clicks

  useEffect(() => {
    if (status === "success") successRef.current?.focus();
  }, [status]);

  const fieldId = (name: string) => `${idPrefix}-${name}`;

  function update(name: keyof Values, value: string) {
    setValues((current) => ({ ...current, [name]: value }));
    if (errors[name]) {
      setErrors((current) => {
        const next = { ...current };
        delete next[name];
        return next;
      });
    }
  }

  function validateOne(name: keyof Values) {
    const parsed = quoteSchema.safeParse({ ...values, idempotencyKey: "0".repeat(16) });
    const message = parsed.success ? undefined : fieldErrors(parsed.error)[name];
    setErrors((current) => {
      const next = { ...current };
      if (message) next[name] = message;
      else delete next[name];
      return next;
    });
  }

  function bind(name: keyof Values) {
    return {
      id: fieldId(name),
      name,
      value: values[name],
      onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
        update(name, event.target.value),
      onBlur: () => {
        if (values[name]) validateOne(name);
      },
      "aria-invalid": errors[name] ? true : undefined,
      "aria-describedby": errors[name] ? `${fieldId(name)}-error` : undefined,
      className: inputClass(Boolean(errors[name])),
    } as const;
  }

  function onFileChange(event: ChangeEvent<HTMLInputElement>) {
    const picked = event.target.files?.[0] ?? null;
    if (!picked) {
      setFile(null);
      return;
    }
    const problem = validateArtwork(picked);
    if (problem) {
      setErrors((current) => ({ ...current, artwork: problem }));
      event.target.value = "";
      setFile(null);
      return;
    }
    setErrors((current) => {
      const next = { ...current };
      delete next.artwork;
      return next;
    });
    setFile(picked);
  }

  function clearFile() {
    if (fileRef.current) fileRef.current.value = "";
    setFile(null);
  }

  function focusFirstError(next: Errors) {
    const first = fieldOrder.find((name) => next[name]);
    if (!first) return;
    const el = document.getElementById(fieldId(first));
    el?.scrollIntoView({ behavior: "smooth", block: "center" });
    el?.focus({ preventScroll: true });
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submittingRef.current || status === "success") return; // prevent duplicate submissions
    const form = event.currentTarget;
    setFormError(null);

    if (!keyRef.current) keyRef.current = makeKey();
    const parsed = quoteSchema.safeParse({ ...values, idempotencyKey: keyRef.current });
    const fileProblem = file ? validateArtwork(file) : null;
    if (!parsed.success || fileProblem) {
      const next: Errors = parsed.success ? {} : fieldErrors(parsed.error);
      if (fileProblem) next.artwork = fileProblem;
      setErrors(next);
      focusFirstError(next);
      return;
    }

    submittingRef.current = true;
    setStatus("submitting");
    setErrors({});

    try {
      const body = new FormData(form);
      body.set("idempotencyKey", keyRef.current);
      body.set("sourcePage", window.location.pathname);

      const response = await fetch("/api/quote", { method: "POST", body });
      let json: { ok?: boolean; reference?: string; message?: string; errors?: Errors } | null = null;
      try {
        json = await response.json();
      } catch {
        json = null;
      }

      if (response.ok && json?.ok && json.reference) {
        setResult({ reference: json.reference, name: parsed.data.fullName });
        setStatus("success");
        return;
      }

      if (json?.errors) {
        setErrors(json.errors);
        focusFirstError(json.errors);
      }
      setFormError(
        json?.message ?? "Something went wrong while sending your inquiry. Please try again.",
      );
      setStatus("idle");
    } catch {
      setFormError(
        "We couldn't reach the server. Please check your connection and try again, or contact us on WhatsApp.",
      );
      setStatus("idle");
    } finally {
      submittingRef.current = false;
    }
  }

  function reset() {
    setValues(initialValues(defaultProduct));
    setErrors({});
    setFile(null);
    setResult(null);
    setFormError(null);
    keyRef.current = null;
    setStatus("idle");
  }

  if (status === "success" && result) {
    const firstName = result.name.split(" ")[0];
    return (
      <div ref={successRef} tabIndex={-1} role="status" aria-live="polite" className="py-6 text-center outline-none sm:py-10">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <h3 className="mt-6 text-2xl font-extrabold text-navy sm:text-3xl">
          Thank you, {firstName}. Your inquiry has been received.
        </h3>
        <p className="mx-auto mt-4 max-w-md text-navy/65">
          The NBA team will review your requirements and respond using the contact details you provided.
        </p>
        <p className="mx-auto mt-6 inline-block rounded-full bg-paper px-5 py-2.5 text-sm text-navy/70">
          Reference number: <strong className="font-bold tracking-wider text-navy">{result.reference}</strong>
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={whatsappUrl(
              `Hello NBA, I have just submitted a quote request (reference ${result.reference}). I would like to follow up on my requirements.`,
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 rounded-full bg-[#25D366] px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#1fb857]"
          >
            <WhatsAppIcon className="h-5 w-5" /> Follow up on WhatsApp
          </a>
          <button
            type="button"
            onClick={reset}
            className="rounded-full border border-navy/20 px-6 py-3.5 text-sm font-semibold text-navy transition-colors hover:bg-navy hover:text-white"
          >
            Submit another inquiry
          </button>
        </div>
      </div>
    );
  }

  const submitting = status === "submitting";

  return (
    <form onSubmit={onSubmit} noValidate className="relative" aria-busy={submitting}>
      {/* Honeypot — hidden from real visitors, catches simple bots */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" defaultValue="" />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id={fieldId("fullName")} label="Full Name" required error={errors.fullName}>
          <input {...bind("fullName")} type="text" autoComplete="name" placeholder="Your full name" />
        </Field>
        <Field id={fieldId("companyName")} label="Company Name" required error={errors.companyName}>
          <input {...bind("companyName")} type="text" autoComplete="organization" placeholder="Your company" />
        </Field>
        <Field id={fieldId("phone")} label="Phone Number" required error={errors.phone}>
          <input {...bind("phone")} type="tel" autoComplete="tel" inputMode="tel" placeholder="+92 300 1234567" />
        </Field>
        <Field id={fieldId("whatsapp")} label="WhatsApp Number" error={errors.whatsapp}>
          <input {...bind("whatsapp")} type="tel" inputMode="tel" placeholder="+92 300 1234567" />
        </Field>
        <Field id={fieldId("email")} label="Email Address" required error={errors.email} className="sm:col-span-2">
          <input {...bind("email")} type="email" autoComplete="email" inputMode="email" placeholder="name@company.com" />
        </Field>

        <fieldset className="sm:col-span-2" aria-describedby={errors.productType ? `${fieldId("productType")}-error` : undefined}>
          <legend className="mb-2 text-sm font-semibold text-navy">
            Product Type <span className="text-gold-dark" aria-hidden>*</span>
          </legend>
          <div className="grid gap-3 sm:grid-cols-3">
            {productTypeOptions.map((option, index) => {
              const selected = values.productType === option.value;
              return (
                <label key={option.value} className="relative cursor-pointer">
                  <input
                    type="radio"
                    name="productType"
                    value={option.value}
                    checked={selected}
                    onChange={() => update("productType", option.value)}
                    id={index === 0 ? fieldId("productType") : undefined}
                    className="peer sr-only"
                  />
                  <span
                    className={cn(
                      "flex items-center justify-between gap-3 rounded-xl border px-4 py-3.5 text-[15px] font-semibold transition peer-focus-visible:ring-4 peer-focus-visible:ring-gold/30",
                      selected
                        ? "border-gold bg-gold/10 text-navy ring-4 ring-gold/15"
                        : errors.productType
                          ? "border-red-400 bg-white text-navy/80"
                          : "border-navy/15 bg-white text-navy/80 hover:border-navy/40",
                    )}
                  >
                    {option.label}
                    {selected ? <CheckCircle2 className="h-5 w-5 text-gold-dark" aria-hidden /> : null}
                  </span>
                </label>
              );
            })}
          </div>
          <FieldError id={`${fieldId("productType")}-error`} message={errors.productType} />
        </fieldset>

        <Field id={fieldId("quantity")} label="Required Quantity" required error={errors.quantity} hint="Number of tubes (pieces)">
          <input {...bind("quantity")} type="text" inputMode="numeric" placeholder="e.g. 50,000" />
        </Field>
        <Field id={fieldId("tubeDiameter")} label="Tube Diameter" error={errors.tubeDiameter} hint="If known, e.g. 35 mm">
          <input {...bind("tubeDiameter")} type="text" placeholder="e.g. 35 mm" />
        </Field>
        <Field id={fieldId("tubeSize")} label="Tube Size" error={errors.tubeSize} hint="Length or capacity, if known" className="sm:col-span-2">
          <input {...bind("tubeSize")} type="text" placeholder="e.g. 100 mm length or 50 ml" />
        </Field>

        <Field id={fieldId("message")} label="Message" error={errors.message} className="sm:col-span-2">
          <textarea
            {...bind("message")}
            rows={5}
            placeholder="Tell us about your product, printing requirements, cap preference or anything else we should know."
            className={cn(inputClass(Boolean(errors.message)), "resize-y")}
          />
        </Field>

        <div className="sm:col-span-2">
          <p className="mb-2 text-sm font-semibold text-navy">
            Artwork or Reference Image
            <span className="ml-2 text-xs font-medium text-navy/40">Optional</span>
          </p>
          <input
            ref={fileRef}
            id={fieldId("artwork")}
            name="artwork"
            type="file"
            accept={ARTWORK_ACCEPT}
            onChange={onFileChange}
            className="sr-only"
            aria-describedby={errors.artwork ? `${fieldId("artwork")}-error` : `${fieldId("artwork")}-hint`}
          />
          {file ? (
            <div className="flex items-center justify-between gap-3 rounded-xl border border-gold/40 bg-gold/5 px-4 py-3.5">
              <span className="flex min-w-0 items-center gap-3 text-sm font-semibold text-navy">
                <Paperclip className="h-4 w-4 shrink-0 text-gold-dark" aria-hidden />
                <span className="truncate">{file.name}</span>
                <span className="shrink-0 text-xs font-medium text-navy/50">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
              </span>
              <button
                type="button"
                onClick={clearFile}
                aria-label="Remove file"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-navy/60 transition-colors hover:bg-navy hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <label
              htmlFor={fieldId("artwork")}
              className={cn(
                "flex cursor-pointer flex-col items-center justify-center gap-1 rounded-xl border-2 border-dashed px-4 py-7 text-center transition-colors hover:border-gold hover:bg-gold/5",
                errors.artwork ? "border-red-400" : "border-navy/20",
              )}
            >
              <Paperclip className="h-5 w-5 text-gold-dark" aria-hidden />
              <span className="text-sm font-semibold text-navy">Click to upload your artwork or reference image</span>
              <span id={`${fieldId("artwork")}-hint`} className="text-xs text-navy/50">
                JPG, PNG, WebP or PDF · up to 5 MB
              </span>
            </label>
          )}
          <FieldError id={`${fieldId("artwork")}-error`} message={errors.artwork} />
        </div>
      </div>

      {formError ? (
        <div role="alert" className="mt-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3.5 text-sm text-red-700">
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden />
          <p>{formError}</p>
        </div>
      ) : null}

      <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-navy px-8 py-4 text-[15px] font-semibold tracking-wide text-white transition-all duration-300 hover:bg-gold hover:text-navy disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
        >
          {submitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> Sending your inquiry…
            </>
          ) : (
            <>
              Submit Inquiry <Send className="h-4 w-4" aria-hidden />
            </>
          )}
        </button>
        <p className="text-xs leading-relaxed text-navy/50">
          Fields marked * are required. Your details are used only to respond to your inquiry.
        </p>
      </div>
    </form>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="mt-1.5 flex items-start gap-1.5 text-sm font-medium text-red-600">
      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
      {message}
    </p>
  );
}

function Field({
  id,
  label,
  required,
  error,
  hint,
  className,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 block text-sm font-semibold text-navy">
        {label}
        {required ? (
          <span className="ml-0.5 text-gold-dark" aria-hidden>
            {" "}*
          </span>
        ) : (
          <span className="ml-2 text-xs font-medium text-navy/40">Optional</span>
        )}
      </label>
      {children}
      {hint && !error ? <p className="mt-1.5 text-xs text-navy/50">{hint}</p> : null}
      <FieldError id={`${id}-error`} message={error} />
    </div>
  );
}
