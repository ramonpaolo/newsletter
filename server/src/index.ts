import express from "express"
import dotenv from "dotenv";
import path from "path"

import NodeMailer from "./services/NodeMailer"

dotenv.config()

const app = express()

const PORT: number = parseInt(process.env.PORT as unknown as string) || 3000

const nodeMailer = new NodeMailer();

(async () => {
    await nodeMailer.createAccount()
    await nodeMailer.createTransport()
})()

app.use(express.json())
app.set("view engine", "ejs")

app.use(express.static(path.join(__dirname, "..", "views", "styles")))

app.route("/").get(async (req, res) => {
    res.render("index.ejs")
}).post(async (req, res) => {
    const {name, email }: {name: string, email: string} = req.body
    await nodeMailer.sendEmail(email, `Olá ${name}`)
    res.status(200).json({ status: "success" })
})

app.listen(PORT)