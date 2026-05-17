import mongoose from 'mongoose'
import app from './app.js'

if (process.env.NODE_ENV !== "test") {
    // MongoDB Connect
    mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            app.listen(process.env.PORT, () => {
                console.log(`🚀 Server running on port ${process.env.PORT}`)
            })
        }).catch(err => console.error('MongoDB Connection Error',err))
}

export default app
