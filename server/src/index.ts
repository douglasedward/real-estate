import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
/* MIDDLEWARE */
import { authMiddleware } from "./middleware/authMiddleware";
/* ROUTE IMPORT */
import tenantRoutes from "./routes/tenantRoutes";
import managerRoutes from "./routes/managerRoutes";

/* CONSTS */
const TENANT_ROLE = "tenant";
const MANAGER_ROLE = "manager";

/* CONFIGURATIONS */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/* ROUTES */
app.get("/", (req, res) => {
  res.send("This is home route");
});

app.use("/tenants", authMiddleware([TENANT_ROLE]), tenantRoutes);
app.use("/managers", authMiddleware([MANAGER_ROLE]), managerRoutes);

/* SERVER */
const port = process.env.PORT || 3030;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
