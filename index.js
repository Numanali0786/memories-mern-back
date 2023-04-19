import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import env from "dotenv";
env.config();

import postRoutes from "./routes/posts.js";
import userRouter from "./routes/user.js";

const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

// testing
app.use(cors());

// deploying
// app.use(
//   cors({
//     origin: "https://memories-react-front.onrender.com",
//   })
// );

app.use("/posts", postRoutes);
app.use("/user", userRouter);

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("home");
});

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server Running on Port: http://localhost:${PORT}`)
    )
  )
  .catch((error) => console.log(`${error} did not connect`));

mongoose.set("useFindAndModify", false);
