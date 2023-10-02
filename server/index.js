const express = require("express")
const app = express();
const db = require('./models')

app.use(express.json())

//user router
const userRouter = require('./routes/User')
app.use("/users", userRouter)

db.sequelize.sync().then(() => {
    app.listen(3000, () => {
        console.log("Listen port 3000");
    })
})
