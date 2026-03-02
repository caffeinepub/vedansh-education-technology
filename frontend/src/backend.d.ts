import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface QuizScore {
    subject: string;
    score: bigint;
    timestamp: bigint;
}
export interface StudentView {
    quizScores: Array<QuizScore>;
    name: string;
    badges: Array<string>;
    phoneNumber: string;
    streakCount: bigint;
}
export interface UserProfile {
    name: string;
    phoneNumber: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addStudent(name: string, phoneNumber: string): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getLeaderboard(): Promise<Array<StudentView>>;
    getStudent(phoneNumber: string): Promise<StudentView | null>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    saveQuizScore(phoneNumber: string, subject: string, score: bigint): Promise<void>;
    updateStreak(phoneNumber: string, newStreak: bigint): Promise<void>;
}
