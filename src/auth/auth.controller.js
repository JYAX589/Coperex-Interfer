import User from "../users/user.model.js";
import generarJWT from "../helpers/generate-jwt.js";
import { verify, hash } from "argon2";

export const login = async (req, res) =>{
    const {email, password} = req.body;
    try {
        const user = await User.findOne({email: email});

        if(!user){
            return res.status(400).json({
                message: 'email not found'
            })
        }

        const validatePassword = await verify(user.password, password);
        if(!validatePassword){
            return res.status(400).json({
                message: 'password incorrect'
            })
        }

        const token = await generarJWT(user.id);

        res.json({
            message: 'login success',
            token
        })

    } catch (error) {
        res.status(400).json({
            message: 'Error al iniciar sesión',
            error
        })
    }
}

export const register = async (req, res) => {
    const { name, surname, email, password, role } = req.body;
    try {
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res.status(400).json({
                message: 'Email already registered'
            });
        }

        const hashedPassword = await hash(password);
        const user = new User({ name, surname, email, password: hashedPassword, role });
        await user.save();

        const token = await generarJWT(user.id);

        res.status(201).json({ // 201 Created
            message: 'User registered successfully',
            user,
            token
        });
    } catch (error) {
        res.status(500).json({ // 500 Internal Server Error
            message: 'Error registering user',
            error
        });
    }
};