import Link from 'next/link';
import Head from "next/head";
import Layout from '../../components/layout';
import { getAllPostIds, getPostData } from '../../lib/posts'

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id)
  return {
    props: {
      postData
    }
  }
}


export async function getStaticPaths() {
  // Return a list of possible value for post
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false
  }
}


export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{ postData.title }</title>
      </Head>
      <h1>{postData.title}</h1>
      {postData.id}<br />
      {postData.date}<br />
      {postData.author}<br />
      <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      <h2>
        <Link href="/">
          <a>Back to home</a>
        </Link>
      </h2>
    </Layout>
  )
}

