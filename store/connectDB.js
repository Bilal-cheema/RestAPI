const mongoose = require("mongoose")

const connStr = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.as4sm08.mongodb.net/RestAPI`

const connectDB = async () => {
    try {
        await mongoose.connect(connStr)
    } catch (error) {
        console.error(error)
    }
}

mongoose.connection.on('connected', () => {
    console.log("MongoDB connected...")
})

module.exports = { connectDB }