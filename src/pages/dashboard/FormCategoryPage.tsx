import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Container from "../../components/Container";
import Text from "../../components/Text";
import { useCategoryStore } from "../../store/category";
import { createCategory } from "../../libs/category";

const EditCategoryPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const { fetchCategoryById, selectedCategory, editCategory, loading, error } =
    useCategoryStore();
  const [name, setName] = useState<string>(""); // State for category name
  console.log({ selectedCategory });

  useEffect(() => {
    if (id && id !== "new") {
      fetchCategoryById(id); // Fetch category when component mounts
    }
  }, [id, fetchCategoryById]);

  useEffect(() => {
    // Set initial value when selectedCategory is loaded
    if (selectedCategory) {
      setName(selectedCategory.name || ""); // Populate the name input with the selected category name
    }
  }, [selectedCategory]);

  const handleSave = async () => {
    // mode edit
    if (selectedCategory) {
      try {
        await editCategory(id!, name); // Call editCategory from the store with the new name
        navigate("/dashboard/category"); // Navigate back to category list
      } catch (error) {
        console.error("Error updating category:", error);
      }
    }
    // mode add
    else {
      try {
        await createCategory(name);
        navigate("/dashboard/category");
      } catch (error) {
        console.error("Error updating category:", error);
      }
    }
  };

  return (
    <Container className="flex flex-col gap-10 p-10">
      <Text variant="title">Edit Category</Text>

      {loading ? (
        <div className="h-24 animate-pulse rounded-3xl bg-slate-200"></div>
      ) : (
        <div className="flex flex-col gap-4">
          {/* Input for category name */}
          <input
            value={name}
            onChange={(e) => setName(e.target.value)} // Update name state on input change
            type="text"
            placeholder="Category Name"
            className="w-full rounded-lg border border-gray-300 p-3 text-gray-800 focus:outline-none"
          />
        </div>
      )}

      {error && <p className="text-red-500">{error}</p>}

      <button
        onClick={handleSave}
        className="w-fit self-end rounded-xl bg-primary px-4 py-2 transition-all hover:bg-blue-400"
      >
        Save
      </button>
    </Container>
  );
};

export default EditCategoryPage;
