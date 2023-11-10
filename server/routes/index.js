const { Router } = require('express');
const router = Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const Cryptr = require('cryptr');
const cryptr = new Cryptr('coppelSecret');

router.get('/', (req, res) => res.send('Hello world'));

router.post('/register', async (req, res) =>{
    const {firstName, lastName, email, password, typeOfPassword, phoneNumber } = req.body;

    const checkUser = await User.findOne({email});

    let hashedPassword = '';

    if (checkUser) return res.status(401).send("El correo ya está registrado");

    if (typeOfPassword == 'simetrico'){
        hashedPassword = cryptr.encrypt(password);
    }

    if (typeOfPassword == 'asimetrico') {
        hashedPassword = bcrypt.hashSync(password, saltRounds);
    }


    const newUser = new User({firstName, lastName, email, password: hashedPassword, phoneNumber});
    await newUser.save();
    
    const token = jwt.sign({_id: newUser._id}, 'coppelSecret')
    res.status(200).json({token});
});

router.post('/signin', async (req, res) =>{
    const { email, password, typeOfPassword } = req.body;
    const user = await User.findOne({email});

    if (!user) return res.status(401).send("El correo no existe");

    if (typeOfPassword == 'simetrico'){
        if (password != cryptr.decrypt(user.password)) return res.status(401).send("Contraseña incorrecta");
    }
    
    if (typeOfPassword == 'asimetrico') {
        if (!bcrypt.compareSync(password, user.password)) return res.status(401).send("Contraseña incorrecta");
    }

    const token = jwt.sign({_id: user._id}, 'coppelSecret');
    return res.status(200).json({token});
});



module.exports = router;