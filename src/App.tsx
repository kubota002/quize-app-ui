import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Question = {
  id: string;
  title: string;
  choices: { id: string; text: string }[];
  answerId: string;
};

const questions: Question[] = [
  {
    id: "q1",
    title: "React の状態管理フックはどれ？",
    choices: [
      { id: "a", text: "useState" },
      { id: "b", text: "useFetch" },
      { id: "c", text: "useServer" },
      { id: "d", text: "useQuery" },
    ],
    answerId: "a",
  },
  {
    id: "q2",
    title: "CSSのユーティリティクラス中心のフレームワークは？",
    choices: [
      { id: "a", text: "Bootstrap" },
      { id: "b", text: "Tailwind CSS" },
      { id: "c", text: "Bulma" },
      { id: "d", text: "Foundation" },
    ],
    answerId: "b",
  },
];

export default function App() {
  const [index, setIndex] = useState(0);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const q = questions[index];
  const progress = useMemo(
    () => Math.round(((index + 1) / questions.length) * 100),
    [index]
  );

  const onSelect = (choiceId: string) => {
    if (selectedId) return;
    setSelectedId(choiceId);
    setIsCorrect(choiceId === q.answerId);
  };

  const onNext = () => {
    setSelectedId(null);
    setIsCorrect(null);
    setIndex((v) => Math.min(v + 1, questions.length - 1));
  };

  const isLast = index === questions.length - 1;

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="w-full max-w-xl">
        <div className="mb-4 flex items-center justify-between">
          <div className="text-sm text-slate-600">
            {index + 1} / {questions.length}
          </div>
          <div className="text-sm font-medium text-slate-700">{progress}%</div>
        </div>

        <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden mb-6">
          <motion.div
            className="h-full bg-slate-800"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
          />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={q.id}
            className="bg-white rounded-2xl shadow p-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <h1 className="text-xl font-bold text-slate-900 mb-4">{q.title}</h1>

            <div className="grid gap-3">
              {q.choices.map((c) => {
                const picked = selectedId === c.id;
                const correct = c.id === q.answerId;

                const base =
                  "w-full text-left px-4 py-3 rounded-xl border transition";
                const idle = "bg-white hover:bg-slate-50 border-slate-200";
                const correctStyle = "bg-emerald-50 border-emerald-300";
                const wrongStyle = "bg-rose-50 border-rose-300";
                const pickedStyle =
                  isCorrect === null
                    ? idle
                    : correct
                    ? correctStyle
                    : picked
                    ? wrongStyle
                    : idle;

                return (
                  <motion.button
                    key={c.id}
                    className={`${base} ${pickedStyle}`}
                    onClick={() => onSelect(c.id)}
                    whileHover={selectedId ? undefined : { scale: 1.01 }}
                    whileTap={selectedId ? undefined : { scale: 0.99 }}
                    disabled={!!selectedId}
                  >
                    {c.text}
                  </motion.button>
                );
              })}
            </div>

            <div className="mt-5 flex items-center justify-between">
              <div className="text-sm">
                {isCorrect === null ? (
                  <span className="text-slate-500">選択してください</span>
                ) : isCorrect ? (
                  <span className="text-emerald-700 font-medium">正解！</span>
                ) : (
                  <span className="text-rose-700 font-medium">不正解…</span>
                )}
              </div>

              <button
                className="px-4 py-2 rounded-xl bg-slate-900 text-white disabled:opacity-40"
                onClick={onNext}
                disabled={!selectedId || isLast}
              >
                次へ
              </button>
            </div>

            {isLast && selectedId && (
              <div className="mt-4 text-sm text-slate-600">
                最後の問題です。おつかれ！
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
