import { useState } from 'react';
import './contactSection.scss';

// ── Obfuscation simple ──────────────────────────────────────
// L'adresse est stockée en morceaux réassemblés au runtime.
// Aucun scraper basique ne lira une adresse complète dans le source.
const buildEmail = () => {
  const parts = ['leo', '.', 'jackson', '@', 'pro', 'btp', '.', 'fr'];
  return parts.join('');
};

// ── Icône envoi ─────────────────────────────────────────────
const SendIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor"
    strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2 1 8l4 2 2 4 2-5 5-7z"/>
    <path d="M5 10l2-2"/>
  </svg>
);

interface FormState {
  name: string;
  senderEmail: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  senderEmail?: string;
  message?: string;
}

function ContactSection() {
  const [form, setForm] = useState<FormState>({
    name: '',
    senderEmail: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const update = (field: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
      // Efface l'erreur dès que l'user tape
      if (errors[field as keyof FormErrors]) {
        setErrors((prev) => ({ ...prev, [field]: undefined }));
      }
    };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!form.name.trim()) newErrors.name = 'Votre nom est requis.';
    if (!form.senderEmail.trim()) {
      newErrors.senderEmail = 'Votre email est requis.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.senderEmail)) {
      newErrors.senderEmail = 'Format d\'email invalide.';
    }
    if (!form.message.trim()) newErrors.message = 'Le message ne peut pas être vide.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    const to = buildEmail();

    // Corps du mail : on injecte l'expéditeur en première ligne
    const body = [
      `De : ${form.name} <${form.senderEmail}>`,
      '',
      form.message,
    ].join('\n');

    const subject = form.subject.trim() || `Message de ${form.name}`;

    const mailto = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.location.href = mailto;
  };

  return (
    <section className="contact-section">
      <div className="contact-header">
        <h2>Me <span>contacter</span></h2>
        <p>Une question, une opportunité ? Écrivez-moi directement.</p>
      </div>

      <form
        className="contact-form"
        onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}
        noValidate
      >
        {/* Ligne 1 : Nom | Email expéditeur */}
        <div className="form-row">
          <div className={`form-field ${errors.name ? 'error' : ''}`}>
            <label htmlFor="contact-name">Qui êtes-vous ?</label>
            <input
              id="contact-name"
              type="text"
              placeholder="Prénom Nom"
              value={form.name}
              onChange={update('name')}
              autoComplete="name"
            />
            {errors.name && <span className="field-error">{errors.name}</span>}
          </div>

          <div className={`form-field ${errors.senderEmail ? 'error' : ''}`}>
            <label htmlFor="contact-email">Votre email</label>
            <input
              id="contact-email"
              type="email"
              placeholder="vous@exemple.com"
              value={form.senderEmail}
              onChange={update('senderEmail')}
              autoComplete="email"
            />
            {errors.senderEmail && <span className="field-error">{errors.senderEmail}</span>}
          </div>
        </div>

        {/* Sujet (optionnel) */}
        <div className="form-field">
          <label htmlFor="contact-subject">Sujet <span style={{ fontWeight: 400, color: '#bbb' }}>(optionnel)</span></label>
          <input
            id="contact-subject"
            type="text"
            placeholder="Objet de votre message"
            value={form.subject}
            onChange={update('subject')}
          />
        </div>

        {/* Message */}
        <div className={`form-field ${errors.message ? 'error' : ''}`}>
          <label htmlFor="contact-message">Message</label>
          <textarea
            id="contact-message"
            placeholder="Votre message…"
            value={form.message}
            onChange={update('message')}
          />
          {errors.message && <span className="field-error">{errors.message}</span>}
        </div>

        <button type="submit" className="submit-btn">
          Envoyer <SendIcon />
        </button>
      </form>

      <div className="contact-footer">
        <span>© {new Date().getFullYear()} Léo Jackson</span>
        <span>·</span>
        <a href="https://github.com/leojackson" target="_blank" rel="noopener noreferrer">GitHub</a>
        <span>·</span>
        <a href="https://linkedin.com/in/leojackson" target="_blank" rel="noopener noreferrer">LinkedIn</a>
      </div>
    </section>
  );
}

export default ContactSection;