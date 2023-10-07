const { Router } = require('express');
const router = Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;

router.get('/', (req, res) => res.send('Hello world'));

router.post('/register', async (req, res) =>{
    const {firstName, lastName, email, password } = req.body;

    const checkUser = await User.findOne({email});

    if (checkUser) return res.status(401).send("El correo ya está registrado");

    const hashedPassword = bcrypt.hashSync(password, saltRounds);

    const newUser = new User({firstName, lastName, email, password: hashedPassword});
    await newUser.save();
    
    const token = jwt.sign({_id: newUser._id}, 'coppelSecret')
    res.status(200).json({token});
});

router.post('/signin', async (req, res) =>{
    const { email, password } = req.body;
    const user = await User.findOne({email});
    console.log(user);
    if (!user) return res.status(401).send("El correo no existe");
    if (!bcrypt.compareSync(password, user.password)) return res.status(401).send("Contraseña incorrecta");

    const token = jwt.sign({_id: user._id}, 'coppelSecret');
    return res.status(200).json({token});
});



module.exports = router;