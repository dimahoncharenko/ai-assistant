import { NextFunction, Request, Response } from "express";

export const checkParams = (params: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    console.log("Body probe: ", req.body);
    console.log("Headers probe: ", req.headers);
    console.log("Request probe: ", req);

    params.forEach((name) => {
      if (!req.body[name]) throw new Error(`Параметр: ${name} обов'язковий!`);
    });

    next();
  };
};
