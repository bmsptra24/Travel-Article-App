import { Category, Meta } from "./article";
import { User } from "./auth";

export interface CategoryData {
  id: number; // ID kategori
  documentId: string; // ID dokumen untuk kategori
  name: string; // Nama kategori
  description: string | null; // Deskripsi kategori (bisa null)
  createdAt: string; // Tanggal dan waktu pembuatan kategori
  updatedAt: string; // Tanggal dan waktu terakhir diperbarui
  publishedAt: string; // Tanggal dan waktu publikasi kategori
  locale: string | null; // Locale kategori (bisa null)
  user: User;
  category: Category | null;
  comments: Comment[];
  localizations: string[];
}

export interface CategoryResponse {
  data: CategoryData[];
  meta: Meta;
}

export interface CategoryByIdResponse {
  data: CategoryData;
  meta: Meta;
}
