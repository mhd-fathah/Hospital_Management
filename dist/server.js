import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import Database from "./config/db.js";
dotenv.config();
import dashboardRoutes from "./routes/dashboardRoutes.js";
import doctorRoutes from "./routes/doctorRoutes.js";
import appoinmentRoutes from "./routes/appoinmentRoutes.js";
import patientRoutes from "./routes/patientRoutes.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = 3000;
const database = Database.getInstance();
database.connect();
app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "src", "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/", dashboardRoutes, doctorRoutes, appoinmentRoutes, patientRoutes);
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
