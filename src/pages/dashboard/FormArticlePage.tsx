import { useNavigate, useParams } from "react-router-dom";
import Container from "../../components/Container";
import Text from "../../components/Text";
import { CATEGORY_LIST } from "../../constants/category";
import { useArticleStore } from "../../store/article";
import { useEffect, useState } from "react";
import { uploadFile } from "../../libs/upload";
import { createArticle, editArticle } from "../../libs/article";

const EditArticlePage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { fetchArticleById, selectedArticle, loading, error } =
    useArticleStore();

  const [title, setTitle] = useState<string>(""); // State for title
  const [description, setDescription] = useState<string>(""); // State for description
  const [category, setCategory] = useState<number | null>(null); // State for category
  const [coverImageUrl, setCoverImageUrl] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    if (!id || id === "new") return;
    fetchArticleById(id);
  }, [id]);

  useEffect(() => {
    // Set initial values when selectedArticle is loaded
    if (selectedArticle) {
      setTitle(selectedArticle.title || "");
      setDescription(selectedArticle.description || "");
      setCategory(selectedArticle.category?.id || null);
      setCoverImageUrl(selectedArticle.cover_image_url || null);
    }
  }, [selectedArticle]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };
  console.log("Selected category:", category);

  const handleSave = async () => {
    let uploadedImageUrl = coverImageUrl;

    // Fungsi untuk meng-upload gambar
    const handleImageUpload = async (file: File) => {
      try {
        const uploadResult = await uploadFile(file);
        if (!uploadResult) {
          alert("Upload Failed!");
          return null;
        }
        console.log("Image uploaded successfully:", uploadResult.url);
        return uploadResult.url;
      } catch (error) {
        console.error("Error uploading image:", error);
        return null;
      }
    };

    // Proses jika dalam mode edit
    if (selectedArticle) {
      // Jika user ingin mengganti cover
      if (file) {
        uploadedImageUrl = await handleImageUpload(file);
        if (!uploadedImageUrl) return;
      }

      // Simpan perubahan artikel
      try {
        await editArticle(
          id!,
          title,
          description,
          uploadedImageUrl || selectedArticle?.cover_image_url,
          category!,
        );
        navigate("/dashboard/article");
      } catch (error) {
        console.error("Error updating article:", error);
      }
    }
    // Proses jika dalam mode create
    else {
      try {
        if (!file || !category) return;
        uploadedImageUrl = await handleImageUpload(file);
        if (!uploadedImageUrl) return;
        // Logika untuk create article jika diperlukan bisa ditambahkan di sini
        await createArticle(title, description, uploadedImageUrl, category);

        navigate("/dashboard/article");
      } catch (error) {
        console.error("Error updating article:", error);
      }
    }
  };

  return (
    <Container className="flex flex-col gap-10 p-10">
      <Text variant="title">
        {selectedArticle ? "Edit" : "Add New"} Article
      </Text>

      {loading ? (
        <div className="h-96 animate-pulse rounded-3xl bg-slate-200"></div>
      ) : (
        <div className="flex flex-col gap-4">
          {/* Input for title */}
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)} // Update title state on input change
            type="text"
            placeholder="Title"
            className="w-full rounded-lg border border-gray-300 p-3 text-gray-800 focus:outline-none"
          />

          {/* Textarea for description */}
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)} // Update description state
            placeholder="Description"
            className="w-full rounded-lg border border-gray-300 p-3 text-gray-800 focus:outline-none"
          />

          {/* Dropdown for category */}
          <select
            onChange={(e) => {
              const selectedCategory = parseInt(e.target.value) || null;
              setCategory(selectedCategory);
            }}
            className="w-full rounded-lg border border-gray-300 p-3 text-gray-800 focus:outline-none"
          >
            <option value="">Choose Category</option>
            {CATEGORY_LIST.data.map((category, index) => (
              <option
                key={index}
                value={category.id}
                selected={
                  selectedArticle
                    ? category.id === selectedArticle.category?.id
                    : false
                }
              >
                {category.name}
              </option>
            ))}
          </select>

          {/* Display current cover image if exists */}
          {coverImageUrl && (
            <div>
              <Text variant="small-description" className="mt-4">
                Current Cover Image
              </Text>
              <img
                src={coverImageUrl}
                alt="Cover"
                className="aspect-video h-auto w-96 rounded-lg"
              />
            </div>
          )}

          {/* Input for uploading a new cover image */}
          <Text variant="small-description" className="mt-4">
            Upload New Cover Image
          </Text>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange} // Handle file input change
            className="w-full rounded-lg border border-gray-300 p-3 text-gray-800 focus:outline-none"
          />
        </div>
      )}
      {error && <p>{error}</p>}

      <button
        onClick={handleSave}
        className="w-fit self-end rounded-xl bg-primary px-4 py-2 transition-all hover:bg-blue-400"
      >
        Save
      </button>
    </Container>
  );
};

export default EditArticlePage;
