import { useState } from "react";
import Title from "../components/Title";

// Google Apps Script web app URL (see setup steps).
// Vite: add VITE_GOOGLE_SCRIPT_URL to your .env file
// Create React App: use process.env.REACT_APP_GOOGLE_SCRIPT_URL instead
const SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL;

const services = [
  "Structural Design & Drafting",
  "Peer Review & Value Engineering",
  "Structural Audit & Repair",
  "Structural Steel Detailing",
  "Other",
];

const contactDetails = [
  {
    label: "Office",
    value: "1006, Hemkunt Tower-6, Rajendra Place, New Delhi - 110008",
    href: "https://maps.google.com/?q=Hemkunt+Tower+Rajendra+Place+New+Delhi",
  },
  {
    label: "Phone",
    value: "+91 8800683542",
    href: "tel:+918800683542",
  },
  {
    label: "Email",
    value: "tectoniceng@outlook.com",
    href: "mailto:tectoniceng@outlook.com",
  },
  {
    label: "Website",
    value: "www.tectonicengineering.com",
    href: "https://www.tectonicengineering.com",
  },
];

const initialForm = {
  name: "",
  email: "",
  phone: "",
  service: "",
  message: "",
  website: "", // honeypot field, must stay empty
};

const inputClass =
  "w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-body placeholder:text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20";

const validate = (form) => {
  const errors = {};
  if (form.name.trim().length < 2) errors.name = "Please enter your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
    errors.email = "Please enter a valid email address.";
  if (!/^[+]?[0-9\s-]{10,15}$/.test(form.phone.trim()))
    errors.phone = "Please enter a valid phone number.";
  if (!form.service) errors.service = "Please select a service.";
  if (form.message.trim().length < 10)
    errors.message = "Please write at least 10 characters.";
  return errors;
};

const ContactUs = () => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | loading | success | error

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Bots fill the hidden field; pretend success and stop
    if (form.website) {
      setStatus("success");
      return;
    }

    if (!SCRIPT_URL) {
      console.error("Google Script URL is missing. Check your .env file.");
      setStatus("error");
      return;
    }

    setStatus("loading");

    try {
      const response = await fetch(SCRIPT_URL, {
        method: "POST",
        body: new URLSearchParams({
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          service: form.service,
          message: form.message.trim(),
        }),
      });

      const result = await response.json();

      if (result.success) {
        setStatus("success");
        setForm(initialForm);
      } else {
        throw new Error(result.error || "Submission failed");
      }
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="bg-background py-16 md:py-24 px-6">
      <div className="mx-auto max-w-6xl">
        <Title
          title="Contact Us"
          subtitle="Tell us about your project. Our engineering team will get back to you with the right solution."
        />

        <div className="grid gap-10 lg:grid-cols-5">
          {/* Contact info */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl bg-primary p-8 text-white">
              <h3 className="mb-6 text-xl font-bold text-secondary">
                Get In Touch
              </h3>

              <ul className="space-y-6">
                {contactDetails.map((item) => (
                  <li key={item.label}>
                    <p className="mb-1 text-xs font-bold uppercase tracking-widest text-secondary">
                      {item.label}
                    </p>
                    <a
                      href={item.href}
                      target={item.label === "Phone" || item.label === "Email" ? undefined : "_blank"}
                      rel="noreferrer"
                      className="text-sm leading-6 text-slate-200 transition hover:text-white"
                    >
                      {item.value}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 overflow-hidden rounded-2xl border border-border shadow-sm">
              <iframe
                title="Tectonic Engineering office location"
                src="https://maps.google.com/maps?q=Hemkunt+Tower+Rajendra+Place+New+Delhi&output=embed"
                loading="lazy"
                className="h-64 w-full border-0"
              />
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <form
              onSubmit={handleSubmit}
              noValidate
              className="rounded-2xl border border-border bg-surface p-6 shadow-sm md:p-8"
            >
              <h3 className="mb-6 text-xl font-bold text-heading">
                Send Us a Message
              </h3>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-1.5 block text-sm font-semibold text-body">
                    Full Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className={inputClass}
                  />
                  {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
                </div>

                <div>
                  <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-body">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@company.com"
                    className={inputClass}
                  />
                  {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
                </div>

                <div>
                  <label htmlFor="phone" className="mb-1.5 block text-sm font-semibold text-body">
                    Phone
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    className={inputClass}
                  />
                  {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone}</p>}
                </div>

                <div>
                  <label htmlFor="service" className="mb-1.5 block text-sm font-semibold text-body">
                    Service Required
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={form.service}
                    onChange={handleChange}
                    className={inputClass}
                  >
                    <option value="">Select a service</option>
                    {services.map((service) => (
                      <option key={service} value={service}>
                        {service}
                      </option>
                    ))}
                  </select>
                  {errors.service && <p className="mt-1 text-xs text-red-600">{errors.service}</p>}
                </div>
              </div>

              <div className="mt-5">
                <label htmlFor="message" className="mb-1.5 block text-sm font-semibold text-body">
                  Project Details
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell us about your project, location and requirements"
                  className={`${inputClass} resize-none`}
                />
                {errors.message && <p className="mt-1 text-xs text-red-600">{errors.message}</p>}
              </div>

              {/* Honeypot: hidden from real users */}
              <div className="absolute -left-[9999px]" aria-hidden="true">
                <label htmlFor="website">Website</label>
                <input
                  id="website"
                  name="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={form.website}
                  onChange={handleChange}
                />
              </div>

              <button
                type="submit"
                disabled={status === "loading"}
                className="mt-6 w-full rounded-lg bg-primary px-7 py-3.5 font-semibold text-white transition-colors hover:bg-footer disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
              >
                {status === "loading" ? "Sending..." : "Send Message →"}
              </button>

              {status === "success" && (
                <p
                  role="status"
                  className="mt-5 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800"
                >
                  Thank you. Your message has been sent and we will contact you soon.
                </p>
              )}

              {status === "error" && (
                <p
                  role="alert"
                  className="mt-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
                >
                  Something went wrong. Please try again, or call us on +91 8800683542.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;