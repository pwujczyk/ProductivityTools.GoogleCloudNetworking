import Markdown from "react-markdown";
import Layout from "../../components/layout";
import { getArticleData, getAllArticlesIds } from "../../lib/articles";
import { getArticles } from "../../lib/posts";
import remarkGfm from 'remark-gfm'

 
export async function getStaticProps({ params }) {
  // params.slug will be an array of path segments e.g. ['vpc', 'peering']
  const postData = await getArticleData(params.slug);
  const menu = getArticles();
 
  return {
    props: {
      postData,
      menu,
    },
  };
}

export async function getStaticPaths() {
  const paths = getAllArticlesIds();
  return {
    paths,
    fallback: false,
  };
}
export default function Article({ postData, menu }) {
  return (
    <Layout menu={menu}>
      <h1>{postData.title}</h1>
      <br />
      <small>path: {postData.id}</small>
      <br />
      <small>date: {postData.date}</small>
      <br />
      <Markdown remarkPlugins={[remarkGfm]}>{postData.content}</Markdown>
      {/* <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} /> */}
    </Layout>
  );
}