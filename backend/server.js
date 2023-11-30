import express from "express";
import path from "path";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();
import cors from "cors";
import { notFound, errorHandler } from './middlewares/errorMiddleware.js';
const port = process.env.PORT;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
};

app.use(cors(corsOptions));

//Routes


const __dirname = path.resolve(); // --dirname Est le dossier courant
//utiliser le dossier uploads a la racine du projet
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

if (process.env.NODE_ENV === 'production') {
    //Dossier static
    app.use(express.static(path.join(__dirname, '/frontend/build')));

    //Chaque route qui n'existe pas redirige vers index.html
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
    });
} else {
    app.get('/', (req, res) => {
        res.send('API is running...');
    });
}

// Error handling
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});