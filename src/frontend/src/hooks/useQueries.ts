import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { GlossaryTerm, Module } from "../backend.d";
import { useActor } from "./useActor";

export function useModules() {
  const { actor, isFetching } = useActor();
  return useQuery<Module[]>({
    queryKey: ["modules"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getModules();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useModuleById(id: bigint) {
  const { actor, isFetching } = useActor();
  return useQuery<Module>({
    queryKey: ["module", id.toString()],
    queryFn: async () => {
      if (!actor) throw new Error("No actor");
      return actor.getModuleById(id);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useQuizQuestions(moduleId: bigint) {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["quiz", moduleId.toString()],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getQuizQuestions(moduleId);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useUserProgress() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["userProgress"],
    queryFn: async () => {
      if (!actor) return { completedModules: [], quizResults: [] };
      return actor.getUserProgress();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useMarkModuleCompleted() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (moduleId: bigint) => {
      if (!actor) throw new Error("No actor");
      return actor.markModuleCompleted(moduleId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userProgress"] });
    },
  });
}

export function useSubmitQuiz() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      moduleId,
      answers,
    }: { moduleId: bigint; answers: bigint[] }) => {
      if (!actor) throw new Error("No actor");
      return actor.submitQuiz(moduleId, answers);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userProgress"] });
    },
  });
}

export function useGlossary() {
  const { actor, isFetching } = useActor();
  return useQuery<GlossaryTerm[]>({
    queryKey: ["glossary"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getGlossary();
    },
    enabled: !!actor && !isFetching,
  });
}
