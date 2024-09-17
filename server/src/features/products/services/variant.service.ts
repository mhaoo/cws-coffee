// import { BadRequestError } from "../../../core";
// import { VariantDTO } from "../dto/products.dto";
// import { Variant } from "../models";

// export default class VariantService {
//   static createVariant = async (variantDTO: VariantDTO) => {
//     try {
//       if (!variantDTO) {
//         throw new BadRequestError("Category name is required");
//       }

//       // Create category in database
//       const newVariant = await Variant.create(variantDTO as Variant);

//       return newVariant;
//     } catch (error) {
//       throw error;
//     }
//   };
// }
