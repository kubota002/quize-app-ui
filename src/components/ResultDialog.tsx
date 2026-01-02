import { motion, AnimatePresence } from "framer-motion";

type ResultDialogProps = {
  open: boolean;
  isCorrect: boolean;
  isLast: boolean;
  explanation: string;
  onNext: () => void;
  onFinish: () => void;
};

/**
 * クイズの結果を表示するダイアログ
 * 
 * @returns 
 */
export const ResultDialog = ({
  open,
  isCorrect,
  isLast,
  explanation,
  onNext,
  onFinish,
}: ResultDialogProps) => {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/40 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Dialog */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 text-center">
                {/* Icon */}
                <div
                className={`text-7xl font-bold mb-4 ${
                    isCorrect ? "text-emerald-500" : "text-rose-500"
                }`}
                >
                {isCorrect ? "〇" : "×"}
                </div>

                {/* Explanation */}
                <div className="text-slate-700 text-sm leading-relaxed mb-6">
                {explanation}
                </div>

                <button
                className="w-full py-3 rounded-xl bg-slate-900 text-slate-700"
                onClick={isLast ? onFinish : onNext}
                >
                  {isLast ? "結果を見る" : "次へ"}
                </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
