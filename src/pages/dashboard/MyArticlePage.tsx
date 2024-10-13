import { Link } from "react-router-dom";
import Container from "../../components/Container";
import Text from "../../components/Text";
import { useArticleStore } from "../../store/article";
import { useEffect } from "react";
import { getUser } from "../../libs/auth";

const MyArticlePage = () => {
  const { articles, fetchArticlesByUserId, loading, error, removeArticle } =
    useArticleStore();

  useEffect(() => {
    const userId = getUser()?.id;
    if (!userId) return;
    console.log({ userId });

    fetchArticlesByUserId(userId);
  }, [fetchArticlesByUserId]);

  return (
    <Container className="flex flex-col gap-10 p-10">
      <div className="flex justify-between">
        <Text variant="title">My Articles</Text>
        <Link to={"new"}>
          <Text
            variant="small-description"
            className="cursor-pointer rounded-xl bg-primary px-4 py-2 transition-all hover:bg-blue-400"
          >
            Add
          </Text>
        </Link>
      </div>
      <div className="flex flex-col gap-2">
        {articles && loading && (
          <div className="h-96 animate-pulse rounded-3xl bg-slate-200"></div>
        )}
        {error && <p>{error}</p>}

        {articles &&
          articles.data?.map((article, index) => (
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
                    className="rounded-xl bg-primary px-4 py-2 transition-all hover:bg-blue-400"
                  >
                    Edit
                  </Text>
                </Link>

                <Link to={""} onClick={() => removeArticle(article.documentId)}>
                  <Text
                    variant="small-description"
                    className="rounded-xl bg-red-400 px-4 py-2 transition-all hover:bg-red-500"
                  >
                    Delete
                  </Text>
                </Link>
              </div>
            </Link>
          ))}
      </div>
    </Container>
  );
};

export default MyArticlePage;
