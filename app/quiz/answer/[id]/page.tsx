import { sql } from '@vercel/postgres';
import Link from 'next/link';

async function Answer({
  params: { id },
}: {
  params: { id: string };
}): Promise<JSX.Element> {
  const { rows } = await sql`
  SELECT
    q.quiz_id,
    q.question_text AS quiz_question,
    a.answer_id,
    a.answer_text,
    a.is_correct 
  FROM quizzes AS q
  JOIN answers AS a ON q.quiz_id = a.quiz_id 
  WHERE q.quiz_id = ${id}`;

  return (
    <div>
      <h1>{rows[0].quiz_question}</h1>
      <p className="mb-10">✅ {rows[0].is_correct && rows[0].answer_text}</p>
      <div className="space-y-4">
        <Link
          href={`/quiz/${rows[0].quiz_id}`}
          className="block p-2 mb-4 cursor-pointer border border-teal-400 uppercase hover:bg-teal-300 hover:font-medium hover:text-black">
          Back to Question
        </Link>
        <Link
          href="/"
          className="block p-2 mb-4 cursor-pointer bg-teal-400 text-black uppercase hover:bg-teal-300 hover:font-medium">
          All Quizzes
        </Link>
      </div>
    </div>
  );
}

export default function AnswerPage({ params }: { params: { id: string } }) {
  return (
    <section className="flex justify-center items-center min-h-screen text-center">
      <Answer params={params} />
    </section>
  );
}
