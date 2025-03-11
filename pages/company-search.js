import Head from 'next/head';
import CompanySearchGlass from '../components/CompanySearchGlass';

export default function CompanySearchPage() {
  return (
    <>
      <Head>
        <title>Company Intelligence Platform | CodeSec</title>
        <meta name="description" content="Research companies, their relationships, and media presence with advanced search tools" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <main className="bg-slate-900 min-h-screen">
        <CompanySearchGlass />
      </main>
    </>
  );
}