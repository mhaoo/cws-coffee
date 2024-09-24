// import { BadRequestError } from "@/core";
// import { OptionDTO } from "../dto/products.dto";
// import { Option, OptionValue } from "../models";

// export default class OptionService {
//   static createOption = async (optionDTO: OptionDTO) => {
//     try {
//       if (!optionDTO) {
//         throw new BadRequestError("Category name is required");
//       }

//       const option = await Option.create(optionDTO as Option);

//       if (optionDTO.values && optionDTO.values.length !== 0) {
//         const optionValues = optionDTO.values.map((value) => ({
//           optionId: option.id,
//           value: value.value,
//           priceAdjustment: value.priceAdjustment,
//         }));

//         await OptionValue.bulkCreate(optionValues as OptionValue[]);
//       }

//       return {
//         ...option.toJSON(),
//         values: optionDTO.values,
//       };
//     } catch (error) {
//       throw error;
//     }
//   };
// }
