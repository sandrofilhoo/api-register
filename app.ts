import express from "express";
import cors from "cors";
import compression from "compression"
import dotenv from "dotenv";
import routes from "./src/router/index"

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;
app.use(
    cors({
      origin: ["http://localhost:5173"], // Alterar para o domínio específico em produção
      methods: ["GET", "POST", "PUT", "DELETE"],
      allowedHeaders: ["Content-Type", "Authorization"],
      credentials: true,
    })
  );
app.use(compression())
app.use(routes())
app.use(express.json());

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ error: "Something went wrong!" });
});
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});