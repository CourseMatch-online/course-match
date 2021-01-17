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
        <h1 className={styles.title}>Connect With Your Classmates</h1>
        <h2 className={styles.subtitle}>Join a custom chat for each of your classes</h2>
        <div style={{alignSelf: 'baseline', paddingLeft: '10%'}}>
          <a href="/register" className={styles.ghostbutton}>
            Get Started Now
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
          A Hack The North Project
      </footer>
    </div>
  )
}
/*<div style={{ width:'100%', display: 'flex', flexDirection: 'row', justifyContent: 'flex-end'}}>
    <a href="/login">
      <Button
        label="Sign up"
        variant="brand"
        style={{margin: '20px'}}
      />
    </a>
  </div>*/