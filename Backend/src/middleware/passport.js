import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';

function initialize(passport, get_user_by_email, get_user_by_id) {
 // Function that will authenticate the user
 // done needs to be called when we are done
    const authenticateUser = (email, password, done) => {
        const user = get_user_by_email(email);
        if (!user) return done(null, false, { message: 'No user with that email'});
        
        bcrypt.compare(password, user.password)
        .then((result) => {
            if(result) return done(null, user); //return the user
            else return done(null, false, {message: 'password is incorrect'})
            
        })
        .catch((error )=> {
            return done(error)
        })

    }
    
    // Configure local strategy
    passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password' // Default
    }, authenticateUser));
    // Serialize user to store inside of a session
    passport.serializeUser((user, done) => {
    console.log("Serializing user");
    return done(null, user.id);
    });
    // Deserialize user based on information stored in the session
    passport.deserializeUser((id, done) => {
    console.log("Deserializing user");
    return done(null, get_user_by_id(id));
    });
}
export default initialize;
