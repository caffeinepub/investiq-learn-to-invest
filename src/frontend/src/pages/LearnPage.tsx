import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, CheckCircle2, Loader2 } from "lucide-react";
import { motion } from "motion/react";
import type { Difficulty } from "../backend.d";
import { useModules, useUserProgress } from "../hooks/useQueries";

const difficultyColor: Record<Difficulty | string, string> = {
  Beginner: "bg-green-100 text-green-700",
  Intermediate: "bg-orange-100 text-orange-700",
  Advanced: "bg-red-100 text-red-700",
};

export default function LearnPage() {
  const { data: modules, isLoading: modulesLoading } = useModules();
  const { data: progress } = useUserProgress();

  const completedSet = new Set(
    (progress?.completedModules ?? []).map((id) => id.toString()),
  );
  const completedCount = completedSet.size;
  const total = modules?.length ?? 0;
  const progressPct =
    total > 0 ? Math.round((completedCount / total) * 100) : 0;

  const quizScores = new Map(
    (progress?.quizResults ?? []).map(([id, result]) => [
      id.toString(),
      Number(result.score),
    ]),
  );

  return (
    <div className="bg-background min-h-screen">
      <section className="bg-primary py-14">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold text-white mb-2">
              Learning Modules
            </h1>
            <p className="text-white/75 mb-6">
              Master investing one module at a time
            </p>

            {total > 0 && (
              <div className="bg-white/10 rounded-xl p-4 max-w-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white text-sm font-medium">
                    Your Progress
                  </span>
                  <span className="text-white text-sm">
                    {completedCount}/{total} modules
                  </span>
                </div>
                <Progress value={progressPct} className="h-2 bg-white/20" />
              </div>
            )}
          </motion.div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        {modulesLoading ? (
          <div
            className="flex items-center justify-center py-24"
            data-ocid="learn.loading_state"
          >
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : !modules || modules.length === 0 ? (
          <div className="text-center py-24" data-ocid="learn.empty_state">
            <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">
              No modules available yet. Check back soon!
            </p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((module, i) => {
              const isCompleted = completedSet.has(module.id.toString());
              const score = quizScores.get(module.id.toString());

              return (
                <motion.div
                  key={module.id.toString()}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                  data-ocid={`learn.item.${i + 1}`}
                >
                  <Link to="/learn/$id" params={{ id: module.id.toString() }}>
                    <div className="bg-card rounded-2xl p-6 shadow-card hover:shadow-hover transition-shadow h-full relative">
                      {isCompleted && (
                        <div className="absolute top-4 right-4">
                          <CheckCircle2 className="w-5 h-5 text-accent" />
                        </div>
                      )}
                      <div className="flex items-start justify-between mb-4 pr-6">
                        <span
                          className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                            difficultyColor[module.difficulty] ??
                            "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {module.difficulty}
                        </span>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <BookOpen className="w-3 h-3" />{" "}
                          {module.lessons.length} lessons
                        </span>
                      </div>
                      <h3 className="font-semibold text-lg text-foreground mb-2">
                        {module.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3">
                        {module.description}
                      </p>
                      {score !== undefined && (
                        <Badge variant="outline" className="text-xs mb-3">
                          Quiz score: {String(score)}%
                        </Badge>
                      )}
                      <div className="flex items-center text-primary text-sm font-medium">
                        {isCompleted ? "Review Module" : "Start Module"}
                        <ArrowRight className="ml-1 w-4 h-4" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
