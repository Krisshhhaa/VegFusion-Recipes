import cors from 'cors';
import { default as bodyParser, default as express } from 'express';
import mongoose from 'mongoose';
import recipeRouter from './routes/recipe.js';
import userRouter from './routes/user.js';
const app = express();

app.use(bodyParser.json())
app.use(cors({
    origin:true,
    methods:["GET","POST","PUT","DELETE"],
    credentials:true
}))
//userRouter
app.use('/api',userRouter)

//recipeRouter
app.use('/api',recipeRouter)


mongoose.connect(
    "mongodb+srv://krishadharod:h5vu0A2Si1nh6Glh@cluster0.ouaqm.mongodb.net/",{
        dbName:"MERN_RECIPE_APP_FOODFUSION",
    }
).then(()=>console.log("MongoDB is connected..!")).catch((err)=>console.log(err.message));


const port = 3000;

app.listen(port,()=>console.log(`server is running on port ${port}` ));

//krishadharod
//h5vu0A2Si1nh6Glh
//mongodb+srv://krishadharod:<db_password>@cluster0.ouaqm.mongodb.net/