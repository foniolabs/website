"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { HiCheckCircle, HiExclamationCircle } from "react-icons/hi";

const NAVY = "#001842";
const BLUE = "#0a6cff";

type Status = "idle" | "submitting" | "success" | "error";

const inputBase =
  "w-full rounded-lg px-4 py-3 text-base outline-none transition-shadow min-h-[48px] bg-white";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [feedback, setFeedback] = useState<string>("");
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setFeedback("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || "Something went wrong. Please try again.");
      setStatus("success");
      setFeedback(data?.message || "Thanks — your message is on its way. We'll be in touch shortly.");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      setStatus("error");
      setFeedback((err as Error).message);
    }
  };

  if (status === "success") {
    return (
      <motion.div
        className="text-center py-10"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <HiCheckCircle className="w-14 h-14 mx-auto mb-4" style={{ color: BLUE }} />
        <h3 className="text-2xl font-bold mb-2" style={{ color: NAVY }}>Message sent</h3>
        <p className="text-gray-600 mb-6 max-w-sm mx-auto">{feedback}</p>
        <button
          onClick={() => setStatus("idle")}
          className="text-sm font-semibold hover:underline underline-offset-4"
          style={{ color: BLUE }}
        >
          Send another message
        </button>
      </motion.div>
    );
  }

  const fieldStyle = { border: `1px solid ${NAVY}1f`, color: NAVY } as const;
  const focusRing = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    (e.currentTarget.style.boxShadow = `0 0 0 3px ${BLUE}22`);
  const blurRing = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    (e.currentTarget.style.boxShadow = "none");

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="cf-name" className="block text-sm font-semibold mb-2" style={{ color: NAVY }}>
            Name <span style={{ color: BLUE }}>*</span>
          </label>
          <input
            id="cf-name" name="name" type="text" required autoComplete="name"
            value={form.name} onChange={update("name")} onFocus={focusRing} onBlur={blurRing}
            className={inputBase} style={fieldStyle} placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor="cf-email" className="block text-sm font-semibold mb-2" style={{ color: NAVY }}>
            Email <span style={{ color: BLUE }}>*</span>
          </label>
          <input
            id="cf-email" name="email" type="email" required inputMode="email" autoComplete="email"
            value={form.email} onChange={update("email")} onFocus={focusRing} onBlur={blurRing}
            className={inputBase} style={fieldStyle} placeholder="you@company.com"
          />
        </div>
      </div>

      <div>
        <label htmlFor="cf-subject" className="block text-sm font-semibold mb-2" style={{ color: NAVY }}>
          Subject <span style={{ color: BLUE }}>*</span>
        </label>
        <input
          id="cf-subject" name="subject" type="text" required
          value={form.subject} onChange={update("subject")} onFocus={focusRing} onBlur={blurRing}
          className={inputBase} style={fieldStyle} placeholder="What's this about?"
        />
      </div>

      <div>
        <label htmlFor="cf-message" className="block text-sm font-semibold mb-2" style={{ color: NAVY }}>
          Message <span style={{ color: BLUE }}>*</span>
        </label>
        <textarea
          id="cf-message" name="message" required rows={5}
          value={form.message} onChange={update("message")} onFocus={focusRing} onBlur={blurRing}
          className={`${inputBase} resize-y`} style={fieldStyle} placeholder="Tell us a bit more…"
        />
      </div>

      {status === "error" && (
        <div className="flex items-start gap-2 text-sm" style={{ color: "#dc2626" }} role="alert" aria-live="polite">
          <HiExclamationCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <span>{feedback}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg font-semibold text-white text-base min-h-[48px] transition-transform duration-200 hover:-translate-y-0.5 disabled:opacity-60 disabled:hover:translate-y-0 disabled:cursor-not-allowed"
        style={{ background: BLUE }}
      >
        {status === "submitting" ? (
          <>
            <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
            Sending…
          </>
        ) : (
          "Send message"
        )}
      </button>

      <p className="text-xs text-center text-gray-400">
        We&apos;ll only use your details to reply to your message.
      </p>
    </form>
  );
}
