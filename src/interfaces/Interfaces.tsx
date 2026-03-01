export interface HomeBlog {
  id: string;
  title: string;
  description: string;
  category: string;
  views: number;
  image: string;
  created_at: string;
};

export interface BlogData {
  id: number;
  title: string;
  description: string;
  image: string;
  views: number;
  category: string;
}

export interface CommentType {
  id: string;
  username: string;
  comment: string;
  blogId: string;
  userId: string;
}