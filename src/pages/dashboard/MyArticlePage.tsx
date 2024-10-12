import { Link } from "react-router-dom";
import Container from "../../components/Container";
import { ARTICLES_LIST } from "../../constants/article";
import Text from "../../components/Text";

const MyArticlePage = () => {
  return (
    <Container className="flex flex-col gap-10 p-10">
      <div className="flex justify-between">
        <Text variant="title">My Articles</Text>
        <Link to={"new"}>
          <Text
            variant="small-description"
            className="bg-primary cursor-pointer rounded-xl px-4 py-2 transition-all hover:bg-blue-400"
          >
            Add
          </Text>
        </Link>
      </div>
      <div className="flex flex-col gap-2">
        {ARTICLES_LIST.data.map((article, index) => (
          <Link
            to={"/article/" + article.documentId}
            key={index}
            className="flex items-center justify-between gap-4 border-t pt-2"
          >
            <div>
              <Text variant="description" className="font-bold">
                {article.title}
              </Text>
              <Text variant="description" className="line-clamp-1">
                {article.description}
              </Text>
            </div>

            <div className="flex gap-2">
              <Link to={article.documentId}>
                <Text
                  variant="small-description"
                  className="bg-primary rounded-xl px-4 py-2 transition-all hover:bg-blue-400"
                >
                  Edit
                </Text>
              </Link>

              <Text
                variant="small-description"
                className="rounded-xl bg-red-400 px-4 py-2 transition-all hover:bg-red-500"
              >
                Delete
              </Text>
            </div>
          </Link>
        ))}
      </div>
    </Container>
  );
};

export default MyArticlePage;
