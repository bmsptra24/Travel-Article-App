import { useNavigate } from "react-router-dom";
import Container from "../../components/Container";
import Text from "../../components/Text";

const EditCategoryPage = () => {
  const navigate = useNavigate();
  const handleSave = async () => {
    navigate("/dashboard/category");
  };
  return (
    <Container className="flex flex-col gap-10 p-10">
      <Text variant="title">Edit Category</Text>

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

export default EditCategoryPage;
