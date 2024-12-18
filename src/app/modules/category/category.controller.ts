import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { CategoryServices } from './category.service';

// create a category
const createCategory = catchAsync(async (req, res) => {
  const result = await CategoryServices.createCategoryIntoDB(req.body);
  // send response
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Category is created successfully!',
    data: result,
  });
});

// get all category
const getAllCategories = catchAsync(async (req, res) => {
  const result = await CategoryServices.getAllCategoriesFromDB(req.query);
  // send response
  res
    .status(result?.result?.length ? httpStatus.OK : httpStatus.NOT_FOUND)
    .json({
      success: result?.result?.length ? true : false,
      statusCode: result?.result?.length ? httpStatus.OK : httpStatus.NOT_FOUND,
      message: result?.result?.length
        ? 'Categories are retrieved successfully!'
        : 'No Data Found!',
      data: result?.result,
      meta: result?.meta,
    });
});

// update a category
const updateCategory = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CategoryServices.updateCategoryIntoDB(id, req.body);
  // send response
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Category is updated successfully!',
    data: result,
  });
});

export const CategoryControllers = {
  getAllCategories,
  createCategory,
  updateCategory,
};
