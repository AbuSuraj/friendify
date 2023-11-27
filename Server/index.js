import express from "express";
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/users.route.js";
import postRoutes from "./routes/posts.route.js";
import commentRoutes from "./routes/comments.route.js";
import likeRoutes from "./routes/likes.route.js";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();

app.use(express.json());
 
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Credentials", true);
    next();
  });
  app.use(express.json());
  app.use(
    cors({
      origin: "http://localhost:3000",
    })
  );

app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/likes", likeRoutes);

app.listen(5000, () => {
    console.log("API working!");
  });