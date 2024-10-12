import { useEffect } from "react";
import Card from "../../components/Card";
import Container from "../../components/Container";
import { useArticleStore } from "../../store/article";

const ArticlesPage = () => {
  const { articles, fetchArticles, loading, error } = useArticleStore();

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  return (
    <Container className="flex flex-col gap-16 p-16">
      {articles && loading && (
        <div className="h-96 animate-pulse rounded-3xl bg-slate-200"></div>
      )}
      {error && <p>{error}</p>}
      {articles &&
        articles?.data.map((item, index) => (
          <Card
            key={index}
            id={item.documentId}
            title={item.title}
            description={item.description}
            imageCover={item.cover_image_url}
          />
        ))}
    </Container>
  );
};

export default ArticlesPage;
