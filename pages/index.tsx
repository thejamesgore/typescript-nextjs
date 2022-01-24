import Head from 'next/head'
import Header from '../components/Header'
import Banner from '../components/Banner'
import Posts from '../components/Posts'
import { sanityClient } from '../sanity'
import { Post } from '../typings'

interface Props {
  posts: [Post]
}

export default function Home(props: Props) {

  return (
    <div className="max-w-7xl mx-auto">
      <Head>
        <title>Medium Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head> 
    <Header />
    <Banner />
    <Posts />
    </div>
  )
}

export const getServerSideProps = async () => {
  const query = `*[_type == "post"]{
    _id,
    title,
    author-> {
        name,
        image
    },
      description,
      mainImage,
      slug
    }`;

    const posts = await sanityClient.fetch(query)

    return {
      props: {
        posts,
      },
    }
}