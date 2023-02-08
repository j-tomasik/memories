import jwt from 'jsonwebtoken';

const auth = async (req, res, next) => {
    try {
        // console.log('req headers in middleware', req.headers)
        const token = req.headers.authorization.split(' ')[1];
        
        let decodedData = jwt.decode(token);

        req.userId = decodedData?.sub;

        next();

    } catch (error) {
        console.log(error);
    }
}

export default auth;