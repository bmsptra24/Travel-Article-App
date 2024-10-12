import { useParams } from "react-router-dom";
import Container from "../../components/Container";
import Text from "../../components/Text";
import { ARTICLE_DETAIL } from "../../constants/article";

const DetailArticlePage = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <Container className="flex max-w-[60rem] flex-col gap-10 p-4 py-10">
      <Text variant="title" className="text-center">
        {ARTICLE_DETAIL.title}
      </Text>
      <img
        src={ARTICLE_DETAIL.cover_image_url}
        alt="article-cover"
        className="aspect-video w-full rounded-3xl object-cover"
      />
      <Text variant="description">{ARTICLE_DETAIL.description}</Text>
    </Container>
  );
};

export default DetailArticlePage;
