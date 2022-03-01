import { FOCUS_VISIBLE_OUTLINE } from '@/lib/constants'
import { usePostLikes } from '@/lib/usePostLikes'
import { LoadingDots } from '@/components/LoadingDots'
import HappyIcon from '@heroicons/react/outline/EmojiHappyIcon'
import cx from 'clsx'
import React from 'react'

export const LikeButton = ({ slug }) => {
  const { currentUserLikes, likes, isLoading, increment } = usePostLikes(slug)

  const handleClick = () => {
    increment()
  }

  return (
    <div className="flex items-center space-x-2">
      <div className="relative">
        <button
          className={cx(
            'shadow-lgx group to-black/200 relative block transform overflow-hidden rounded-lg bg-gradient-to-tl from-black/50 to-white/30 p-1  transition-all duration-300 ease-out hover:scale-[1.2] hover:rounded-[10px] active:scale-100 active:rounded-lg dark:from-white/5',
            FOCUS_VISIBLE_OUTLINE,
            {
              'animate-pulse': isLoading,
              'hover:shadow-violet-500/30': currentUserLikes === 0,
              'hover:shadow-violet-500/50': currentUserLikes !== 0,
            }
          )}
          onClick={handleClick}
        >
          <div
            className={cx(
              'absolute inset-0 transform-gpu bg-gradient-to-tl from-purple-500 to-purple-400 transition-transform',
              {
                'translate-y-8': currentUserLikes === 0,
                'translate-y-5': currentUserLikes === 1,
                'translate-y-3': currentUserLikes === 2,
              }
            )}
          />

          <HappyIcon className="text-black-100 relative w-5 transform transition delay-100 duration-500 ease-out group-hover:scale-110" />
        </button>
      </div>

      {/* Like counter text */}
      <div className="text-lg font-medium leading-none text-violet-500">
        {isLoading ? <LoadingDots /> : <span>{likes}</span>}
      </div>
    </div>
  )
}
