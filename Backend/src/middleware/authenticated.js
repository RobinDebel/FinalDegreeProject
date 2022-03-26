function is_authenticated(req, res, next) {
    if (req.isAuthenticated()) { // Function of passport
        return next(); // All is ok, on to next() which will then be our route handler
    }
    return res.send({
        message: 'You are not authenticated. This route is for logged in users only',
        secure: false
    });
}
export default is_authenticated;
