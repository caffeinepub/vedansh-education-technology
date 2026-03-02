import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { UserProfile, StudentView } from '../backend';

export function useGetCallerUserProfile() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<UserProfile | null>({
    queryKey: ['currentUserProfile'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
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

export function useGetStudent(phoneNumber: string | undefined) {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<StudentView | null>({
    queryKey: ['student', phoneNumber],
    queryFn: async () => {
      if (!actor || !phoneNumber) return null;
      return actor.getStudent(phoneNumber);
    },
    enabled: !!actor && !actorFetching && !!phoneNumber,
  });
}

export function useGetLeaderboard() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<StudentView[]>({
    queryKey: ['leaderboard'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getLeaderboard();
    },
    enabled: !!actor && !actorFetching,
  });
}

export function useSaveQuizScore() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ phoneNumber, subject, score }: { phoneNumber: string; subject: string; score: number }) => {
      if (!actor) throw new Error('Actor not available');
      await actor.saveQuizScore(phoneNumber, subject, BigInt(score));
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['student', variables.phoneNumber] });
      queryClient.invalidateQueries({ queryKey: ['leaderboard'] });
    },
  });
}

export function useUpdateStreak() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ phoneNumber, newStreak }: { phoneNumber: string; newStreak: number }) => {
      if (!actor) throw new Error('Actor not available');
      await actor.updateStreak(phoneNumber, BigInt(newStreak));
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['student', variables.phoneNumber] });
    },
  });
}
