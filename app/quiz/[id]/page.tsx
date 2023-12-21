import { sql } from '@vercel/postgres';
import Link from 'next/link';

async function Quiz({
  params: { id },
}: {
  params: { id: string };
}): Promise<JSX.Element> {
  const { rows } = await sql`
  SELECT
    q.quiz_id,
    q.title AS quiz_title,
    q.description AS quiz_description,
    q.question_text AS quiz_question,
    a.answer_id,
    a.answer_text,
    a.is_correct 
  FROM quizzes AS q
  JOIN answers AS a ON q.quiz_id = a.quiz_id 
  WHERE q.quiz_id = ${id}`;

  return (
    <div>
      <h1>{rows[0].quiz_title}</h1>
      <p className="text-gray-500 mb-10">{rows[0].quiz_description}</p>
      <h2>{rows[0].quiz_question}</h2>
      <ul className="space-y-2 mb-10">
        {rows.map((answer) => (
          <li key={answer.answer_id}>
            <p className="font-light">🌀 {answer.answer_text}</p>
          </li>
        ))}
      </ul>
      <Link
        href={`/quiz/answer/${rows[0].quiz_id}`}
        className="block p-2 mb-4 cursor-pointer bg-teal-400 text-black uppercase hover:bg-teal-300 hover:font-medium">
        Show Answer
      </Link>
    </div>
  );
}

export default function QuizPage({ params }: { params: { id: string } }) {
  return (
    <section className="flex justify-center items-center min-h-screen text-center">
      <Quiz params={params} />
    </section>
  );
}
