const {Router} = require("express")
const { OrderPayment, verifyPayment } = require("../../Controllers/Payment/payment.controller")

const paymentRouter = Router()

paymentRouter.post("/orders",OrderPayment)
paymentRouter.post("/verify",verifyPayment)

module.exports = paymentRouter