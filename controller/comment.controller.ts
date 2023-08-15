import { Comment } from "../model/commentModel";

export const getAllCommentsController = async () => {
  const comment = await Comment.find();
  return comment;
};

export const postCommentController = async (
  comment: string,
  userId: string,
  blogId: string
) => {
  await Comment.create({ comment, user: userId, blog: blogId });
};

export const updateCommentController = async (
  comment: string,
  userId: string,
  commentId: string
) => {
  await Comment.findByIdAndUpdate(commentId, { comment });
};

export const deleteCommentController = async (commentId: string) => {
  await Comment.findByIdAndDelete(commentId);
};
