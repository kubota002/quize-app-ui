import { MultipleChoiceQuestion, type Question } from "./quiz/MultipleChoiceQuestion";

const questions: Question[] = [
  {
    id: "q1",
    title: "React の状態管理フックはどれ？",
    choices: [
      { id: 1, text: "useState" },
      { id: 2, text: "useFetch" },
      { id: 3, text: "useServer" },
      { id: 4, text: "useQuery" },
    ],
    answerId: 1,
    explanation: ""
  },
  {
    id: "q2",
    title: "CSSのユーティリティクラス中心のフレームワークは？",
    choices: [
      { id: 1, text: "Bootstrap" },
      { id: 2, text: "Tailwind CSS" },
      { id: 3, text: "Bulma" },
      { id: 4, text: "Foundation" },
    ],
    answerId: 2,
    explanation: "解説になります。",
  },
];

export default function App() {

  return (
    <MultipleChoiceQuestion questions={questions}/>
  );
}
