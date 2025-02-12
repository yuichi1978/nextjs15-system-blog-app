// 記事の型
export type Post = {
  id: string;
  title: string;
  content: string;
  topImage: string | null;
  createdAt: Date;
  author: {
    name: string;
  };
};

// props用
export type PostCardProps = { post: Post };
