export {};
  
declare global {
    interface CustomError extends Error {
        status: number;
        code?: number;
    }
}