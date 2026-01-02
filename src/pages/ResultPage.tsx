import { useLocation, useNavigate } from "react-router-dom";
import type { ResultState } from "../components/MultipleChoiceQuestion";

export const ResultPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const state = location.state as ResultState | undefined;

  if (!state) {
    navigate("/");
    return null;
  }

  const { total, correctCount, results } = state;

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-3xl mx-auto">
        {/* サマリー */}
        <div className="bg-white rounded-2xl shadow p-6 mb-6 text-center">
          <h1 className="text-2xl font-bold mb-2">結果</h1>
          <p className="text-lg">
            {total} 問中 <span className="font-bold">{correctCount}</span> 問正解
          </p>
        </div>

        {/* 問題ごとの結果 */}
        <div className="space-y-4">
          {results.map((r, i) => (
            <div key={r.id} className="bg-white rounded-2xl shadow p-6">
              <h2 className="font-bold mb-2">
                Q{i + 1}. {r.title}
              </h2>

              <p className="text-sm">
                あなたの回答：
                <span className="font-medium ml-2">{r.selectedText}</span>
              </p>

              <p
                className={`mt-1 text-sm font-medium ${
                  r.isCorrect ? "text-emerald-700" : "text-rose-700"
                }`}
              >
                {r.isCorrect ? "正解" : "不正解"}
              </p>

              {!r.isCorrect && (
                <div className="mt-4 rounded-xl bg-slate-50 border p-4">
                  <p className="text-sm font-medium mb-1">解説</p>
                  <p className="text-sm text-slate-700">{r.explanation}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* 再挑戦 */}
        <div className="mt-8 text-center">
          <button
            className="px-6 py-3 rounded-xl bg-slate-900 text-white"
            onClick={() => navigate("/")}
          >
            もう一度挑戦
          </button>
        </div>
      </div>
    </div>
  );
};
