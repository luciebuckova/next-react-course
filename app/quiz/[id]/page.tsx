import { sql } from '@vercel/postgres';

async function Quiz({
  params: { id },
}: {
  params: { id: string };
}): Promise<JSX.Element> {
  const { rows } = await sql`SELECT * FROM quizzes WHERE quiz_id = ${id}`;

  return (
    <div className="flex justify-center items-center min-h-screen text-center">
      <h1>{rows[0].title}</h1>
    </div>
  );
}

export default function QuizPage({ params }: { params: { id: string } }) {
  return (
    <section>
      <Quiz params={params} />
    </section>
  );
}
