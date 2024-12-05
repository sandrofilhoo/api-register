import express from "express";
import dotenv from "dotenv";
import routes from "./src/router/index"

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

app.use(routes())
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ error: "Something went wrong!" });
});
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});