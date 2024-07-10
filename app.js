const express = require("express");
const todoRoutes = require("./routes/todoRoutes");
const cookieParser = require("cookie-parser");
require("./config/todo-config");

const app = express();

app.use(express.json());
app.use(cookieParser()); 
app.use("/api", todoRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
