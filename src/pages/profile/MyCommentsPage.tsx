import Navbar from "../../components/Navbar";
import Container from "../../components/Container";
import Text from "../../components/Text";
import { Link } from "react-router-dom";
import { useArticleStore } from "../../store/article";
import { useEffect } from "react";

const MyCommentsPage = () => {
  const { articles, fetchArticles } = useArticleStore();
  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);
  console.log({ articles });

  return (
    <div>
      <Navbar />

      <Container className="p-10">
        <section className="flex flex-col gap-10">
          <div className="flex flex-col gap-2">
            <Text variant="title">Profile</Text>
          </div>
          {/* Top 5 Aarticle */}
          <div className="flex flex-col gap-4">
            <Text className="font-bold">My Comment</Text>
            {articles &&
              articles.data.map(
                (article, index) =>
                  article.comments?.length > 0 && (
                    <Link
                      to={"/article/" + article.documentId}
                      key={index}
                      className="flex w-full items-center justify-between gap-4 border-t pt-2"
                    >
                      <div>
                        <Text variant="description" className="line-clamp-1">
                          {article.title}
                        </Text>
                        <ul>
                          {article.comments.map((comment, index) => (
                            <li key={index}>
                              <Text
                                variant="small-description"
                                className="line-clamp-1"
                              >
                                - {comment.content}
                              </Text>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </Link>
                  ),
              )}
          </div>
        </section>
      </Container>
    </div>
  );
};

export default MyCommentsPage;
