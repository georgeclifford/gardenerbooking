module.exports = (req, res, next) => {
    const { username, password } = req.body;
  
    function validEmail(userEmail) {
      return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
    }
  
    if (req.path === "/register") {
      if (![username, password].every(Boolean)) {
        return res.status(401).json("Missing Credentials!");
      } else if (!validEmail(username)) {
        return res.status(401).json("Invalid Email!");
      }
    } else if (req.path === "/login") {
      if (![username, password].every(Boolean)) {
        return res.status(401).json("Missing Credentials!");
      } else if (!validEmail(username)) {
        return res.status(401).json("Invalid Email!");
      }
    }
  
    next();
  };