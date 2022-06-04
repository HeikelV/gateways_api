require("dotenv").config();
const mongoose = require("mongoose");

const createServer = require("./server");


mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB Connected!!");
    const port = process.env.PORT || 5000;
    const app = createServer();
    app.listen(port, () => {
      console.log(`Listening on port ${port}`);
    });
  });
