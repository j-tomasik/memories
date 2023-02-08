// import jwt from 'jsonwebtoken';

const auth = async (req, res, next) => {
    try {
        
        const token = req.headers.authorization.split(' ')[1];
        
        // let decodedData = jwt.decode(token);
        // console.log('decoded token in middleware', decodedData)
        req.userId = token;

        next();

    } catch (error) {
        console.log(error);
    }
}

export default auth;