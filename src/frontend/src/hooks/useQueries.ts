import type { Principal } from "@dfinity/principal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { StudentView, UserProfile } from "../backend";
import { useActor } from "./useActor";

// ─── User Profile ────────────────────────────────────────────────────────────

export function useGetCallerUserProfile() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<UserProfile | null>({
    queryKey: ["currentUserProfile"],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not available");
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}

export function useSaveCallerUserProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profile: UserProfile) => {
      if (!actor) throw new Error("Actor not available");
      return actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUserProfile"] });
    },
  });
}

// ─── Student ─────────────────────────────────────────────────────────────────

export function useAddStudent() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Actor not available");
      return actor.addStudent();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["student"] });
    },
  });
}

export function useGetStudent(principal: Principal | null) {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<StudentView | null>({
    queryKey: ["student", principal?.toString()],
    queryFn: async () => {
      if (!actor || !principal) return null;
      return actor.getStudent(principal);
    },
    enabled: !!actor && !actorFetching && !!principal,
    retry: false,
  });
}

// ─── Leaderboard ─────────────────────────────────────────────────────────────

export function useGetLeaderboard() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<StudentView[]>({
    queryKey: ["leaderboard"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getLeaderboard();
    },
    enabled: !!actor && !actorFetching,
  });
}

// ─── Quiz Score ───────────────────────────────────────────────────────────────

export function useSaveQuizScore() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      subject,
      score,
    }: { subject: string; score: bigint }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.saveQuizScore(subject, score);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["student"] });
      queryClient.invalidateQueries({ queryKey: ["leaderboard"] });
    },
  });
}

// ─── Streak ───────────────────────────────────────────────────────────────────

export function useUpdateStreak() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newStreak: bigint) => {
      if (!actor) throw new Error("Actor not available");
      return actor.updateStreak(newStreak);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["student"] });
    },
  });
}
