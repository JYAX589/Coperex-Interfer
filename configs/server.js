import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { dbConnection } from './mongo.js';
import authRoutes from '../src/auth/auth.routes.js';
import { register } from '../src/auth/auth.controller.js'; 
import companyRoutes from '../src/company/company.routes.js';

const middlewares = (app) => {
    app.use(express.urlencoded({ extended: false }));
    app.use(cors());
    app.use(express.json());
    app.use(helmet());
    app.use(morgan('dev'));
}

const routes = (app) => {
    app.use("/coperex/v1/auth", authRoutes),
    app.use("/coperex/v1/company", companyRoutes)
    
}

const conectarDB = async () => {
    try {
        await dbConnection();
        console.log("Conexión a la base de datos exitosa");
    } catch (error) {
        console.error('Error conectando a la base de datos', error);
        process.exit(1);
    }
}

export const iniciarServidor = async () => {
    const app = express();
    const port = process.env.PORT || 3000;

    try {
        middlewares(app);
        await conectarDB(); 
        routes(app);
        app.listen(port);
        console.log(`Server running on port: ${port}`);

        const adminData = {
            name: "Josue",
            surname: "Yax",
            email: "josue@gmail.com",
            password: "12345678$",
            role: "ADMIN"
        };
        const adminReq = { body: adminData };
        const adminRes = {
            status: (code) => ({
                json: (data) => {
                    if (code === 201) {
                        console.log("Usuario administrador creado exitosamente.");
                    } else {
                        console.error("Error al crear el usuario administrador:", data);
                    }
                }
            })
        };
        await register(adminReq, adminRes);

    } catch (err) {
        console.log(`Server init failed: ${err}`);
    }
}