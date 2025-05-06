import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../Models/User.js';

export const register = async (req, res) => {
    const { name, gmail, password } = req.body;

    try {
        let user = await User.findOne({ gmail });

        if (user) return res.status(400).json({ message: "User Already exist" });

        // Password validation
        if (!password || password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters long." });
        }
        if (!/[A-Za-z]/.test(password) || !/\d/.test(password)) {
            return res.status(400).json({ message: "Password must contain both letters and numbers." });
        }
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            return res.status(400).json({ message: "Password must contain at least one special character." });
        }

        const hashPass = await bcrypt.hash(password, 10);

        user = await User.create({ name, gmail, password: hashPass });

        return res.status(201).json({ message: "User Register Successfully..!", user });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


export const login = async (req, res) => {
    const { gmail, password } = req.body;

    try {
        let user = await User.findOne({ gmail });

        if (!user) return res.status(404).json({ message: "User not exist..!" });

        const validPass = await bcrypt.compare(password, user.password);

        if (!validPass) return res.status(401).json({ message: "Invalid credentials" });

        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET || "!@#$%^&*()",  // Use environment variable
            { expiresIn: '20d' }
        );

        return res.status(200).json({ message: `Welcome ${user.name}`, token });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const profile = async (req, res) => {
    return res.status(200).json({ user: req.user });
};
