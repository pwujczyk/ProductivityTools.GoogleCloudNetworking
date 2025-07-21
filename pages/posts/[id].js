import Layout from "../../components/layout";
import { getAllPostIds, getPostData, getMenuTree } from '../../lib/posts';
 
export async function getStaticProps({ params }) {
  // Add the "await" keyword like this:
  const postData = await getPostData(params.id);
  const menu = getMenuTree();
 
  return {
    props: {
      postData,
      menu,
    },
  };
}

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}
export default function Post({ postData, menu }) {
  return (
    <Layout menu={menu}>
      {postData.title}
      <br />
      {postData.id}
      <br />
      {postData.date}
      <br />
      <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
    </Layout>
  );
}