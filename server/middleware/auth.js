// import jwt from 'jsonwebtoken';

const auth = async (req, res, next) => {
    try {
        
        const token = req.headers.authorization.split(' ')[1];
        
    
        req.userId = token;

        next();

    } catch (error) {
        console.log(error);
    }
}

export default auth;