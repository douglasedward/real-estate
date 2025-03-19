import express from "express";
import {
  createApplication,
  listApplications,
  updateApplication,
} from "../controllers/applicationControllers";
import { authMiddleware } from "../middleware/authMiddleware";
import { MANAGER_ROLE, TENANT_ROLE } from "../lib/constants";

const router = express.Router();

router.get("/", authMiddleware([MANAGER_ROLE, TENANT_ROLE]), listApplications);
router.post("/", authMiddleware([TENANT_ROLE]), createApplication);
router.put("/:id", authMiddleware([MANAGER_ROLE]), updateApplication);

export default router;
