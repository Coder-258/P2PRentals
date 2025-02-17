const express= require('express');
const mongoose= require('mongoose');
const dotenv= require('dotenv');
dotenv.config();
const app= express();
app.use(express.json());
const cors= require('cors');
app.use(cors());
const UserRoutes=require('./routes/UserRoutes')

const connect_to_db = async () => {
    try {
        await mongoose.connect(process.env.DB_CONNECT);
        console.log("Connected to DB");
    } catch (err) {
        console.error("DB Connection Error:", err);
    }
}
connect_to_db();
app.use('/user',UserRoutes);
app.get('/', (req, res) => {
    res.send('Hello World');
});
app.listen(process.env.PORT, () => {
    console.log(`Server running at http://localhost:${process.env.PORT}`);
});