import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { ARTICLES_LIST } from "../../constants/article";

const ArticleCommentsPieChart = () => {
  const data = ARTICLES_LIST.data.map((article) => ({
    name: article.title,
    value: article.comments.length,
    label: article.title + " | Comments",
  }));

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF8C00"];

  return (
    <PieChart width={600} height={350} title="Article">
      <Pie
        data={data}
        cx={300}
        cy={140}
        labelLine={false}
        outerRadius={120}
        fill="#8884d8"
        dataKey="value"
        nameKey="label"
      >
        {data.map((_, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
};

export default ArticleCommentsPieChart;
