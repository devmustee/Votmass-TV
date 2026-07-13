export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
}

export interface Video {
  id: string;
  title: string;
  description: string;
  url: string;
  thumbnailUrl: string;
  categoryId: string;
  categoryName: string;
  type: 'video' | 'movie' | 'short' | 'podcast' | 'documentary' | 'news';
  duration: number; // in seconds
  views: number;
  featured: boolean;
  trending: boolean;
  castList?: string[];
  director?: string;
  scheduleTime?: string; // for live schedule
  createdAt: string;
  likes: number;
  commentsCount: number;
  facebookUrl?: string;
  youtubeUrl?: string;
}

export interface Comment {
  id: string;
  videoId: string;
  userName: string;
  userAvatar?: string;
  content: string;
  createdAt: string;
  replies?: Reply[];
}

export interface Reply {
  id: string;
  commentId: string;
  userName: string;
  userAvatar?: string;
  content: string;
  createdAt: string;
}

export interface LiveProgram {
  id: string;
  title: string;
  time: string;
  duration: string;
  description: string;
  isActive: boolean;
}

export const CATEGORIES: Category[] = [
  { id: "cat-1", name: "Leadership & Governance", slug: "leadership-governance", description: "Speeches, policy talks, and governance panels." },
  { id: "cat-2", name: "Youth Development", slug: "youth-development", description: "Empowerment workshops, skills, and growth series." },
  { id: "cat-3", name: "Education", slug: "education", description: "Academic insights, professional classes, and science." },
  { id: "cat-4", name: "Documentaries", slug: "documentaries", description: "In-depth investigative reports, history, and culture." },
  { id: "cat-5", name: "Movies", slug: "movies", description: "Independent stories, custom drama, and blockbusters." },
  { id: "cat-6", name: "Podcasts", slug: "podcasts", description: "Audio-visual talk shows, debates, and expert interviews." },
  { id: "cat-7", name: "News", slug: "news", description: "Up-to-date reports and global occurrences." }
];

