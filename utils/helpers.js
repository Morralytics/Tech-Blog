module.exports = {
    id_auth: (req, res, next) => {
        if(!req.session.loggedIn) {
            res.redirect('/login');
        } else {
            next();
        }
    },
    format_date: (date) => {
        return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
    }
}