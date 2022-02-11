import Link from 'next/link'
import kebabCase from '@/lib/utils/kebabCase'

const Tag = ({ text }) => {
  return (
    <Link href={`/tags/${kebabCase(text)}`}>
      <a className="mr-3 text-sm font-medium uppercase text-violet-500 hover:text-violet-600 dark:hover:text-violet-400">
        {text.split(' ').join('-')}
      </a>
    </Link>
  )
}

export default Tag
