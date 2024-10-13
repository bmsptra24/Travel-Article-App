import { useParams } from "react-router-dom";
import Container from "../../components/Container";
import Text from "../../components/Text";
import { useEffect, useState } from "react";
import { useArticleStore } from "../../store/article";
import { useCommentStore } from "../../store/comment";
import { getCommentsList } from "../../libs/comment";

const DetailArticlePage = () => {
  const { id } = useParams<{ id: string }>();

  const [newComment, setNewComment] = useState<string>();

  const { fetchArticleById, selectedArticle, loading, error } =
    useArticleStore();
  const { createComment, setComments, comments } = useCommentStore();

  useEffect(() => {
    if (!id) return;

    fetchArticleById(id);
    getCommentsList().then((response) => {
      if (!response) return;
      setComments(response);
    });
  }, [fetchArticleById, id]);

  const handleAddComment = async () => {
    try {
      if (!newComment || !selectedArticle) return;
      await createComment(selectedArticle?.id, newComment);
    } catch (error) {
      console.error("Error updating article:", error);
    } finally {
      setNewComment(undefined);
    }
  };

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

      <div className="flex flex-col gap-4">
        <Text className="font-bold">Commentar</Text>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)} // Update title state on input change
          placeholder="Add comment..."
          className="w-full rounded-lg border border-gray-300 p-3 text-gray-800 focus:outline-none"
        />
        <button
          onClick={handleAddComment}
          className="w-fit self-end rounded-xl bg-primary px-4 py-2 transition-all hover:bg-blue-400"
        >
          Save
        </button>
      </div>

      <div className="flex flex-col gap-4">
        {comments &&
          comments.data?.map((comment, index) => (
            <div
              key={index}
              className="rounded-3xl border bg-neutral p-6 shadow-lg"
            >
              <Text>{comment.content}</Text>
            </div>
          ))}
      </div>
    </Container>
  );
};

export default DetailArticlePage;
