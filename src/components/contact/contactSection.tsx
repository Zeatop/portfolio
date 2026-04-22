import { useState } from 'react';
import './contactSection.scss';

// Endpoint backend. En dev, Vite proxifie /api vers localhost:3001.
// En prod, même origine via nginx.
const API_ENDPOINT = '/api/contact';

// Icône envoi
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
  website: string; // honeypot anti-bot
}

interface FormErrors {
  name?: string;
  senderEmail?: string;
  message?: string;
}

type Status = 'idle' | 'sending' | 'success' | 'error';

function ContactSection() {
  const [form, setForm] = useState<FormState>({
    name: '',
    senderEmail: '',
    subject: '',
    message: '',
    website: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<Status>('idle');
  const [serverError, setServerError] = useState<string | null>(null);

  const update = (field: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
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
    if (form.message.length > 5000) newErrors.message = 'Message trop long (5000 max).';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (status === 'sending') return;
    if (!validate()) return;

    setStatus('sending');
    setServerError(null);

    try {
      const res = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Envoi impossible.');
      }

      setStatus('success');
      setForm({ name: '', senderEmail: '', subject: '', message: '', website: '' });
    } catch (err) {
      setStatus('error');
      setServerError(err instanceof Error ? err.message : 'Erreur inconnue.');
    }
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
        {/* Honeypot : invisible pour les humains, les bots le remplissent */}
        <div style={{ position: 'absolute', left: '-9999px' }} aria-hidden="true">
          <label htmlFor="website">Ne pas remplir</label>
          <input
            id="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={form.website}
            onChange={update('website')}
          />
        </div>

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
              disabled={status === 'sending'}
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
              disabled={status === 'sending'}
            />
            {errors.senderEmail && <span className="field-error">{errors.senderEmail}</span>}
          </div>
        </div>

        {/* Sujet (optionnel) */}
        <div className="form-field">
          <label htmlFor="contact-subject">
            Sujet <span style={{ fontWeight: 400, color: '#bbb' }}>(optionnel)</span>
          </label>
          <input
            id="contact-subject"
            type="text"
            placeholder="Objet de votre message"
            value={form.subject}
            onChange={update('subject')}
            disabled={status === 'sending'}
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
            disabled={status === 'sending'}
          />
          {errors.message && <span className="field-error">{errors.message}</span>}
        </div>

        {/* Feedback de l'envoi */}
        {status === 'success' && (
          <div className="form-feedback success">
            ✓ Message envoyé, merci ! Je vous réponds dès que possible.
          </div>
        )}
        {status === 'error' && (
          <div className="form-feedback error">
            ✗ {serverError || 'Envoi impossible. Réessayez plus tard.'}
          </div>
        )}

        <button type="submit" className="submit-btn" disabled={status === 'sending'}>
          {status === 'sending' ? 'Envoi…' : 'Envoyer'} <SendIcon />
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