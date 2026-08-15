import type { Request, Response, NextFunction } from 'express';
export interface AuthedRequest extends Request {
    userId?: string;
}
export declare function requireAuth(req: AuthedRequest, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=auth.d.ts.map