import Head from 'next/head'
import { Inter } from 'next/font/google'
import Header from '@/components/header/Header'
import MainContentContainer from '@/components/mainContentContainer/MainContentContainer'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>The Watchers</title>
        <meta name="description" content="The Watchers Missing Nothing!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    
      <Header />
      <MainContentContainer>
        </MainContentContainer>      
   
    </>
  )
}
