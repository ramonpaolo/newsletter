import nodeMailer from "nodemailer"

export default class NodeMailer {

    public testAccount: nodeMailer.TestAccount | undefined;

    public transporter: nodeMailer.Transporter | undefined;

    public async createAccount() {

        this.testAccount = await nodeMailer.createTestAccount()

        return this.testAccount;

    }

    public async createTransport() {
        this.transporter = nodeMailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL_SENDER!,
                pass: process.env.PASS!,
            },
        });

        return this.transporter

    }

    public async sendEmail(to: string, message: string, assunto: string) {
        try {
            let info = await this.transporter!.sendMail({
                date: Date(),
                encoding: "utf-8", from: "Test Ramon Paolo", to, text: message, subject: assunto
            })
            console.log(info)
            return await info;
        } catch (err) {
            return err
        }
    }

}
