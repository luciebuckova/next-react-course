import { sql } from '@vercel/postgres';
import Link from 'next/link';
import { Suspense } from 'react';

async function Quizzes({
  params,
}: {
  params: { quiz_id: number; title: string };
}): Promise<JSX.Element> {
  const { rows } = await sql`SELECT * FROM quizzes`;

  return (
    <ul>
      {rows.map((quiz) => (
        <li key={quiz.quiz_id}>
          <Link
            href={`/quiz/${quiz.quiz_id}`}
            className="inline-block p-2 mb-4 cursor-pointer hover:bg-teal-400 hover:text-black">
            {quiz.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default function Home() {
  return (
    <div className="flex justify-center items-center min-h-screen text-center">
      <section>
        <h1 className="pb-2 text-2xl font-semibold mb-10 border-b-4 border-teal-400">
          All Quizzes
        </h1>
        <Suspense fallback={<p>Loading...</p>}>
          <Quizzes
            params={{
              quiz_id: 0,
              title: '',
            }}
          />
        </Suspense>
      </section>
    </div>
  );
}
