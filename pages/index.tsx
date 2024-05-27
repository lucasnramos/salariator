import Head from "next/head";
import { FormEvent, useReducer, useState } from "react";
import Results from "../components/Results";
import styles from "../styles/Home.module.css";
import HookForm from "../components/HookForm";

export default function Home() {
  const [results, setResults] = useState<any>({});
  const processSalaries = async (event: any) => {
    console.log(event);
    const res = await fetch("/api/form", {
      method: "POST",
      body: JSON.stringify(event),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const calculated = await res.json();
    setResults(calculated);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Salariator</title>
        <meta name="description" content="Compare salários CLT e PJ" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Salariator - Compare salários CLT e PJ</h1>
        <p>
          Insira os dados de salário mensal CLT e seu faturamento mensal
          estimado.
        </p>
        <p>
          Campos de benefícios e descontos consideram aqueles não tributáveis.
          Inclua a soma total em cada campo.
        </p>
        <h2>Por padrão, será considerado o Anexo V Simples Nacional.</h2>
        <div className="py-3"></div>
        <HookForm fetchResults={processSalaries} />
        <div className="py-5"></div>
        <Results data={results} />
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
  );
}