export const MOCK_VIDEOS: Video[] = [
  // --- HAUSA YOUTUBE MOVIE & PODCAST SEEDS ---
  {
    id: "yt-1",
    title: "Dadin Kowa Sabon Salo - Kashi na Farko 🎬",
    description: "Cikakken shirin Dadin Kowa Sabon Salo Kashi na 1. Ku kalli yadda rayuwar al'umma ta sarrafa a cikin Dadin Kowa ta Arewa24. #Arewa24 #DadinKowa #HausaFilms",
    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
    youtubeUrl: "https://www.youtube.com/watch?v=ftRhZIUuH9o",
    thumbnailUrl: "https://i.ytimg.com/vi/ftRhZIUuH9o/mqdefault.jpg",
    categoryId: "cat-5",
    categoryName: "Movies",
    type: "movie",
    duration: 1450,
    views: 452900,
    featured: true,
    trending: true,
    createdAt: "2026-07-13",
    likes: 21900,
    commentsCount: 884
  },
  {
    id: "yt-2",
    title: "Baba Audu - Cikakken Shirin Trailer 🎬",
    description: "Kalli shirin BABA AUDU (Official Trailer) - Sabon shirin Hausa Drama Series na shekarar 2025/2026 daga Alkhairi TV. #Kannywood #HausaDrama #BabaAudu",
    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    youtubeUrl: "https://www.youtube.com/watch?v=4Fb8xZYY_tk",
    thumbnailUrl: "https://i.ytimg.com/vi/4Fb8xZYY_tk/mqdefault.jpg",
    categoryId: "cat-5",
    categoryName: "Movies",
    type: "movie",
    duration: 120,
    views: 891000,
    featured: false,
    trending: true,
    createdAt: "2026-07-12",
    likes: 43200,
    commentsCount: 1420
  },
  {
    id: "yt-3",
    title: "Hamisu Breaker - Jaruma (Official Music Video) 🎵",
    description: "Kalli shahararriyar wakar Hamisu Breaker mai taken Jaruma. Daya daga cikin mafi shaharar wakar soyayya ta Hausa da ta shahara a sassan duniya. #HamisuBreaker #Jaruma #HausaMusic",
    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    youtubeUrl: "https://www.youtube.com/watch?v=n7qm2CNSDV4",
    thumbnailUrl: "https://i.ytimg.com/vi/n7qm2CNSDV4/mqdefault.jpg",
    categoryId: "cat-6",
    categoryName: "Podcasts",
    type: "podcast",
    duration: 315,
    views: 12452900,
    featured: true,
    trending: false,
    createdAt: "2026-07-13",
    likes: 432500,
    commentsCount: 21978
  },
  {
    id: "yt-4",
    title: "Dadin Kowa | Wasa Farin Girki | Kashi Na 1 Part 1 🎬",
    description: "Cikakken shirin Dadin Kowa kashi na daya part 1 daga Arewa24. Ku biyo mu cikin shirin don ganin yadda zance yake wakana a cikin garin Dadin Kowa. #Arewa24 #DadinKowa #Kannywood",
    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    youtubeUrl: "https://www.youtube.com/watch?v=Ol8fIWlYWr8",
    thumbnailUrl: "https://i.ytimg.com/vi/Ol8fIWlYWr8/mqdefault.jpg",
    categoryId: "cat-5",
    categoryName: "Movies",
    type: "movie",
    duration: 840,
    views: 184000,
    featured: false,
    trending: true,
    createdAt: "2026-07-11",
    likes: 8300,
    commentsCount: 420
  },
  // --- REAL VOTMASS TV FACEBOOK UPLOADS (BABU RUFA-RUFA) ---
  {
    id: "fb-1",
    title: "BABU RUFA-RUFA: Kashi na Farko",
    description: "Shirin da ke tattauna batutuwan da suka shafi rayuwar yau da kullum da kalubalen shugabanci ba tare da ɓoye gaskiya ba. MC Sabi Talk tare da Sadiq SY.",
    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    facebookUrl: "https://www.facebook.com/watch/?v=1279395581917754",
    thumbnailUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800&auto=format&fit=crop",
    categoryId: "cat-1",
    categoryName: "Leadership & Governance",
    type: "video",
    duration: 845,
    views: 8900,
    featured: true,
    trending: true,
    createdAt: "2026-07-13",
    likes: 410,
    commentsCount: 15
  },
  {
    id: "fb-2",
    title: "BABBAR MAGANA🔥 KADAN DAGA SHIRIN BABU RUFA-RUFA",
    description: "MC Sabi Talk da Sadiq SY a cikin shirin Babu Rufa-Rufa na Votmass TV. #SABITALK #facebookreels #facebookviral",
    url: "https://assets.mixkit.co/videos/preview/mixkit-girl-in-neon-sign-looking-at-camera-34282-large.mp4",
    facebookUrl: "https://www.facebook.com/reel/1013380138004229",
    thumbnailUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=400&auto=format&fit=crop",
    categoryId: "cat-2",
    categoryName: "Youth Development",
    type: "short",
    duration: 40,
    views: 12400,
    featured: false,
    trending: true,
    createdAt: "2026-07-13",
    likes: 1850,
    commentsCount: 92
  },
  {
    id: "fb-3",
    title: "Babu Rufa-Rufa: Davido da Rarara Muhawara",
    description: "Muhawara mai zafi kan Musayar yawu da kalaman da suka gudana tsakanin Davido da Rarara. #baburufarufa #votmasstv #davido #rarara",
    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    facebookUrl: "https://www.facebook.com/reel/1665503284661540",
    thumbnailUrl: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=800&auto=format&fit=crop",
    categoryId: "cat-6",
    categoryName: "Podcasts",
    type: "podcast",
    duration: 540,
    views: 7300,
    featured: false,
    trending: true,
    createdAt: "2026-07-12",
    likes: 620,
    commentsCount: 44
  },
  {
    id: "fb-4",
    title: "Highlights: Babu Rufa-Rufa Votmass TV",
    description: "Highlights na shirin Babu Rufa-Rufa na Votmass TV. #highlights #reels",
    url: "https://assets.mixkit.co/videos/preview/mixkit-man-dancing-under-neon-lights-34281-large.mp4",
    facebookUrl: "https://www.facebook.com/reel/976940681818174",
    thumbnailUrl: "https://images.unsplash.com/photo-1487530811176-3780de880c2d?q=80&w=400&auto=format&fit=crop",
    categoryId: "cat-2",
    categoryName: "Youth Development",
    type: "short",
    duration: 30,
    views: 9800,
    featured: false,
    trending: false,
    createdAt: "2026-07-11",
    likes: 1200,
    commentsCount: 38
  },
  {
    id: "fb-5",
    title: "Cikakken Hirar MC Sabi Talk & Sadiq SY (Part 1)",
    description: "Cikken Hirar mu da MC Sabi Talk Tare da Sadiq SY Acikin shirin mu Na BABU RUFA-RUFA Kashi Na Daya 1. #leaderleneke #Adamawa",
    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubTee.mp4",
    facebookUrl: "https://www.facebook.com/reel/1279395581917754",
    thumbnailUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800&auto=format&fit=crop",
    categoryId: "cat-1",
    categoryName: "Leadership & Governance",
    type: "video",
    duration: 980,
    views: 6500,
    featured: false,
    trending: false,
    createdAt: "2026-07-10",
    likes: 340,
    commentsCount: 19
  },
  // --- HERO / FEATURED VIDEOS ---
  {
    id: "v-feat-1",
    title: "Babu Rufa-Rufa: Jagoranci da Kalubalen Al'umma",
    description: "Shirin da ke tattauna batutuwan da suka shafi rayuwar yau da kullum da kalubalen shugabanci ba tare da ɓoye gaskiya ba. MC Sabi Talk tare da Sadiq SY.",
    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    facebookUrl: "https://www.facebook.com/watch/?v=1279395581917754",
    thumbnailUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1600&auto=format&fit=crop",
    categoryId: "cat-1",
    categoryName: "Leadership & Governance",
    type: "video",
    duration: 734,
    views: 45209,
    featured: true,
    trending: true,
    createdAt: "2026-06-15",
    likes: 2450,
    commentsCount: 142
  },
  {
    id: "v-feat-2",
    title: "Dadin Kowa Sabon Salo - Babban Shirin Arewa24 🎬",
    description: "Cikakken shirin Dadin Kowa Sabon Salo Kashi na 1. Ku kalli yadda rayuwar al'umma ta sarrafa a cikin Dadin Kowa ta Arewa24. #Arewa24 #DadinKowa #HausaFilms",
    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
    youtubeUrl: "https://www.youtube.com/watch?v=ftRhZIUuH9o",
    thumbnailUrl: "https://i.ytimg.com/vi/ftRhZIUuH9o/mqdefault.jpg",
    categoryId: "cat-5",
    categoryName: "Movies",
    type: "movie",
    duration: 888,
    views: 128940,
    featured: true,
    trending: false,
    castList: ["Arewa24 Cast"],
    director: "Arewa24",
    createdAt: "2026-05-10",
    likes: 8530,
    commentsCount: 421
  },
  // --- MOVIES ---
  {
    id: "m-1",
    title: "Baba Audu - Official Kannywood Trailer 🎬",
    description: "Kalli shirin BABA AUDU (Official Trailer) - Sabon shirin Hausa Drama Series na shekarar 2025/2026 daga Alkhairi TV. #Kannywood #HausaDrama #BabaAudu",
    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    youtubeUrl: "https://www.youtube.com/watch?v=4Fb8xZYY_tk",
    thumbnailUrl: "https://i.ytimg.com/vi/4Fb8xZYY_tk/mqdefault.jpg",
    categoryId: "cat-5",
    categoryName: "Movies",
    type: "movie",
    duration: 734,
    views: 89045,
    featured: false,
    trending: true,
    castList: ["Baba Audu Cast"],
    director: "Alkhairi TV",
    createdAt: "2026-07-01",
    likes: 3105,
    commentsCount: 220
  },
  {
    id: "m-2",
    title: "Labarina Season 1 Episode 1 - Aminu Saira Series 🎬",
    description: "Cikakken shirin drama na Labarina kashi na 1 daga Saira Movies. Daya daga cikin shahararrun shirin Kannywood na Arewa. #Labarina #SairaMovies #Kannywood",
    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    youtubeUrl: "https://www.youtube.com/watch?v=-3u0jz82jQI",
    thumbnailUrl: "https://i.ytimg.com/vi/-3u0jz82jQI/mqdefault.jpg",
    categoryId: "cat-5",
    categoryName: "Movies",
    type: "movie",
    duration: 596,
    views: 243950,
    featured: false,
    trending: false,
    castList: ["Labarina Cast"],
    director: "Aminu Saira",
    createdAt: "2026-04-20",
    likes: 12450,
    commentsCount: 884
  },
  {
    id: "m-3",
    title: "Dadin Kowa | Wasa Farin Girki - Kashi na Farko 🎬",
    description: "Cikakken shirin Dadin Kowa kashi na daya part 1 daga Arewa24. Ku biyo mu cikin shirin don ganin yadda zance yake wakana a cikin garin Dadin Kowa. #Arewa24 #DadinKowa #Kannywood",
    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubTee.mp4",
    youtubeUrl: "https://www.youtube.com/watch?v=Ol8fIWlYWr8",
    thumbnailUrl: "https://i.ytimg.com/vi/Ol8fIWlYWr8/mqdefault.jpg",
    categoryId: "cat-5",
    categoryName: "Movies",
    type: "movie",
    duration: 610,
    views: 54100,
    featured: false,
    trending: true,
    castList: ["Arewa24 Cast"],
    director: "Arewa24",
    createdAt: "2026-07-10",
    likes: 2190,
    commentsCount: 95
  },
  // --- DOCUMENTARIES ---
  {
    id: "doc-1",
    title: "Votmass Documentary: Babu Rufa-Rufa (Kashi na 1)",
    description: "Shirin da ke tattauna batutuwan da suka shafi rayuwar yau da kullum da kalubalen shugabanci ba tare da ɓoye gaskiya ba. MC Sabi Talk tare da Sadiq SY.",
    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    facebookUrl: "https://www.facebook.com/watch/?v=1279395581917754",
    thumbnailUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop",
    categoryId: "cat-4",
    categoryName: "Documentaries",
    type: "documentary",
    duration: 653,
    views: 34102,
    featured: false,
    trending: true,
    createdAt: "2026-06-28",
    likes: 1845,
    commentsCount: 96
  },
  {
    id: "doc-2",
    title: "Babu Rufa-Rufa: Tattaunawa Kan Rayuwar Matasa",
    description: "MC Sabi Talk da Sadiq SY a cikin shirin Babu Rufa-Rufa na Votmass TV. #SABITALK #facebookreels #facebookviral",
    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubTee.mp4",
    facebookUrl: "https://www.facebook.com/reel/1279395581917754",
    thumbnailUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=800&auto=format&fit=crop",
    categoryId: "cat-4",
    categoryName: "Documentaries",
    type: "documentary",
    duration: 450,
    views: 18930,
    featured: false,
    trending: false,
    createdAt: "2026-07-05",
    likes: 920,
    commentsCount: 48
  },
  {
    id: "doc-3",
    title: "Kalubalen Shugabanci da Cigaban Kasa",
    description: "Tattaunawa ta musamman kan kalubalen shugabanci, zargin cin hanci, da kuma hanyoyin magance su domin cigaban matasa a kasar tamu.",
    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
    facebookUrl: "https://www.facebook.com/reel/1031315449457480",
    thumbnailUrl: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?q=80&w=800&auto=format&fit=crop",
    categoryId: "cat-4",
    categoryName: "Documentaries",
    type: "documentary",
    duration: 382,
    views: 14200,
    featured: false,
    trending: false,
    createdAt: "2026-07-12",
    likes: 650,
    commentsCount: 33
  },
  // --- PODCASTS ---
  {
    id: "pod-1",
    title: "Hamisu Breaker - Jaruma Podcast & Music Video 🎵",
    description: "Tattaunawa mai kayatarwa tare da fitaccen mawakin soyayya na Hausa Hamisu Breaker tare da wakar Jaruma. #HamisuBreaker #Jaruma",
    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    youtubeUrl: "https://www.youtube.com/watch?v=n7qm2CNSDV4",
    thumbnailUrl: "https://i.ytimg.com/vi/n7qm2CNSDV4/mqdefault.jpg",
    categoryId: "cat-6",
    categoryName: "Podcasts",
    type: "podcast",
    duration: 902,
    views: 12054,
    featured: false,
    trending: true,
    createdAt: "2026-07-10",
    likes: 742,
    commentsCount: 55
  },
  {
    id: "pod-2",
    title: "Babu Rufa-Rufa: Davido da Rarara Podcast",
    description: "Muhawara mai zafi kan Musayar yawu da kalaman da suka gudana tsakanin Davido da Rarara. #baburufarufa #votmasstv #davido #rarara",
    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubTee.mp4",
    facebookUrl: "https://www.facebook.com/reel/1665503284661540",
    thumbnailUrl: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=800&auto=format&fit=crop",
    categoryId: "cat-6",
    categoryName: "Podcasts",
    type: "podcast",
    duration: 615,
    views: 8900,
    featured: false,
    trending: false,
    createdAt: "2026-07-02",
    likes: 410,
    commentsCount: 31
  },
  {
    id: "pod-3",
    title: "Babu Rufa-Rufa: MC Sabi Talk & Sadiq SY",
    description: "Cikken Hirar mu da MC Sabi Talk Tare da Sadiq SY Acikin shirin mu Na BABU RUFA-RUFA. Domin jin sahihin labari da muhawara ta gaskiya.",
    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    facebookUrl: "https://www.facebook.com/reel/1031315449457480",
    thumbnailUrl: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=800&auto=format&fit=crop",
    categoryId: "cat-6",
    categoryName: "Podcasts",
    type: "podcast",
    duration: 724,
    views: 22100,
    featured: false,
    trending: true,
    createdAt: "2026-07-13",
    likes: 1250,
    commentsCount: 88
  },
  // --- NEWS ---
  {
    id: "n-1",
    title: "Votmass News: Highlights Babu Rufa-Rufa Live",
    description: "Highlights na shirin Babu Rufa-Rufa na Votmass TV. #highlights #reels #news",
    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    facebookUrl: "https://www.facebook.com/reel/976940681818174",
    thumbnailUrl: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=800&auto=format&fit=crop",
    categoryId: "cat-7",
    categoryName: "News",
    type: "news",
    duration: 320,
    views: 52044,
    featured: false,
    trending: true,
    createdAt: "2026-07-13",
    likes: 2190,
    commentsCount: 177
  },
  {
    id: "n-2",
    title: "Votmass TV News Desk: Labarin MC Sabi Talk",
    description: "Cikakken labari da muhawara akan rayuwar al'umma da kuma matasa na yau. Babu rufa-rufa a kowane lokaci.",
    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    facebookUrl: "https://www.facebook.com/reel/1013380138004229",
    thumbnailUrl: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=800&auto=format&fit=crop",
    categoryId: "cat-7",
    categoryName: "News",
    type: "news",
    duration: 290,
    views: 15400,
    featured: false,
    trending: false,
    createdAt: "2026-07-11",
    likes: 680,
    commentsCount: 22
  },
  // --- SHORTS (TIKTOK EXPERIENCE) ---
  {
    id: "sh-1",
    title: "MC Sabi Talk: Babbar Magana Shorts",
    description: "Quick breakdown on empathy, transparency, and strategic foresight. #leadership #youth #growth",
    url: "https://assets.mixkit.co/videos/preview/mixkit-girl-in-neon-sign-looking-at-camera-34282-large.mp4",
    facebookUrl: "https://www.facebook.com/reel/1013380138004229",
    thumbnailUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&auto=format&fit=crop",
    categoryId: "cat-2",
    categoryName: "Youth Development",
    type: "short",
    duration: 30,
    views: 184900,
    featured: false,
    trending: true,
    createdAt: "2026-07-12",
    likes: 45900,
    commentsCount: 1290
  },
  {
    id: "sh-2",
    title: "Davido vs Rarara Debate Shorts",
    description: "Surround yourself with guides who challenge your perspectives. #mentorship #education",
    url: "https://assets.mixkit.co/videos/preview/mixkit-man-dancing-under-neon-lights-34281-large.mp4",
    facebookUrl: "https://www.facebook.com/reel/1665503284661540",
    thumbnailUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=400&auto=format&fit=crop",
    categoryId: "cat-2",
    categoryName: "Youth Development",
    type: "short",
    duration: 25,
    views: 94200,
    featured: false,
    trending: true,
    createdAt: "2026-07-11",
    likes: 23100,
    commentsCount: 740
  },
  {
    id: "sh-3",
    title: "Votmass Highlights Shorts",
    description: "Skip learning syntax, focus on logic and AI agent collaboration frameworks. #tech #code",
    url: "https://assets.mixkit.co/videos/preview/mixkit-keyboard-keys-lit-with-neon-colors-34287-large.mp4",
    facebookUrl: "https://www.facebook.com/reel/976940681818174",
    thumbnailUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=400&auto=format&fit=crop",
    categoryId: "cat-3",
    categoryName: "Education",
    type: "short",
    duration: 42,
    views: 295000,
    featured: false,
    trending: true,
    createdAt: "2026-07-10",
    likes: 87400,
    commentsCount: 3410
  },
  {
    id: "sh-4",
    title: "MC Sabi Talk: Jagorancin Matasa Shorts",
    description: "Unplug, touch grass, and notice the mental bandwidth shift. #mindfulness #wellness",
    url: "https://assets.mixkit.co/videos/preview/mixkit-waterfall-in-forest-2213-large.mp4",
    facebookUrl: "https://www.facebook.com/reel/1031315449457480",
    thumbnailUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=400&auto=format&fit=crop",
    categoryId: "cat-2",
    categoryName: "Youth Development",
    type: "short",
    duration: 15,
    views: 67100,
    featured: false,
    trending: false,
    createdAt: "2026-07-09",
    likes: 12900,
    commentsCount: 310
  }
];

