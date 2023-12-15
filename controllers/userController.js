const User = require("../models/user");

const userController = {
  registerUser: async (req, res) => {
    try {
      const newUser = new User(req.body);
      const user = await newUser.save();
      res.send("User Registered Successfully");
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  },

  checkExistingEmail: async (req, res) => {
    try {
      const { email } = req.body;
      const user = await User.findOne({ email });

      if (user) {
        return res.json({ exists: true });
      } else {
        return res.json({ exists: false });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  },

  loginUser: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email: email, password: password });
      if (user) {
        const temp = {
          name: user.name,
          email: user.email,

          _id: user._id,
        };
        res.send(temp);
      } else {
        return res.status(400).json({ message: "Login Failed" });
      }
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  },

  getAllUsers: async (req, res) => {
    try {
      const users = await User.find();
      res.send(users);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: error });
    }
  },
};

module.exports = userController;
