const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const database = require("./config/database");
const auth = require("./routes/auth");
const courses = require("./routes/courses");
const ratings = require("./routes/ratings");

//dotenv, database dono ko config karo
dotenv.config();

database.connect();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use("/api/v1/auth", auth);
app.use("/api/v1/courses", courses);
app.use("/api/v1/ratings", ratings);

//login, signup, crud courses, crud rating and reviews

app.get("/", (req, res) =>
  res.json({
    data: "Backend setup done.",
  })
);
app.listen(PORT, () => console.log(`Listening at Port Number: ${PORT}`));
