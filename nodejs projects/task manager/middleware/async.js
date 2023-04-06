//to replace the try catch error handlling in every controller
const asyncWrapper = (controller) => {
  return async (req, res, next) => {
    try {
      await controller(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

//diff way :
// asyncWrapper = (controller) => async (req, res, next) => {
//   try {
//     await controller(req, res, next);
//   } catch (error) {
//     next(error);
//   }
// };

module.exports = asyncWrapper;
