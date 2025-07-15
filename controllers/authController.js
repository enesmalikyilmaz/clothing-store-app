const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

exports.register = async (req, res) => {
    const { name, email, password } = req.body; 

    const alreadyUser = await User.findOne({ email });
    if (alreadyUser) {
        return res.status(400).json({ message: "Kullanıcı zaten kayıtlı" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
        name,
        email,
        password: hashedPassword,
    });

    return res.status(201).json({ message: "Kullanıcı oluşturuldu", user: newUser });


    };

exports.login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        return res.status(400).json({ message: "Kullanıcı Bulunamadı" });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
        return res.status(400).json({ message: "Geçersiz şifre" });
    }

    console.log("JWT_SECRET:", JWT_SECRET);


    const token = jwt.sign(
        { 
            id: user.id, 
            role : user.role 
        }, JWT_SECRET, { expiresIn: '1d' });

    return res.status(200).json({ message: "Giriş başarılı", token });


};