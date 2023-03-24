import { AppContext } from '@/context/app_context'
import { Html, Head, Main, NextScript } from 'next/document'
import { useContext } from 'react'

export default function Document() {
  const myContext = useContext(AppContext)

  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
