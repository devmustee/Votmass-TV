import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Video, Comment, MOCK_VIDEOS, MOCK_COMMENTS } from "./mockData";

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  avatarUrl?: string;
  role: "user" | "admin";
  subscriptionActive: boolean;
}

interface AppState {
  // Auth state
  user: UserProfile | null;
  login: (email: string, role: "user" | "admin") => void;
  logout: () => void;
  toggleRole: () => void;
  upgradeSubscription: () => void;

  // Video and actions state
  videos: Video[];
  comments: Comment[];
  likedVideoIds: string[];
  bookmarkedVideoIds: string[];
  downloadedVideoIds: string[];
  watchHistory: Record<string, number>; // videoId -> progressSeconds

  addVideo: (video: Video) => void;
  deleteVideo: (id: string) => void;
  likeVideo: (videoId: string) => void;
  bookmarkVideo: (videoId: string) => void;
  downloadVideo: (videoId: string) => void;
  removeDownload: (videoId: string) => void;
  updateHistory: (videoId: string, progressSeconds: number) => void;
  addComment: (videoId: string, userName: string, content: string) => void;
  deleteComment: (id: string) => void;

  // Video settings
  playbackSpeed: number;
  setPlaybackSpeed: (speed: number) => void;
  volume: number;
  setVolume: (vol: number) => void;
  subtitlesEnabled: boolean;
  toggleSubtitles: () => void;

  // Notifications
  notifications: Array<{ id: string; title: string; content: string; read: boolean; date: string }>;
  addNotification: (title: string, content: string) => void;
  markNotificationsAsRead: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Auth Initial State
      user: {
        id: "u-1",
        email: "guest@votmasstv.com",
        fullName: "Guest Viewer",
        avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop",
        role: "user",
        subscriptionActive: false,
      },
      login: (email, role) => {
        set({
          user: {
            id: "u-custom",
            email,
            fullName: email.split("@")[0].toUpperCase(),
            avatarUrl: `https://images.unsplash.com/photo-${1500000000000 + Math.floor(Math.random() * 1000000)}?q=80&w=100&auto=format&fit=crop`,
            role,
            subscriptionActive: false,
          },
        });
        get().addNotification(
          "Welcome to VOTMASS TV",
          `Logged in successfully as ${role === "admin" ? "Administrator" : "Standard User"}.`
        );
      },
      logout: () => {
        set({ user: null });
      },
      toggleRole: () => {
        const currentUser = get().user;
        if (currentUser) {
          const newRole = currentUser.role === "admin" ? "user" : "admin";
          set({
            user: { ...currentUser, role: newRole },
          });
          get().addNotification(
            "Access Role Updated",
            `Your account has been switched to ${newRole.toUpperCase()} permissions.`
          );
        }
      },
      upgradeSubscription: () => {
        const currentUser = get().user;
        if (currentUser) {
          set({
            user: { ...currentUser, subscriptionActive: true },
          });
          get().addNotification(
            "VIP Subscription Active",
            "Thank you! You now have unrestricted access to premium movies, trailers, and 4K streams."
          );
        }
      },

      // Video States
      videos: MOCK_VIDEOS,
      comments: MOCK_COMMENTS,
      likedVideoIds: ["v-feat-1"],
      bookmarkedVideoIds: ["m-1"],
      downloadedVideoIds: [],
      watchHistory: { "m-2": 240, "fb-1": 180 },

      addVideo: (video) => {
        set((state) => ({
          videos: [video, ...state.videos],
        }));
        get().addNotification("New Content Uploaded", `"${video.title}" has been published to ${video.categoryName}.`);
      },
      deleteVideo: (id) => {
        set((state) => ({
          videos: state.videos.filter((v) => v.id !== id),
        }));
      },
      likeVideo: (videoId) => {
        set((state) => {
          const liked = state.likedVideoIds.includes(videoId);
          const newLiked = liked
            ? state.likedVideoIds.filter((id) => id !== videoId)
            : [...state.likedVideoIds, videoId];

          // Increment/decrement mock likes count
          const updatedVideos = state.videos.map((v) => {
            if (v.id === videoId) {
              return { ...v, likes: liked ? v.likes - 1 : v.likes + 1 };
            }
            return v;
          });

          return {
            likedVideoIds: newLiked,
            videos: updatedVideos,
          };
        });
      },
      bookmarkVideo: (videoId) => {
        set((state) => {
          const bookmarked = state.bookmarkedVideoIds.includes(videoId);
          return {
            bookmarkedVideoIds: bookmarked
              ? state.bookmarkedVideoIds.filter((id) => id !== videoId)
              : [...state.bookmarkedVideoIds, videoId],
          };
        });
      },
      downloadVideo: (videoId) => {
        set((state) => {
          if (state.downloadedVideoIds.includes(videoId)) return {};
          return { downloadedVideoIds: [...state.downloadedVideoIds, videoId] };
        });
        get().addNotification("Download Completed", "Video files compiled to offline memory storage cache.");
      },
      removeDownload: (videoId) => {
        set((state) => ({
          downloadedVideoIds: state.downloadedVideoIds.filter((id) => id !== videoId),
        }));
      },
      updateHistory: (videoId, progressSeconds) => {
        set((state) => ({
          watchHistory: {
            ...state.watchHistory,
            [videoId]: progressSeconds,
          },
        }));
      },
      addComment: (videoId, userName, content) => {
        const newComment: Comment = {
          id: `c-${Date.now()}`,
          videoId,
          userName,
          userAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop",
          content,
          createdAt: new Date().toISOString(),
          replies: [],
        };
        set((state) => ({
          comments: [newComment, ...state.comments],
          videos: state.videos.map((v) =>
            v.id === videoId ? { ...v, commentsCount: v.commentsCount + 1 } : v
          ),
        }));
      },
      deleteComment: (id) => {
        set((state) => ({
          comments: state.comments.filter((c) => c.id !== id),
        }));
      },

      // Video Settings state
      playbackSpeed: 1,
      setPlaybackSpeed: (speed) => set({ playbackSpeed: speed }),
      volume: 0.8,
      setVolume: (vol) => set({ volume: vol }),
      subtitlesEnabled: false,
      toggleSubtitles: () => set((state) => ({ subtitlesEnabled: !state.subtitlesEnabled })),

      // Notifications Initial State
      notifications: [
        {
          id: "n-init-1",
          title: "VOTMASS TV Live Guide",
          content: "Watch our Daily Headline Briefing starting at 04:00 PM today.",
          read: false,
          date: "Just Now",
        },
      ],
      addNotification: (title, content) => {
        const newNotification = {
          id: `notif-${Date.now()}`,
          title,
          content,
          read: false,
          date: "Just Now",
        };
        set((state) => ({
          notifications: [newNotification, ...state.notifications],
        }));
      },
      markNotificationsAsRead: () => {
        set((state) => ({
          notifications: state.notifications.map((n) => ({ ...n, read: true })),
        }));
      },
    }),
    {
      name: "votmass-tv-app-storage",
      partialize: (state) => ({
        user: state.user,
        likedVideoIds: state.likedVideoIds,
        bookmarkedVideoIds: state.bookmarkedVideoIds,
        downloadedVideoIds: state.downloadedVideoIds,
        watchHistory: state.watchHistory,
        playbackSpeed: state.playbackSpeed,
        volume: state.volume,
        subtitlesEnabled: state.subtitlesEnabled,
        notifications: state.notifications,
      }),
    }
  )
);
