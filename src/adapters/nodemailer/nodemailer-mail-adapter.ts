import { MailAdapter, SendMailData } from "../mail-adapter";
import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "71d709450fdd98",
    pass: "e46d6922020640",
  },
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ subject, body }: SendMailData) {
    await transport.sendMail({
      from: "Equipe Feedback Widget <oi@feedget.com>",
      to: "Nathan Batista <contato@ntbatista.dev>",
      subject,
      html: body,
    });
  }
}
