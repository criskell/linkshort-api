import { config } from "dotenv";

config();

import app from "../src/app.js";

const PORT = process.env.APP_PORT || 3000;

app.listen(PORT, () => {
  console.log(`Ouvindo na porta ${PORT}`);
});