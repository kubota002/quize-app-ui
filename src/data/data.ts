import type { Question } from "../components/MultipleChoiceQuestion";

export const questionsData: Question[] = [
  {
    id: "q1",
    title: "日本の首都はどこですか？",
    choices: [
      { id: 1, text: "大阪" },
      { id: 2, text: "京都" },
      { id: 3, text: "東京" },
      { id: 4, text: "名古屋" },
      { id: 5, text: "福岡"},
    ],
    answerId: 3,
    explanation: "日本の首都は東京です。政治・経済の中心地となっています。",
  },
  {
    id: "q2",
    title: "1日は何時間ですか？",
    choices: [
      { id: 1, text: "12時間" },
      { id: 2, text: "24時間" },
      { id: 3, text: "48時間" },
      { id: 4, text: "60時間" },
    ],
    answerId: 2,
    explanation: "1日は24時間で構成されています。",
  },
  {
    id: "q3",
    title: "人間が呼吸で取り込む主な気体はどれですか？",
    choices: [
      { id: 1, text: "二酸化炭素" },
      { id: 2, text: "水素" },
      { id: 3, text: "酸素" },
      { id: 4, text: "窒素" },
    ],
    answerId: 3,
    explanation: "人間は呼吸によって酸素を取り込み、生命活動を維持しています。",
  },
  {
    id: "q4",
    title: "日本で義務教育に含まれないのはどれですか？",
    choices: [
      { id: 1, text: "小学校" },
      { id: 2, text: "中学校" },
      { id: 3, text: "高校" },
      { id: 4, text: "特別支援学校（小学部・中学部）" },
    ],
    answerId: 3,
    explanation:
      "義務教育は小学校と中学校（およびそれに準ずる教育）で、高校は含まれません。",
  },
  {
    id: "q5",
    title: "信号機の『止まれ』を示す色はどれですか？",
    choices: [
      { id: 1, text: "青" },
      { id: 2, text: "黄色" },
      { id: 3, text: "赤" },
      { id: 4, text: "白" },
    ],
    answerId: 3,
    explanation:
      "信号機では赤が『止まれ』、青が『進め』、黄色が『注意』を意味します。",
  },
];
