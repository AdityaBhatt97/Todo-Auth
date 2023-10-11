const jwt = require('jsonwebtoken')


const TokensSec = 'ab1559ed9981de94791d4376cef134fb856069b914210965691def6593b544973c8507e177c90c038b37f699803aeae09a13fe7b7dffc62788f772a8c54f2e98'


const verifyJWT = (req, res, next) => {
   
    // Getting the token in headers
    const authHeader = req.headers.token;

    // If it exist then verifying it else throw an error
    if(authHeader){

        const token = authHeader.split(" ")[1]
        
        jwt.verify(
            token,
            TokensSec,
            (err, user) => {
                    if (err){
                     
                return    res.status(403).json({ message: err})
            }
                req.user = user;
                next()
                }
                )
            } else {
                return res.status(401).json({message : "You are not authenticated!"})
            }
                
    }
    



module.exports =   verifyJWT 