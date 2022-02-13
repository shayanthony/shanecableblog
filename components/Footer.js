import Link from './Link'
import siteMetadata from '@/data/siteMetadata'
import SocialIcon from '@/components/social-icons'

export default function Footer() {
  return (
    <footer>
      <FooterGradient />
      <div className="mt-16 flex flex-col items-center">
        <div className="mb-3 flex space-x-4">
          <SocialIcon kind="github" href={siteMetadata.github} size="6" />
          <SocialIcon kind="linkedin" href={siteMetadata.linkedin} size="6" />
          <SocialIcon kind="twitter" href={siteMetadata.twitter} size="6" />
        </div>
        <div className="mb-2 flex space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <div>{siteMetadata.author}</div>
          <div>{` • `}</div>
          <div>{`© ${new Date().getFullYear()}`}</div>
          <div>{` • `}</div>
          <Link href="/">{siteMetadata.title}</Link>
        </div>
      </div>
    </footer>
  )

  function FooterGradient() {
    return (
      <div className="mx-auto max-w-6xl motion-safe:animate-rotate-colors pointer-events-none z-[-1]">
        <div className="absolute inset-x-0 bg-gradient-to-r from-yellow-500 via-indigo-500 to-teal-500 rounded-t-full opacity-20 blur-3xl h-[200px]" />
      </div>
    );
  }
}
