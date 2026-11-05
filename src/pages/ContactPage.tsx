import { useState, type FormEvent } from 'react'
import { contactEmail, contactPhone, contactWhatsapp, contactWhatsappHref, unitPages } from '../data/site'

// El formulario arma la consulta y la abre en el WhatsApp de la empresa, lista para enviar.
// Marina decidió (04/11/2026) dejarlo así, sin envío por correo a info@.
// El texto de confirmación definitivo lo pasa Marketing.
const interestOptions = [...unitPages.map((unit) => unit.label), 'Agro Polo Tour', 'Otra consulta']

type FormValues = {
  name: string
  phone: string
  interest: string
  message: string
}

type FormErrors = Partial<Record<keyof FormValues, string>>

const emptyForm: FormValues = { name: '', phone: '', interest: '', message: '' }

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {}
  if (!values.name.trim()) errors.name = 'Escribí tu nombre.'
  if (!values.phone.trim()) errors.phone = 'Escribí un teléfono para contactarte.'
  else if (values.phone.replace(/\D/g, '').length < 8) errors.phone = 'Revisá el teléfono: tiene que tener al menos 8 números.'
  if (!values.interest) errors.interest = 'Elegí sobre qué querés consultar.'
  if (!values.message.trim()) errors.message = 'Contanos brevemente qué necesitás.'
  return errors
}

function buildInquiryMessage(values: FormValues) {
  return [
    'Hola, les escribo desde la web de Grupo Agro Polo.',
    `Nombre: ${values.name.trim()}`,
    `Teléfono: ${values.phone.trim()}`,
    `Consulta sobre: ${values.interest}`,
    values.message.trim(),
  ].join('\n')
}

function inquiryHref(values: FormValues) {
  return `https://wa.me/${contactWhatsapp.number}?text=${encodeURIComponent(buildInquiryMessage(values))}`
}

export function ContactPage() {
  const [values, setValues] = useState<FormValues>(emptyForm)
  const [errors, setErrors] = useState<FormErrors>({})
  const [sentHref, setSentHref] = useState<string | null>(null)

  function update(field: keyof FormValues, value: string) {
    setValues((current) => ({ ...current, [field]: value }))
    if (errors[field]) setErrors((current) => ({ ...current, [field]: undefined }))
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const found = validate(values)
    setErrors(found)
    const firstInvalid = (Object.keys(emptyForm) as (keyof FormValues)[]).find((field) => found[field])
    if (firstInvalid) {
      document.getElementById(`contacto-${firstInvalid}`)?.focus()
      return
    }
    const href = inquiryHref(values)
    window.open(href, '_blank', 'noopener')
    setSentHref(href)
    setValues(emptyForm)
  }

  function fieldProps(field: keyof FormValues) {
    return {
      id: `contacto-${field}`,
      name: field,
      value: values[field],
      'aria-invalid': errors[field] ? true : undefined,
      'aria-describedby': errors[field] ? `contacto-${field}-error` : undefined,
    }
  }

  function fieldError(field: keyof FormValues) {
    return errors[field] ? <p className="contact-field-error" id={`contacto-${field}-error`}>{errors[field]}</p> : null
  }

  return (
    <>
      <section className="contact-hero" aria-labelledby="contact-title">
        <div className="contact-hero-photo" aria-hidden="true">
          <img src="/images/cultivo-soja.webp" alt="" fetchPriority="high" />
        </div>
        <div className="container contact-hero-content">
          <p className="contact-eyebrow">Contacto</p>
          <h1 id="contact-title">¿Buscás una solución? Conversemos</h1>
          <p>Contanos qué necesitás y te respondemos de forma directa.</p>
        </div>
      </section>

      <section className="contact-main" aria-label="Consultas">
        <div className="container contact-main-grid">
          {contactWhatsapp.number && (
            <div className="contact-form-card">
              <h2>Dejanos tu consulta</h2>
              <p className="contact-form-note">Completá los datos y se abre WhatsApp con tu consulta lista para enviar.</p>
              {sentHref ? (
                <div className="contact-sent" role="status">
                  <p><strong>¡Listo! Te abrimos WhatsApp con tu consulta.</strong></p>
                  <p>Solo falta que la envíes desde ahí. Si no se abrió, tocá el botón.</p>
                  <div className="contact-sent-actions">
                    <a className="button button-pink" href={sentHref} target="_blank" rel="noreferrer">
                      Abrir WhatsApp <span aria-hidden="true">→</span>
                    </a>
                    <button className="contact-link-button" type="button" onClick={() => setSentHref(null)}>
                      Escribir otra consulta
                    </button>
                  </div>
                </div>
              ) : (
                <form className="contact-form" noValidate onSubmit={handleSubmit}>
                  <div className="contact-field">
                    <label htmlFor="contacto-name">Nombre</label>
                    <input {...fieldProps('name')} type="text" autoComplete="name" onChange={(event) => update('name', event.target.value)} />
                    {fieldError('name')}
                  </div>
                  <div className="contact-field">
                    <label htmlFor="contacto-phone">Teléfono</label>
                    <input {...fieldProps('phone')} type="tel" autoComplete="tel" inputMode="tel" onChange={(event) => update('phone', event.target.value)} />
                    {fieldError('phone')}
                  </div>
                  <div className="contact-field">
                    <label htmlFor="contacto-interest">¿Sobre qué querés consultar?</label>
                    <select {...fieldProps('interest')} onChange={(event) => update('interest', event.target.value)}>
                      <option value="">Elegí una opción</option>
                      {interestOptions.map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                    {fieldError('interest')}
                  </div>
                  <div className="contact-field">
                    <label htmlFor="contacto-message">Mensaje</label>
                    <textarea {...fieldProps('message')} rows={5} onChange={(event) => update('message', event.target.value)} />
                    {fieldError('message')}
                  </div>
                  <button className="button button-pink contact-submit" type="submit">
                    Enviar consulta <span aria-hidden="true">→</span>
                  </button>
                </form>
              )}
            </div>
          )}

          <aside className="contact-aside" aria-label="Otros canales">
            <h2>También podés</h2>
            {contactWhatsapp.number && (
              <a className="button button-pink" href={contactWhatsappHref()} target="_blank" rel="noreferrer">
                Escribinos por WhatsApp <span aria-hidden="true">→</span>
              </a>
            )}
            <p>Llamanos</p>
            <a className="contact-channel" href={`tel:${contactPhone.tel}`}>{contactPhone.display}</a>
            <p>Escribinos un correo</p>
            <a className="contact-channel" href={`mailto:${contactEmail}`}>{contactEmail}</a>
            <p>Seguinos en Instagram</p>
            <ul>
              <li><a href="https://www.instagram.com/grupoagropolo/" target="_blank" rel="noreferrer">@grupoagropolo</a></li>
              <li><a href="https://www.instagram.com/agropolotour/" target="_blank" rel="noreferrer">@agropolotour</a></li>
            </ul>
          </aside>
        </div>
      </section>
    </>
  )
}
