import { Resend } from 'resend'
import type { H3Event } from 'h3'

export default defineEventHandler(async (event: H3Event) => {
  const config = useRuntimeConfig()

  if (!config.resendApiKey) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Missing Resend API Key configuration',
    })
  }

  const resend = new Resend(config.resendApiKey)

  try {
    const body = (await readBody(event))
    const { email, subject, message, phone, fullname } = body

    console.log('Attempting to send email (manual handler):', { email, subject, fullname })

    const data = await resend.emails.send({
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

    if (data.error) {
      console.error('Resend API error (manual handler):', data.error)
      throw createError({
        statusCode: 400,
        statusMessage: 'Resend API Error',
        data: data.error,
      })
    }

    return data
  }
  catch (error) {
    console.error('Internal Server Error in /server/emails/send:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
      data: error instanceof Error ? error.message : error,
    })
  }
})
