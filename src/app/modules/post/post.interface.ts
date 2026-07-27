import { Types } from "mongoose";


export enum PostStatus {
  DRAFT = "draft",
  PUBLISHED = "published",
  ARCHIVED = "archived"
}

export interface IPost {
  title: string;
  content: string;
  excerpt?: string;
  slug?: string;
  images?: string;          
  category: string;
  author?: Types.ObjectId;          
  tags: string[];                          
  status: PostStatus;
  views?: number;              
  likes?: number;              
  targetAmount?: number; 
  raisedAmount?: number;     
}