import { NextFunction, Request, Response } from "express";

export const checkParams = (params: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    console.log("Test probe: ", req.body);

    params.forEach((name) => {
      if (!req.body[name]) throw new Error(`Параметр: ${name} обов'язковий!`);
    });

    next();
  };
};
