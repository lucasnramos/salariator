import Head from 'next/head'
import Form from '../components/Form'
import styles from '../styles/Home.module.css'

export default function Home() {

  return (
    <div className={styles.container}>
      <Head>
        <title>Salariator</title>
        <meta name="description" content="Compare salários CLT e PJ" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Salariator - Compare salários CLT e PJ
        </h1>
        <Form />
      </main>

      <footer className={styles.footer}>
        <a
          href="https://lucasnramos.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Created by Lucas Ramos
        </a>
      </footer>
    </div>
  )
}
