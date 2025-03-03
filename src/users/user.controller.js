import User from "./user.model.js";
import bcrypt from 'bcryptjs'; // Importa bcrypt para hashear contraseñas

const defaultUser = async () => {
    return {
        "name": "Josue",
        "surname": "Yax",
        "email": "josue@gmail.com",
        "password": "12345678$",
        "role": "ADMIN"
    };
};

const createAdminUser = async () => {
    try {
        const userData = await defaultUser();
        const existingUser = await User.findOne({ email: userData.email });

        if (!existingUser) {
            const hashedPassword = await bcrypt.hash(userData.password, 10);
            userData.password = hashedPassword;
            await User.create(userData);
            console.log('User admin created successfully');
        } else {
            console.log('Admin user already exists');
        }
    } catch (error) {
        console.error('Error creating admin user:', error);
    }
};

createAdminUser();