import Navbar from "../../components/Navbar";
import Container from "../../components/Container";
import Text from "../../components/Text";
import { ARTICLES_LIST } from "../../constants/article";
import { Link } from "react-router-dom";
import ArticleCommentsPieChart from "../../components/Chart/ArticleCommentsPieChart";

const DashboardPage = () => {
  // Hitung jumlah komentar untuk setiap artikel
  const articlesWithCommentsCount = ARTICLES_LIST.data.map((article) => ({
    ...article,
    commentsCount: article.comments.length, // Misalkan komentar berada di dalam artikel
  }));

  // Urutkan artikel berdasarkan jumlah komentar
  const sortedArticles = articlesWithCommentsCount.sort(
    (a, b) => b.commentsCount - a.commentsCount,
  );

  // Ambil 5 artikel teratas
  const top5Articles = sortedArticles.slice(0, 5);

  return (
    <main className="font-raleway">
      <Navbar />

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
            {top5Articles.map((article, index) => (
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
                  {article.commentsCount} Coments
                </Text>
              </Link>
            ))}
          </div>
        </section>
      </Container>
    </main>
  );
};

export default DashboardPage;
