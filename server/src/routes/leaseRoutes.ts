import express from "express";
import { getLeases, getLeasePayments } from "../controllers/leaseControllers";
import { MANAGER_ROLE, TENANT_ROLE } from "../lib/constants";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/", authMiddleware([MANAGER_ROLE, TENANT_ROLE]), getLeases);
router.get(
  "/:id/payments",
  authMiddleware([MANAGER_ROLE, TENANT_ROLE]),
  getLeasePayments
);

export default router;
