import Card from "../../components/Card";
import Container from "../../components/Container";
import { ARTICLES_LIST } from "../../constants/article";

const ArticlesPage = () => {
  return (
    <Container className="flex flex-col gap-16 p-16">
      {ARTICLES_LIST.data.map((item, index) => (
        <Card
          key={index}
          title={item.title}
          description={item.description}
          imageCover={item.cover_image_url}
        />
      ))}
    </Container>
  );
};

export default ArticlesPage;
