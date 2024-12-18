import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { CommentServices } from './comments.service';

// create a comment
const createComment = catchAsync(async (req, res) => {
  const result = await CommentServices.createCommentIntoB(req.user, req.body);

  // send response
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Comment is created successfully!',
    data: result,
  });
});

// get all comments by post
const getAllComments = catchAsync(async (req, res) => {
  const { postId } = req.params;
  const result = await CommentServices.getAllCommentsFromDB(postId, req.query);

  // send response
  res
    .status(result?.result?.length ? httpStatus.OK : httpStatus.NOT_FOUND)
    .json({
      success: result?.result?.length ? true : false,
      statusCode: result?.result?.length ? httpStatus.OK : httpStatus.NOT_FOUND,
      message: result?.result?.length
        ? 'Comments are retrieved successfully!'
        : 'No Data Found!',
      data: result?.result,
      meta: result?.meta,
    });
});

// update comment
const updateComment = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CommentServices.updateCommentIntoDB(
    id,
    req.body,
    req.user,
  );

  // send response
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Comment is updated successfully!',
    data: result,
  });
});

// delete comment
const deleteComment = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CommentServices.deleteCommentFromDB(id);

  // send response
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Comment is deleted successfully!',
    data: result,
  });
});

export const CommentControllers = {
  createComment,
  getAllComments,
  updateComment,
  deleteComment,
};
