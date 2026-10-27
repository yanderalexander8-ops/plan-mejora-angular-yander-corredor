// Reacciones de una publicación
export interface PostReactions {
  likes: number;
  dislikes: number;
}

// Una publicación de DummyJSON
export interface Post {
  id: number;
  title: string;
  body: string;
  tags: string[];
  reactions: PostReactions;
  views: number;
  userId: number;
}

// Respuesta de GET /posts y GET /posts/search
export interface PostsResponse {
  posts: Post[];
  total: number;
  skip: number;
  limit: number;
}

// Datos que envía el formulario (crear / editar)
export interface PostPayload {
  title: string;
  body: string;
  tags: string[];
  userId: number;
}

// Respuesta de DELETE /posts/{id}
export interface DeletedPost extends Post {
  isDeleted: boolean;
  deletedOn: string;
}
