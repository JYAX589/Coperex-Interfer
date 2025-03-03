import { Schema, model } from "mongoose";

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        surname: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        role: {
            type: String,
            enum: ['ADMIN'],
            default: 'ADMIN'
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export default model('User', userSchema);