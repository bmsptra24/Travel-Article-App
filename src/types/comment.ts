export interface Comment {
  id: number;
  documentId: string;
  content: string;
  createdAt: string; // ISO 8601 format date
  updatedAt: string; // ISO 8601 format date
  publishedAt: string; // ISO 8601 format date
  locale: string | null; // Nullable
}

export interface Pagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export interface Meta {
  pagination: Pagination;
}

export interface CommentsResponse {
  data: Comment[];
  meta: Meta;
}

export interface CommentsByIdResponse {
  data: Comment;
  meta: Meta;
}
