import { Schema, model } from 'mongoose';

const companySchema = new Schema(
    {
        name:{
            type: String,
            required: {true: 'El nombre de la empresa es requerido'}
        },
        impactLevel:{
            type: String,
            enum: ['ALTO', 'MEDIO', 'BAJO'],
            required: {true: 'El nivel de impacto es requerido'}
        },
        yearTrajectory:{
            type: Number,
            required: {true: 'La trayectoria de año es requerida'}
        },
        category:{
            type: String,
            enum: ['INDUSTRIAL', 'AGROPECUARIA', 'MINERIA', 'CONSTRUCCION', 'COMERCIAL', 'OTRO'],
            required: {true: 'La categoría es requerida'}
        }
    }
);

export default model('Company', companySchema);
