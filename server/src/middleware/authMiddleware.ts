import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

interface DecodedToken extends JwtPayload {
  sub: string;
  "custom:role"?: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        role: string;
      };
    }
  }
}

export const authMiddleware = (allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    try {
      const decodedToken = jwt.decode(token) as DecodedToken;
      const userRole = decodedToken["custom:role"] || "";
      req.user = {
        id: decodedToken.sub,
        role: userRole,
      };

      if (!allowedRoles.includes(userRole.toLowerCase())) {
        res.status(403).json({ message: "Forbidden" });
        return;
      }
    } catch (error) {
      console.error("Failed to decode token", error);
      res.status(400).json({ message: "Invalid token" });
      return;
    }

    next();
  };
};
