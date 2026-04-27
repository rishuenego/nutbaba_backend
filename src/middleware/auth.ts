import type { Request, Response, NextFunction } from 'express'

declare global {
  namespace Express {
    interface User {
      id: number
      google_id?: string
      email: string
      name: string
      password?: string
      phone?: string
      address?: string
      city?: string
      state?: string
      pincode?: string
    }
  }
}

export type AuthenticatedRequest = Request & { user: Express.User }

export function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.isAuthenticated && req.isAuthenticated() && req.user) {
    return next()
  }
  res.status(401).json({ success: false, message: 'Unauthorized' })
}

export function isOptionalAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  next()
}