export const MOCK_COMMENTS: Comment[] = [
  {
    id: "c-1",
    videoId: "v-feat-1",
    userName: "Adamu Ibrahim",
    userAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop",
    content: "Absolutely phenomenal analysis. The section on structural governance frameworks hits the nail on the head. We need youth integration now more than ever.",
    createdAt: "2026-07-12T14:30:00Z",
    replies: [
      {
        id: "r-1",
        commentId: "c-1",
        userName: "Chioma Okereke",
        userAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop",
        content: "Totally agree Adamu! The primary barrier is usually policy access. We need mentorship bridges built into the legislative layers.",
        createdAt: "2026-07-12T15:10:00Z"
      }
    ]
  },
  {
    id: "c-2",
    videoId: "v-feat-1",
    userName: "Marcus Thompson",
    userAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&auto=format&fit=crop",
    content: "High quality production and rigorous discussions. VOTMASS TV is setting a massive standard for digital journalism on the continent.",
    createdAt: "2026-07-13T09:20:00Z"
  }
];

export const LIVE_SCHEDULE: LiveProgram[] = [
  {
    id: "lp-1",
    title: "Sunrise Briefing & Headlines",
    time: "07:00 AM - 08:30 AM",
    duration: "90 min",
    description: "Daily breakdowns of political and economic headlines shaping the global media sphere.",
    isActive: false
  },
  {
    id: "lp-2",
    title: "Youth Summit Panel: Leadership Models",
    time: "08:30 AM - 10:30 AM",
    duration: "120 min",
    description: "Live panel with founders, tech innovators, and policy strategists debating leadership strategies.",
    isActive: false
  },
  {
    id: "lp-3",
    title: "Governance & The Citizenry Dialogue",
    time: "10:30 AM - 12:30 PM",
    duration: "120 min",
    description: "Interactive citizens dialogue addressing municipal reforms and legislative representation.",
    isActive: false
  },
  {
    id: "lp-4",
    title: "Votmass TV News Desk Live",
    time: "04:00 PM - 05:30 PM",
    duration: "90 min",
    description: "Our current active broadcast coverage representing breaking local and international reports.",
    isActive: true
  },
  {
    id: "lp-5",
    title: "The Documentary Hour: Green Tech Expansion",
    time: "06:00 PM - 07:00 PM",
    duration: "60 min",
    description: "Investigating the shift towards clean, localized mini-grids in rural regions.",
    isActive: false
  },
  {
    id: "lp-6",
    title: "Nightly Dialogues: Economic Projections",
    time: "08:00 PM - 09:30 PM",
    duration: "90 min",
    description: "Financial analysts project market shifts, startup valuations, and interest rate hikes.",
    isActive: false
  }
];
