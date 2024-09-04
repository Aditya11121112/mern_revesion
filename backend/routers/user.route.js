import express from "express";
import {
  create_user,
  get_profile,
  get_users,
  login,
  logout,
} from "../controllers/user.controller.js";
import auth_middleware from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/create_user", create_user);
router.post("/login", login);
router.post("/logout", logout);
router.get("/dashboard", auth_middleware, (req, res) => {
  res.status(200).json({
    message: "Access Granted",
    resp: req.user,
  });
});
router.get("/users", auth_middleware, get_users);
router.get("/profile", auth_middleware, get_profile);

export default router;
