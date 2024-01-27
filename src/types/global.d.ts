import { User } from "../mongoose/models";

export {};

type UserType = InstanceType<typeof User>;

declare global {
    interface CustomError extends Error {
        status: number;
        code?: number;
    }
    namespace Express {
        interface Request {
          user?: UserType;
        }
    }
}
