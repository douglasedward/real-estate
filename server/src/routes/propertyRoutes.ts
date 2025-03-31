import express from "express";
import {
  getProperty,
  getProperties,
  createProperty,
} from "../controllers/propertyControllers";
import { authMiddleware } from "../middleware/authMiddleware";
import { MANAGER_ROLE } from "../lib/constants";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = express.Router();

router.get("/", getProperties);
router.get("/:id", getProperty);
router.post(
  "/",
  authMiddleware([MANAGER_ROLE]),
  upload.array("photos"),
  createProperty
);

export default router;
