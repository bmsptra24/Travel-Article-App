import Container from "../../components/Container";
import Text from "../../components/Text";
import { Link } from "react-router-dom";
import ArticleCommentsPieChart from "../../components/Chart/ArticleCommentsPieChart";
import { useArticleStore } from "../../store/article";
import { useEffect } from "react";

const DashboardPage = () => {
  const { articles, fetchTopArticlesByComments, loading, error } =
    useArticleStore();

  useEffect(() => {
    fetchTopArticlesByComments();
  }, [fetchTopArticlesByComments]);

  return (
    <Container className="p-10">
      <section className="flex flex-col gap-10">
        <div className="flex flex-col gap-2">
          <Text variant="title">Dashboard</Text>
        </div>

        <div className="flex justify-center">
          <ArticleCommentsPieChart />
        </div>
        <Text variant="subtitle">List article with the most comments</Text>

        {/* Top 5 Aarticle */}
        <div className="flex flex-col gap-4">
          {articles && loading && (
            <div className="h-96 animate-pulse rounded-3xl bg-slate-200"></div>
          )}
          {error && <p>{error}</p>}
          {articles?.data.map((article, index) => (
            <Link
              to={"/article/" + article.documentId}
              key={index}
              className="flex justify-between gap-4 border-t pt-2"
            >
              <div>
                <Text variant="description" className="font-bold">
                  {article.title}
                </Text>
                <Text variant="description" className="line-clamp-1">
                  {article.description}
                </Text>
              </div>
              <Text className="text-nowrap">
                {article.comments?.length} Coments
              </Text>
            </Link>
          ))}
        </div>
      </section>
    </Container>
  );
};

export default DashboardPage;
