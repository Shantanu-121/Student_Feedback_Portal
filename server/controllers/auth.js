const User = require("../models/User");
const jwt = require("jsonwebtoken");
const cookie = require("cookie");
const OTP = require("../models/OTP");
const bcrypt = require("bcrypt");
const otpGenerator = require("otp-generator");
const nodemailer = require("nodemailer");

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.json({
        error: "User not registered.",
      });
    }
    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign(
        { email: user.email, id: user._id },
        process.env.JWT_SECRET,
        {
          expiresIn: "2hr",
        }
      );
      //Ek Json Web Token banao aur usko cookie me save krdo.. saves local storage.. server pe seedhe save so
      //that no login required with every request
      user.token = token;
      user.password = undefined;

      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };

      res.cookie("token", token, options).status(200).json({
        message: "Logged In Successfully.",
        user: user,
      });
    } else {
      return res.status(400).json({
        error: "Wrong password.",
      });
    }
  } catch (error) {
    return res.status(401).json({
      error: "Error while logging in.",
    });
  }
};

exports.signup = async (req, res) => {
  try {
    const { firstName, lastName, email, password, confirmPassword, otp } =
      req.body;

    const existing_user = await User.findOne({ email: email });
    if (existing_user) {
      return res.status(400).json({
        message: "Email address already registered.",
      });
    }

    const recent_otp = await OTP.find({
      //find will give all Otps of the email
      email,
    })
      .sort({ createdAt: -1 })
      .limit(1); //order by ki jagah yha sort and limit toh same as MySQL

    if (recent_otp.length === 0) {
      return res.status(401).json({ error: "Otp not found." });
    }

    if (String(otp) !== String(recent_otp[0].otp)) {
      return res.status(401).json({
        error: "Otp Invalid.",
      });
    }

    const hashed_password = await bcrypt.hash(password, 10);

    const new_user = await User.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hashed_password,
    });

    return res.status(200).json({
      message: "User registered successfully.",
      new_user,
    });
  } catch (error) {
    return res.json({
      error: error,
      message: "Error in Signing in,",
    });
  }
};

exports.sendotp = async (req, res) => {
  try {
    const { email } = req.body;
    const existing_user = await User.findOne({ email: email });
    if (existing_user) {
      return res.status(400).json({
        message: "User already registered",
        user: existing_user,
      });
    }

    let new_otp = otpGenerator.generate(6, {
      specialChars: false,
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
    });
    let result = await OTP.findOne({ otp: new_otp });
    while (result) {
      new_otp = otpGenerator.generate(6, {
        specialChars: false,
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
      });
      result = await OTP.findOne({ otp: new_otp });
    }

    await OTP.create({
      otp: new_otp,
      email: email,
    });

    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    // Wrap in an async IIFE so we can use await.
    const info = await transporter.sendMail({
      from: "Student feedback Portal",
      to: `${email}`,
      subject: "OTP Verification",
      text: "Please verify your email with us", // plain‑text body
      html: `<h3>Your OTP for email verification is ${new_otp}</h3>`, // HTML body
    });

    console.log("Message sent:", info.messageId);

    return res.status(200).json({
      otp: new_otp,
      message: "Otp generated and sent successfully",
    });
  } catch (error) {
    return res.status(401).json({
      error: error,
      message: "Error in OTP Genertaion",
    });
  }
};
