import { useMemo, useState } from "react";

type Question = {
  id: string;
  title: string;
  choices: { id: number; text: string }[];
  answerId: number;
  explanation: string;
}

export const MultipleChoiceQuestion = (questions: Question[]) => {
    const [index, setIndex] = useState<number>(0);
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

    const q = questions[index];
    const progress = useMemo(
    () => Math.round(((index + 1) / questions.length) * 100),
    [index]
    );

    const onSelect = (choiceId: number) => {
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
    return(
        <></>
    )
}