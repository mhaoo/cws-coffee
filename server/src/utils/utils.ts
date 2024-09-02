import { NextFunction, Request, Response } from "express";
import * as _ from "lodash";

export const handleAsync = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
};

export const getObjectFields = (fields: string[], obj: any) => {
  return _.pick(obj, fields);
};
