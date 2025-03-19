import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getLeases = async (req: Request, res: Response): Promise<void> => {
  try {
    const leases = await prisma.lease.findMany({
      include: {
        tenant: true,
        property: true,
      },
    });

    if (leases.length === 0) {
      res.status(404).json({ message: "No leases found" });
      return;
    }

    res.status(200).json(leases);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error fetching leases: ${error.message}` });
  }
};

export const getLeasePayments = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const payments = await prisma.payment.findMany({
      where: { leaseId: Number(id) },
    });

    if (payments.length === 0) {
      res.status(404).json({ message: "No payments found" });
      return;
    }

    res.status(200).json(payments);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error fetching lease payments: ${error.message}` });
  }
};
