import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Run Delta, Run!</title>
        <link
          rel="canonical"
          href="https://rundeltarun.com"
          key="canonical"
        />
        <meta
          name="description"
          content="Find out how much space you can save by compressing your data with delta and run-length encoding."
          key="desc"
        />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>

        </h1>
      </main>

      <footer className={styles.footer}>
      </footer>
    </div>
  )
}

export default Home
