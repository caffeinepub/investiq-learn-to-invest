import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface QuizResult {
    score: bigint;
    timestamp: bigint;
}
export interface Question {
    question: string;
    correctAnswer: bigint;
    options: Array<string>;
}
export interface Lesson {
    title: string;
    content: string;
}
export interface Module {
    id: bigint;
    title: string;
    difficulty: Difficulty;
    quiz: Array<Question>;
    description: string;
    lessons: Array<Lesson>;
}
export interface GlossaryTerm {
    term: string;
    definition: string;
}
export enum Difficulty {
    Beginner = "Beginner",
    Advanced = "Advanced",
    Intermediate = "Intermediate"
}
export interface backendInterface {
    getGlossary(): Promise<Array<GlossaryTerm>>;
    getGlossaryTerm(term: string): Promise<GlossaryTerm>;
    getModuleById(id: bigint): Promise<Module>;
    getModules(): Promise<Array<Module>>;
    getQuizQuestions(moduleId: bigint): Promise<Array<Question>>;
    getUserProgress(): Promise<{
        completedModules: Array<bigint>;
        quizResults: Array<[bigint, QuizResult]>;
    }>;
    markModuleCompleted(moduleId: bigint): Promise<boolean>;
    submitQuiz(moduleId: bigint, answers: Array<bigint>): Promise<{
        score: bigint;
        totalQuestions: bigint;
        percentage: bigint;
    }>;
}
