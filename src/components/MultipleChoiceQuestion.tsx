import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ResultDialog } from "./ResultDialog";
import { useNavigate } from "react-router-dom";

type QuestionResult = {
    id: string;
    title: string;
    selectedText: string;
    correctText: string;
    isCorrect: boolean;
    explanation: string;
}
export type ResultState = {
    total: number;
    correctCount: number;
    results: QuestionResult[];
}

export type Question = {
  id: string;
  title: string;
  choices: { id: number; text: string }[];
  answerId: number;
  explanation: string;
}

type MultipleChoiceQuestionType = {
    questions: Question[]
}

export const MultipleChoiceQuestion = (props: MultipleChoiceQuestionType) => {
    const { questions } = props;
    const navigate = useNavigate();
    const [index, setIndex] = useState<number>(0);
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);   // 正解
    const [results, setResults] = useState<QuestionResult[]>([]);   // 結果

    const q = questions[index];
    const progress = useMemo(
        () => Math.round(((index + 1) / questions.length) * 100),
        [index]
    );

    const onSelect = (choiceId: number) => {
        if (selectedId) return;

        const choice = q.choices.find(c => c.id === choiceId)!;
        const correct = q.choices.find(c => c.id === q.answerId)!;

        setResults(prev => [
            ...prev,
            {
                id: q.id,
                title: q.title,
                selectedText: choice.text,
                correctText: correct.text,
                isCorrect: choiceId === q.answerId,
                explanation: q.explanation,
            },
        ]);

        setSelectedId(choiceId);
        setIsCorrect(choiceId === q.answerId);
    };

    const onNext = () => {
    setSelectedId(null);
    setIsCorrect(null);
    setIndex((v) => Math.min(v + 1, questions.length - 1));
    };

    const onFinish = () => {
        const result: ResultState = {
            total: questions.length,
            correctCount: results.filter(r => r.isCorrect).length,
            results,
        }
        navigate("/result", {
            state: result,
        });
    }

    const isLast = index === questions.length - 1;

    return(
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="w-full max-w-xl">
            <ResultDialog
                open={isCorrect !== null}
                isCorrect={!!isCorrect}
                isLast={isLast}
                explanation={q.explanation}
                onNext={onNext}
                onFinish={onFinish}
            />
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
                <h2 className="text-xl font-bold text-slate-900 mb-4">{q.title}</h2>

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
                    <span className="text-slate-500">選択してください</span>
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
    )
}