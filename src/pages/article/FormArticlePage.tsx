import { useNavigate } from "react-router-dom";
import Container from "../../components/Container";
import Text from "../../components/Text";
import { CATEGORY_LIST } from "../../constants/category";

const EditArticlePage = () => {
  const navigate = useNavigate();
  const handleSave = async () => {
    navigate("/article/edit");
  };
  return (
    <Container className="flex flex-col gap-10 p-10">
      <Text variant="title">Edit Article</Text>

      <div className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Title"
          className="w-full rounded-lg border border-gray-300 p-3 text-gray-800 focus:outline-none"
        />

        <textarea
          placeholder="Description"
          className="w-full rounded-lg border border-gray-300 p-3 text-gray-800 focus:outline-none"
        />

        {/* Dropdown untuk kategori */}
        <select className="w-full rounded-lg border border-gray-300 p-3 text-gray-800 focus:outline-none">
          {CATEGORY_LIST.data.map((category, index) => (
            <option key={index} value={category.documentId}>
              {category.name}
            </option>
          ))}
        </select>

        {/* Input untuk upload gambar */}
        <Text variant="small-description" className="mt-4">
          Cover Image
        </Text>
        <input
          type="file"
          accept="image/*"
          className="w-full rounded-lg border border-gray-300 p-3 text-gray-800 focus:outline-none"
        />
      </div>

      <button
        onClick={handleSave}
        className="bg-primary w-fit self-end rounded-xl px-4 py-2 transition-all hover:bg-blue-400"
      >
        Save
      </button>
    </Container>
  );
};

export default EditArticlePage;
