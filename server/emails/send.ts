import { Resend } from 'resend'
import type { H3Event } from 'h3'

export default defineEventHandler(async (event: H3Event) => {
  const config = useRuntimeConfig()
  const resend = new Resend(config.resendApiKey)

  try {
    const body = (await readBody(event))
    const { email, subject, message, phone, fullname } = body
    return await resend.emails.send({
      from: 'Maël Laroque <contact@maellaroque.fr>',
      to: ['contact@maellaroque.fr'],
      subject: 'Nouveau message de portfolio',
      html: `
      <p>Un nouveau message a été envoyé depuis le formulaire de contact de portfolio.</p>
      <p>Voici les détails du message :</p>
      <ul>
        <li>Nom : ${fullname}</li>
        <li>Email : ${email}</li>
        <li>Téléphone : ${phone}</li>
        <li>Sujet : ${subject}</li>
        <li>Message : ${message}</li>
      </ul>
      `,
    })
  }
  catch (error) {
    return { error }
  }
})
