import { Schema, model } from 'mongoose';
import { IPost, PostStatus } from './post.interface';

const postSchema = new Schema<IPost>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    content: {
      type: String,
      required: [true, 'Content is required'],
    },
    excerpt: {
      type: String,
      trim: true,
      required: [true, 'Excerpt is required'],
    },
    slug: {
      type: String,
      lowercase: true,
      trim: true,
      required: [true, 'Slug is required'],
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Author is required'],
    },
    images: {
      type: String,
      default: '',
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      trim: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    status: {
      type: String,
      enum: {
        values: [...Object.values(PostStatus)],
        message: '{VALUE} is not a valid status',
      },
      default: PostStatus.DRAFT,
    },
    views: {
      type: Number,
      default: 0,
    },
    likes: {
      type: Number,
      default: 0,
    },
    targetAmount: {
      type: Number,
      default: 0,
    },
    raisedAmount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

postSchema.index({ title: 'text', category: 1 });

export const Post = model<IPost>('Post', postSchema);