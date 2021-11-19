import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


import UserModal from '../models/user.js';

export const signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await UserModal.findOne({ email });

        if(!existingUser) return res.status(404).json({ message: "Përdoruesi nuk ekziston."});

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

        if(!isPasswordCorrect) return res.status(400).json({ message: "Kredencialet e pavlefshme."});

        const token = jwt.sign({ email: existingUser.email, id: existingUser._id, }, 'test', { expiresIn: "1h" });

        res.status(200).json({ result: existingUser, token });

    } catch (err) {
        res.status(500).json({ message: 'Dicka shkoi keq.' });
    }
};

export const signup = async (req, res) => {
    const { firstName, lastName, email, password, confirmPassword } = req.body;

    try {
        const existingUser = await UserModal.findOne({ email });

        if(existingUser) return res.status(400).json({ message: "Përdoruesi ekziston tashmë." });

        if(password !== confirmPassword) return res.status(400).json({ message: "Fjalëkalimet nuk përputhen." });

        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await UserModal.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` });

        const token = jwt.sign({ email: result.email, id: result._id, }, 'test', { expiresIn: "1h" });

        res.status(201).json({ result, token });

    } catch (error) {
        res.status(500).json({ message: 'Dicka shkoi keq.' });

        console.log(error);
    }
};