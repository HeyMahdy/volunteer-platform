import jwt from 'jsonwebtoken'

const authMiddleware = (req,res,next) => {

    
    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(" ")[1]
    if(!token){
        res.status(401).json({
            message : "access denied"
        })
    }

    try{
              const DecodeToken = jwt.verify(token,'your-secret-key');
              req.userInfo = DecodeToken;
              next();

    }
    catch(error)
    {
        res.status(401).json({
            message :  "please login again"
        })
    }



    
}

export default authMiddleware