import jwt from 'jsonwebtoken';

export const generarJWT = (uid = '', role = 'ADMIN') => {  
    return new Promise((resolve, reject) => {
        const payload = { uid, role };

        jwt.sign(
            payload,
            process.env.SECRETORPRIVATEKEY,
            { expiresIn: '2h' },
            (err, token) => {
                if (err) {
                    console.log(err);
                    reject('No se generó el token.');
                } else {
                    resolve(token);
                }
            }
        );
    });
}


export default generarJWT;