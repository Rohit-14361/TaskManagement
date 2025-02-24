const { decodeToken } = require("../controller/auth");

exports.isAuth = async (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.json({
      message: "User not authenticatted",
    });
  }
  //   req.user=user
  const tokenInfo = decodeToken(token);
  if (!tokenInfo) {
    return res.json({
      message: "Invalid token",
    });
  }

  //   token ka user db hai ya ni
  const user = await UserModel.findOne({ email: tokenInfo.email });
  if (!user) {
    return res.json({
      message: "User with email doesn't exists",
    });
  }
  req.user = user;
  next();
};

// middleware add -create-todo

// controller-userid(todo)
