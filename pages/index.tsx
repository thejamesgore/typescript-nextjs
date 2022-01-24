import Head from 'next/head'
import Header from '../components/Header'
import Banner from '../components/Banner'
import Posts from '../components/Posts'
import { sanityClient, urlFor } from '../sanity'
import { Post } from '../typings'
import Link from 'next/link'

interface Props {
  posts: [Post]
}

export default function Home({ posts }: Props) {
console.log(posts)
  return (
    <div className="max-w-7xl mx-auto">
      <Head>
        <title>Medium Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head> 
    <Header />
    <Banner />

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 p-2 md:p-6">
    {posts.map(post => (
      <Link key={posts._id} href={`/post/${post.slug.current}`}>
        <div className="group cursor-pointer border rounded-lg overflow-hidden">
          <img src={urlFor(post.mainImage).url()!} alt="" className="h-60 w-full object-cover group-hover:scale-105 transition-transform duration-200 ease-in-out"/>
          <div className="flex justify-between p-5 bg-white">
            <div>
              <p className="text-lg font-bold">{post.title}</p>
              <p className="text-xs">{post.description} by {post.author.name}</p>
            </div>
            <img src={urlFor(post.author.image).url()!} alt="" className="h-12 w-12 rounded-full"/>
          </div>
        </div>

      </Link>
    ))}
    </div>

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