import { Resend } from 'resend'

const config = useRuntimeConfig()
const resend = new Resend(config.resendApiKey || 're_RHUewHHg_De48QcJhqHQf74ciCwZPeox4')

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { email, subject, message, fullname, phone } = body

  try {
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

    return data
  } catch (error) {
    return { error }
  }
})
