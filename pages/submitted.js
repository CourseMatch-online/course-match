import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Course Match</title>
        <link rel="shortcut icon" href="/logo.png" />
      </Head>
      <header className={styles.header}>
          <img className={styles.logo}
            src="/logo2.jpg"
          ></img>
          <h1>course match</h1>
      </header>
      <main className={styles.main}>
        <h1 className={styles.title}>Success!</h1>
        <h2 className={styles.subtitle}>Check your email for a token to join the Discord server</h2>
      </main>

      <footer className={styles.footer}>
          A Hack The North Project
      </footer>
    </div>
  )
}