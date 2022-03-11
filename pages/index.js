import Link from '@/components/Link'
import Image from '@/components/Image'
import { PageSEO } from '@/components/SEO'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { getAllFilesFrontMatter } from '@/lib/mdx'
import formatDate from '@/lib/utils/formatDate'
import useSWR from 'swr'
import { SiSpotify } from 'react-icons/si'
import { LikeButton } from '@/components/LikeButton'

import NewsletterForm from '@/components/NewsletterForm'

const MAX_DISPLAY = 5

export async function getStaticProps() {
  const posts = await getAllFilesFrontMatter('blog')

  return { props: { posts } }
}

export default function Home({ posts }) {
  const fetcher = (url) => fetch(url).then((res) => res.json())
  const { data } = useSWR('/api/now-playing', fetcher)

  return (
    <>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />
      <div>
        <div className="divide-y divide-gray-200 pb-5 dark:divide-gray-700">
          <div className="pt-6">
            <h1 className="pb-2 text-5xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl sm:leading-10 md:text-5xl md:leading-14">
              Hi, I'm{' '}
              <Link href="/about" className="link link-underline text-violet-600">
                Shane
              </Link>
              .
            </h1>
            <h2 className="prose pb-3 text-lg text-gray-600 dark:text-gray-400">
              Welcome to my site, a repository of thoughts from a lead software developer.
              <br />
            </h2>
            <Link
              target="_blank"
              rel="noopener noreferer"
              href={
                data?.isPlaying
                  ? data.songUrl
                  : 'https://open.spotify.com/playlist/17TwzQb1i7nR9i56m5Z2cM?si=85995e9ce18a49c5'
              }
              className="relative flex items-center space-x-4 p-5 hover:text-violet-600 dark:hover:text-violet-400"
            >
              <div className="w-16">
                {data?.isPlaying ? (
                  <Image
                    className="w-16 shadow-sm"
                    width="100%"
                    height="100%"
                    src={data?.albumImageUrl}
                    alt={data?.album}
                  />
                ) : (
                  <SiSpotify size={64} color={'#1ED760'} />
                )}
              </div>
              <div className="flex-1">
                <p className="component font-bold">
                  {data?.isPlaying ? data.title : 'Not Listening'}
                </p>
                <p className="font-dark text-xs">{data?.isPlaying ? data.artist : 'Spotify'}</p>
              </div>
              <div className="absolute bottom-1.5 right-1.5">
                <SiSpotify size={20} color={'#1ED760'} />
              </div>
            </Link>
          </div>
        </div>
        <div>
          <div className="space-y-2 pt-4 pb-1 md:space-y-5">
            <h1 className="text-2xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-2xl sm:leading-10 md:text-2xl md:leading-14">
              Latest Posts
            </h1>
          </div>
          <hr className="border-gray-200 dark:border-gray-700" />
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {!posts.length && 'No posts found.'}
            {posts.slice(0, MAX_DISPLAY).map((frontMatter) => {
              const { slug, date, title, summary, tags } = frontMatter
              return (
                <li key={slug} className="py-12">
                  <article>
                    <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                      <dl>
                        <dt className="sr-only">Published on</dt>
                        <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                          <time dateTime={date}>{formatDate(date)}</time>
                        </dd>
                      </dl>
                      <div className="space-y-5 xl:col-span-3">
                        <div className="space-y-6">
                          <div>
                            <h2 className="text-2xl font-bold leading-8 tracking-tight">
                              <Link
                                href={`/blog/${slug}`}
                                className="text-gray-900 dark:text-gray-100"
                              >
                                {title}
                              </Link>
                            </h2>
                            <div className="flex flex-wrap">
                              {tags.map((tag) => (
                                <Tag key={tag} text={tag} />
                              ))}
                            </div>
                            <div className="pt-5">
                              <LikeButton slug={slug} />
                            </div>
                          </div>
                          <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                            {summary}
                          </div>
                        </div>
                        <div className="text-base font-medium leading-6">
                          <Link
                            href={`/blog/${slug}`}
                            className="text-violet-500 hover:text-violet-600 dark:hover:text-violet-400"
                            aria-label={`Read "${title}"`}
                          >
                            Read more &rarr;
                          </Link>
                        </div>
                      </div>
                    </div>
                  </article>
                </li>
              )
            })}
          </ul>
        </div>
        {posts.length > MAX_DISPLAY && (
          <div className="flex justify-end text-base font-medium leading-6">
            <Link
              href="/blog"
              className="rounded-md text-violet-500 duration-200 ease-in-out hover:bg-black hover:bg-opacity-10 hover:text-violet-600 dark:text-gray-100 dark:hover:bg-white dark:hover:bg-opacity-10 dark:hover:text-violet-400 sm:p-4"
              aria-label="all posts"
            >
              All Posts &rarr;
            </Link>
          </div>
        )}
        {siteMetadata.newsletter.provider !== '' && (
          <div className="flex items-center justify-center pt-4">
            <NewsletterForm />
          </div>
        )}
      </div>
    </>
  )
}
