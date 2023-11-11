export const useIsUserAddSlideOverOpen = () => useState('isUserAddSlideOverOpen', () => false as boolean)
export const useIsUserUpdateSlideOverOpen = () => useState('isUserUpdateSlideOverOpen', () => false as boolean)
export const useIsUserDeleteSlideOverOpen = () => useState('isUserDeleteSlideOverOpen', () => false as boolean)
export const useCurrentUser = () =>
  useState(
    'currentUser',
    () =>
      null as null | {
        id: number
        email: string
        role: 'USER' | 'ADMIN'
      }
  )

export const useIsPostAddSlideOverOpen = () => useState('isPostAddSlideOverOpen', () => false as boolean)
export const useIsPostUpdateSlideOverOpen = () => useState('isPostUpdateSlideOverOpen', () => false as boolean)
export const useIsPostDeleteSlideOverOpen = () => useState('isPostDeleteSlideOverOpen', () => false as boolean)
export const useCurrentPost = () =>
  useState(
    'currentPost',
    () =>
      null as null | {
        id: number
        title: string
        description: string
        link: string
        isActive: boolean
        category: {
          id: number
          name: string
        }
      }
  )

export const useIsCategoryAddSlideOverOpen = () => useState('isCategoryAddSlideOverOpen', () => false as boolean)
export const useIsCategoryUpdateSlideOverOpen = () => useState('isCategoryUpdateSlideOverOpen', () => false as boolean)
export const useIsCategoryDeleteSlideOverOpen = () => useState('isCategoryDeleteSlideOverOpen', () => false as boolean)
export const useCurrentCategory = () =>
  useState(
    'currentCategory',
    () =>
      null as null | {
        id: number
        name: string
      }
  )
