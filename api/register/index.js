const express = require('express');
const router = express.Router();
const db = require('../../db/helpers/users');

router.post('/', (req, res) => {
    let { firstname, lastname, email, uid } = req.body;
    let image_id = 1;   // use default profile image until image upload is built
    
    let newUser = {
        firstname: firstname,
        lastname: lastname,
        email: email,  
        image_id: image_id,
        uid: uid
    };

    db.createUser(newUser)
        .then(response => {
            console.log('response from db insert newUser: ', response);
            res.status(200).json(response);
        })
        .catch(error => {  // catch error from insert new rep request
            console.log(error.message);
            res.status(500).json({message: error.message});
        })
})

module.exports = router;
