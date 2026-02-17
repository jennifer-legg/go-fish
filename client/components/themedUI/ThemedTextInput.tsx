import { ReactNode } from 'react'

interface Props {
  children?: ReactNode
}

export default function ThemedTextInput({ children }: Props) {
  return (
    <div className="cursor-text rounded-3xl bg-lightBlue px-4 py-2 text-darkBlue md:px-8 lg:px-10">
      {children}
    </div>
  )
}
