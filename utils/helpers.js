module.exports = {
    id_auth: (req, res) => {
        if(!req.session.user_id) {
            res.redirect('/login');
        } else {
            return req.session.user_id;
        }
        return;
    }
}