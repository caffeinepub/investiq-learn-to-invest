import { Button } from "@/components/ui/button";
import { Link, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Loader2,
  Trophy,
  XCircle,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { useQuizQuestions, useSubmitQuiz } from "../hooks/useQueries";

export default function QuizPage() {
  const { id } = useParams({ from: "/learn/$id/quiz" });
  const moduleId = BigInt(id);

  const { data: questions, isLoading } = useQuizQuestions(moduleId);
  const submitQuiz = useSubmitQuiz();

  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<Record<number, number>>({});
  const [result, setResult] = useState<{
    score: bigint;
    totalQuestions: bigint;
    percentage: bigint;
  } | null>(null);

  const total = questions?.length ?? 0;

  const handleSelect = (optionIdx: number) => {
    setSelected((prev) => ({ ...prev, [currentQ]: optionIdx }));
  };

  const handleSubmit = async () => {
    if (!questions) return;
    const answers = questions.map((_, i) => BigInt(selected[i] ?? 0));
    try {
      const res = await submitQuiz.mutateAsync({ moduleId, answers });
      setResult(res);
    } catch {
      toast.error("Failed to submit quiz. Please try again.");
    }
  };

  if (isLoading) {
    return (
      <div
        className="flex items-center justify-center min-h-screen"
        data-ocid="quiz.loading_state"
      >
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!questions || questions.length === 0) {
    return (
      <div
        className="flex flex-col items-center justify-center min-h-screen gap-4"
        data-ocid="quiz.empty_state"
      >
        <p className="text-muted-foreground">
          No quiz questions available for this module.
        </p>
        <Button asChild variant="outline">
          <Link to="/learn/$id" params={{ id }}>
            Back to Module
          </Link>
        </Button>
      </div>
    );
  }

  if (result) {
    const pct = Number(result.percentage);
    const passed = pct >= 60;
    return (
      <div className="bg-background min-h-screen flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="bg-card rounded-2xl shadow-card max-w-md w-full p-8 text-center"
          data-ocid="quiz.success_state"
        >
          <div
            className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 ${
              passed ? "bg-green-100" : "bg-red-100"
            }`}
          >
            {passed ? (
              <Trophy className="w-10 h-10 text-green-600" />
            ) : (
              <XCircle className="w-10 h-10 text-red-500" />
            )}
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">
            {passed ? "Great job! 🎉" : "Keep Practicing"}
          </h2>
          <p className="text-muted-foreground mb-6">
            You scored{" "}
            <span className="font-semibold text-foreground">
              {Number(result.score)}
            </span>{" "}
            out of{" "}
            <span className="font-semibold text-foreground">
              {Number(result.totalQuestions)}
            </span>{" "}
            ({pct}%)
          </p>
          <div className="bg-secondary/40 rounded-xl p-4 mb-6">
            <div className="text-3xl font-extrabold text-primary mb-1">
              {pct}%
            </div>
            <div
              className={`text-sm font-semibold ${
                passed ? "text-green-600" : "text-red-500"
              }`}
            >
              {passed ? "Passed ✓" : "Failed — aim for 60%"}
            </div>
          </div>
          <div className="flex gap-3">
            <Button
              asChild
              variant="outline"
              className="flex-1"
              data-ocid="quiz.secondary_button"
            >
              <Link to="/learn/$id" params={{ id }}>
                Back to Module
              </Link>
            </Button>
            <Button asChild className="flex-1" data-ocid="quiz.primary_button">
              <Link to="/learn">All Modules</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  const q = questions[currentQ];
  const isLastQuestion = currentQ === total - 1;
  const allAnswered = Object.keys(selected).length === total;

  return (
    <div className="bg-background min-h-screen">
      <section className="bg-primary py-10">
        <div className="container mx-auto px-4 max-w-2xl">
          <Link
            to="/learn/$id"
            params={{ id }}
            className="inline-flex items-center text-white/70 hover:text-white text-sm mb-4 transition-colors"
            data-ocid="quiz.link"
          >
            <ArrowLeft className="w-4 h-4 mr-1" /> Back to Module
          </Link>
          <h1 className="text-2xl font-bold text-white mb-1">Module Quiz</h1>
          <div className="flex items-center gap-3 mt-3">
            <div className="flex-1 bg-white/20 rounded-full h-2">
              <div
                className="bg-white rounded-full h-2 transition-all"
                style={{ width: `${((currentQ + 1) / total) * 100}%` }}
              />
            </div>
            <span className="text-white text-sm whitespace-nowrap">
              Q {currentQ + 1} of {total}
            </span>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-10 max-w-2xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQ}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
          >
            <div className="bg-card rounded-2xl p-8 shadow-card mb-6">
              <p className="text-lg font-semibold text-foreground mb-6">
                {q.question}
              </p>
              <div className="space-y-3">
                {q.options.map((opt, idx) => {
                  const isSelected = selected[currentQ] === idx;
                  return (
                    <button
                      type="button"
                      key={opt}
                      onClick={() => handleSelect(idx)}
                      className={`w-full text-left px-5 py-4 rounded-xl border-2 transition-all text-sm font-medium ${
                        isSelected
                          ? "border-primary bg-primary/5 text-primary"
                          : "border-border bg-background hover:border-primary/30 hover:bg-secondary/30 text-foreground"
                      }`}
                      data-ocid={`quiz.item.${idx + 1}`}
                    >
                      <span
                        className={`inline-flex w-6 h-6 rounded-full items-center justify-center text-xs font-bold mr-3 ${
                          isSelected
                            ? "bg-primary text-white"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {String.fromCharCode(65 + idx)}
                      </span>
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="flex items-center justify-between gap-4">
          <Button
            variant="outline"
            onClick={() => setCurrentQ((p) => p - 1)}
            disabled={currentQ === 0}
            data-ocid="quiz.secondary_button"
          >
            <ArrowLeft className="w-4 h-4 mr-1" /> Previous
          </Button>

          {isLastQuestion ? (
            <Button
              onClick={handleSubmit}
              disabled={!allAnswered || submitQuiz.isPending}
              data-ocid="quiz.submit_button"
            >
              {submitQuiz.isPending ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <CheckCircle2 className="w-4 h-4 mr-2" />
              )}
              Submit Quiz
            </Button>
          ) : (
            <Button
              onClick={() => setCurrentQ((p) => p + 1)}
              disabled={selected[currentQ] === undefined}
              data-ocid="quiz.primary_button"
            >
              Next <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          )}
        </div>

        {!allAnswered && isLastQuestion && (
          <p className="text-sm text-muted-foreground text-center mt-4">
            Please answer all questions before submitting.
          </p>
        )}
      </section>
    </div>
  );
}
