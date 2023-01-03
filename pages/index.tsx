import Head from 'next/head'
import { FormEvent, useReducer, useState } from 'react';
import Form from '../components/Form'
import styles from '../styles/Home.module.css'

function getFormValue(eventTarget: HTMLInputElement[]) {
  const formValue: { [x: string]: string } = {}

  for (let index = 0; index < eventTarget.length; index++) {
    const element: HTMLInputElement = eventTarget[index];
    formValue[element.name] = element.value
  }
  delete formValue.submit
  return formValue
}

export default function Home() {
  const [results, setResults] = useState<any>({})
  const processSalaries = async (event: any) => {
    event.preventDefault()
    const formValue = getFormValue(event.target)
    // fetch the results from /api/form via POST
    const res = await fetch("/api/form", {
      method: "POST",
      body: JSON.stringify(formValue),
      headers: {
        "Content-Type": "application/json",
      },
    })
    const calculated = await res.json()
    console.log("json()", calculated);
    setResults(calculated)
  }

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
        <Form handleSubmit={processSalaries} />
        {JSON.stringify(results)}
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
