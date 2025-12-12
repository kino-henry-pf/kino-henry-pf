import * as Icon from "akar-icons"
import { Form as FormikForm } from "formik"

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
    defaultValue?: any
    onChange?: (values: any) => any,
    form?: typeof FormikForm,
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