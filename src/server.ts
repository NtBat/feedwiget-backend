import express from 'express';
import nodemailer from "nodemailer";
import { prisma } from './prisma';

const app = express();

app.use(express.json());

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "71d709450fdd98",
    pass: "e46d6922020640"
  }
});

app.post('/feedbacks', async (req, res) => {
  const {type, comment, screenshot} = req.body;

  const feedback = await prisma.feedback.create({
    data: {
      type,
      comment,
      screenshot,
    }
  })

  await transport.sendMail({
    from: "Equipe Feedback Widget <oi@feedget.com>",
    to: "Nathan Batista <contato@ntbatista.dev>",
    subject: "Novo feedback",
    html: [
      `<div style="font-family: sans-serif;">`,
      `<p>Tipo do feedback: ${type}</p>`,
      `<p>Comentário: ${comment}</p>`,
      `</div>`
    ].join('\n')
  })

  return res.status(201).json({data: feedback});
});

app.listen(3333, () => {
  console.log('Server started on port 3333');
});