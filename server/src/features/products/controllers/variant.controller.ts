// import { Request, Response } from "express";
// import { VariantDTO } from "../dto/products.dto";
// import VariantService from "../services/variant.service";
// import { CreatedSuccess } from "../../../core";

// class VariantController {
//   createVariant = async (req: Request, res: Response) => {
//     const variant: VariantDTO = req.body;

//     const newVariant = await VariantService.createVariant(variant);

//     new CreatedSuccess({
//       data: newVariant,
//     }).send(res);
//   };
// }

// export default new VariantController();
