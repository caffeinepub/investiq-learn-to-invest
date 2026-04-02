import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Link, useParams } from "@tanstack/react-router";
import { ArrowLeft, BookOpen, CheckCircle2, Loader2, Zap } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import type { Difficulty } from "../backend.d";
import {
  useMarkModuleCompleted,
  useModuleById,
  useUserProgress,
} from "../hooks/useQueries";

const difficultyColor: Record<Difficulty | string, string> = {
  Beginner: "bg-green-100 text-green-700",
  Intermediate: "bg-orange-100 text-orange-700",
  Advanced: "bg-red-100 text-red-700",
};

export default function ModuleDetailPage() {
  const { id } = useParams({ from: "/learn/$id" });
  const moduleId = BigInt(id);

  const { data: module, isLoading } = useModuleById(moduleId);
  const { data: progress } = useUserProgress();
  const markComplete = useMarkModuleCompleted();

  const isCompleted = (progress?.completedModules ?? []).some(
    (m) => m.toString() === id,
  );

  const [expandedLesson, setExpandedLesson] = useState<string | undefined>(
    undefined,
  );

  const handleMarkComplete = async () => {
    try {
      await markComplete.mutateAsync(moduleId);
      toast.success("Module marked as complete!");
    } catch {
      toast.error("Failed to mark complete. Please try again.");
    }
  };

  if (isLoading) {
    return (
      <div
        className="flex items-center justify-center min-h-screen"
        data-ocid="module.loading_state"
      >
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!module) {
    return (
      <div
        className="flex flex-col items-center justify-center min-h-screen gap-4"
        data-ocid="module.error_state"
      >
        <p className="text-muted-foreground">Module not found.</p>
        <Button asChild variant="outline">
          <Link to="/learn">Back to Learn</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen">
      <section className="bg-primary py-12">
        <div className="container mx-auto px-4">
          <Link
            to="/learn"
            className="inline-flex items-center text-white/70 hover:text-white text-sm mb-6 transition-colors"
            data-ocid="module.link"
          >
            <ArrowLeft className="w-4 h-4 mr-1" /> Back to Modules
          </Link>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <span
                className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                  difficultyColor[module.difficulty] ??
                  "bg-gray-100 text-gray-700"
                }`}
              >
                {module.difficulty}
              </span>
              <span className="text-white/60 text-sm flex items-center gap-1">
                <BookOpen className="w-3 h-3" /> {module.lessons.length} lessons
              </span>
              {isCompleted && (
                <span className="flex items-center gap-1 text-green-300 text-sm">
                  <CheckCircle2 className="w-4 h-4" /> Completed
                </span>
              )}
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">
              {module.title}
            </h1>
            <p className="text-white/75 max-w-2xl">{module.description}</p>
          </motion.div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-10 max-w-3xl">
        <h2 className="text-xl font-semibold text-foreground mb-6">Lessons</h2>
        <Accordion
          type="single"
          collapsible
          value={expandedLesson}
          onValueChange={setExpandedLesson}
          className="space-y-3"
        >
          {module.lessons.map((lesson, i) => (
            <AccordionItem
              key={lesson.title}
              value={`lesson-${i}`}
              className="bg-card rounded-xl border border-border shadow-xs overflow-hidden"
              data-ocid={`module.item.${i + 1}`}
            >
              <AccordionTrigger className="px-5 py-4 hover:no-underline">
                <div className="flex items-center gap-3 text-left">
                  <span className="w-7 h-7 rounded-full bg-primary/10 text-primary text-sm font-bold flex items-center justify-center shrink-0">
                    {i + 1}
                  </span>
                  <span className="font-medium text-foreground">
                    {lesson.title}
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-5 pb-5">
                <div className="pl-10 prose prose-sm max-w-none text-muted-foreground leading-relaxed">
                  {lesson.content.split("\n").map((para, j) =>
                    para.trim() ? (
                      // biome-ignore lint/suspicious/noArrayIndexKey: paragraph splits have no stable id
                      <p key={j}>{para}</p>
                    ) : null,
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <Button
            asChild
            size="lg"
            className="flex-1"
            data-ocid="module.primary_button"
          >
            <Link to="/learn/$id/quiz" params={{ id }}>
              <Zap className="mr-2 w-4 h-4" /> Take Quiz
            </Link>
          </Button>
          {!isCompleted && (
            <Button
              variant="outline"
              size="lg"
              className="flex-1"
              onClick={handleMarkComplete}
              disabled={markComplete.isPending}
              data-ocid="module.secondary_button"
            >
              {markComplete.isPending ? (
                <Loader2 className="mr-2 w-4 h-4 animate-spin" />
              ) : (
                <CheckCircle2 className="mr-2 w-4 h-4" />
              )}
              Mark as Complete
            </Button>
          )}
        </div>
      </section>
    </div>
  );
}
