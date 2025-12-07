import * as Icon from "akar-icons"

export type Room = {
    id: string
    name: string
    branchId: string
}

export type FormField = {
    label: string
    name: string
    placeholder?: string
    type?: string
    as?: string
    icon?: keyof typeof Icon
    required?: boolean
    autoFocus?: boolean
    isLoading?: boolean
    disabled?: boolean
    preview?: string
    options?: {
        value: string
        label: string
    }[]
}

export enum MovieGenre {
  ACTION = 'action',
  ADVENTURE = 'adventure',
  ANIMATION = 'animation',
  COMEDY = 'comedy',
  CRIME = 'crime',
  DRAMA = 'drama',
  FANTASY = 'fantasy',
  HORROR = 'horror',
  MYSTERY = 'mystery',
  ROMANCE = 'romance',
  SCI_FI = 'sci_fi',
  THRILLER = 'thriller',
  DOCUMENTARY = 'documentary',
  FAMILY = 'family',
  MUSICAL = 'musical',
  WAR = 'war',
  WESTERN = 'western',
  HISTORICAL = 'historical',
  SPORTS = 'sports',
}