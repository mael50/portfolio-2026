import { Resend } from 'resend'

const config = useRuntimeConfig()
const resend = new Resend(config.resendApiKey || 're_RHUewHHg_De48QcJhqHQf74ciCwZPeox4')

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { email, subject, message, fullname, phone } = body

    console.log('Attempting to send email:', { email, subject, fullname })

    const data = await resend.emails.send({
      from: 'Portfolio <contact@maellaroque.fr>',
      to: ['contact@maellaroque.fr'],
      subject: `Nouveau message de ${fullname}: ${subject}`,
      html: `
        <p><strong>Nom:</strong> ${fullname}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Téléphone:</strong> ${phone}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    })

    if (data.error) {
      console.error('Resend API error:', data.error)
      throw createError({
        statusCode: 400,
        statusMessage: 'Resend API Error',
        data: data.error,
      })
    }

    return data
  } catch (error) {
    console.error('Internal Server Error in /api/emails/send:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
      data: error instanceof Error ? error.message : error,
    })
  }
})
