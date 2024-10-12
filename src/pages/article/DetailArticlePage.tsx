import { useParams } from "react-router-dom";
import Container from "../../components/Container";
import Text from "../../components/Text";
import { useEffect } from "react";
import { useArticleStore } from "../../store/article";

const DetailArticlePage = () => {
  const { id } = useParams<{ id: string }>();

  const { fetchArticleById, selectedArticle, loading, error } =
    useArticleStore();

  useEffect(() => {
    if (!id) return;
    fetchArticleById(id);
  }, [fetchArticleById, id]);

  return (
    <Container className="flex max-w-[60rem] flex-col gap-10 p-4 py-10">
      {selectedArticle && loading && (
        <div className="h-96 animate-pulse rounded-3xl bg-slate-200"></div>
      )}
      {error && <p>{error}</p>}
      {selectedArticle && (
        <>
          <Text variant="title" className="text-center">
            {selectedArticle.title}
          </Text>
          <img
            src={selectedArticle.cover_image_url}
            alt="article-cover"
            className="aspect-video w-full rounded-3xl object-cover"
          />
          <Text variant="description">{selectedArticle.description}</Text>
        </>
      )}
    </Container>
  );
};

export default DetailArticlePage;
