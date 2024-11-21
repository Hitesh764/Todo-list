const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userModel = require("../Model/userModel.js");

const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const exitUser = await userModel.findOne({ email });
    if (exitUser) {
      return res.status(400).json({ message: "user already exit !" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    req.body.password = hashPassword;
    const newUser = new userModel(req.body);

    const user = await newUser.save();

    const token = jwt.sign(
      {
        email: user.email,
        id: user._id,
      },
      process.env.JWT_KEY,
      { expiresIn: "1h" }
    );

    res.status(200).json({ user, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user (case-insensitive email match)
    const user = await userModel.findOne({
      email: { $regex: new RegExp(`^${email}$`, "i") },
    });

    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    // Validate password
    const validity = await bcrypt.compare(password, user.password);
    if (!validity) {
      return res.status(400).json({ message: "Password does not match" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { email: user.email, id: user._id },
      process.env.JWT_KEY,
      { expiresIn: "1h" }
    );

    return res.status(200).json({ user, token });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


const getUser = async(req, res) =>{

  try {

    const token = req.headers.authorization?.split(" ")[1];

    if(!token){
      return res.status(401).json({message: "Unauthorized"});
    }

    const decode = jwt.verify(token, process.env.JWT_KEY);

    const user = await userModel.findById(decode.id, "username email");

    if(!user){
      return res.status(404).json({message: "user not found"});
    }

    res.status(200).json({username: user.username, email: user.email})
    
  } catch (error) {
    res.status(500).json({message: error.message});
    
  }

}

module.exports = { registerUser, login, getUser };
