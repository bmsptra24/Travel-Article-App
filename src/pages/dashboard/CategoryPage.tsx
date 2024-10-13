import Container from "../../components/Container";
import Text from "../../components/Text";
import { Link } from "react-router-dom";
import { useCategoryStore } from "../../store/category";
import { useEffect } from "react";

const CategoryPage = () => {
  const { categories, fetchCategories, removeCategory } = useCategoryStore();

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);
  console.log({ categories });

  return (
    <div className="w-full">
      <Container className="p-10">
        <section className="flex flex-col gap-10">
          <div className="flex justify-between">
            <Text variant="title">Category</Text>

            <Link to={"new"}>
              <Text
                variant="small-description"
                className="rounded-xl bg-primary px-4 py-2 transition-all hover:bg-blue-400"
              >
                Add
              </Text>
            </Link>
          </div>

          {/* Top 5 Aarticle */}
          <div className="flex flex-col gap-4">
            {categories &&
              categories.data.map((category, index) => (
                <div
                  key={index}
                  className="flex w-full items-center justify-between gap-4 border-t pt-2"
                >
                  <div>
                    <Text
                      variant="description"
                      className="line-clamp-1 font-bold"
                    >
                      {category.name}
                    </Text>
                    <Text variant="description" className="line-clamp-1">
                      {category.description}
                    </Text>
                  </div>
                  <div className="flex h-fit gap-2">
                    <Link to={category.documentId}>
                      <Text
                        variant="small-description"
                        className="rounded-xl bg-primary px-4 py-2 transition-all hover:bg-blue-400"
                      >
                        Edit
                      </Text>
                    </Link>

                    <button onClick={() => removeCategory(category.documentId)}>
                      <Text
                        variant="small-description"
                        className="rounded-xl bg-red-400 px-4 py-2 transition-all hover:bg-red-500"
                      >
                        Delete
                      </Text>
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </section>
      </Container>
    </div>
  );
};

export default CategoryPage;
