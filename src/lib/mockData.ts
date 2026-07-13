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
    youtubeUrl: "https://www.youtube.com/watch?v=0k5D-mS9e6c",
    thumbnailUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=800&auto=format&fit=crop",
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
    title: "Izzar So: Kashi na Daya (Episode 1) 🔥",
    description: "Cikakken shirin drama na Izzar So kashi na 1 daga Bakori TV. Daya daga cikin shahararrun shirin Kannywood na Arewa. #IzzarSo #BakoriTV #Kannywood",
    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    youtubeUrl: "https://www.youtube.com/watch?v=J3mC8w2B9fI",
    thumbnailUrl: "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?q=80&w=800&auto=format&fit=crop",
    categoryId: "cat-5",
    categoryName: "Movies",
    type: "movie",
    duration: 1820,
    views: 891000,
    featured: false,
    trending: true,
    createdAt: "2026-07-12",
    likes: 43200,
    commentsCount: 1420
  },
  {
    id: "yt-3",
    title: "DW Hausa: Gaskiyar Magana Podcast 🎙️",
    description: "Tattaunawa mai zurfi akan batutuwan da suka shafi kalubalen tattalin arziki, ilimi da shugabanci a Arewacin Najeriya. #DWHausa #Arewa #Podcast",
    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    youtubeUrl: "https://www.youtube.com/watch?v=N4tPqR2n1t8",
    thumbnailUrl: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=800&auto=format&fit=crop",
    categoryId: "cat-6",
    categoryName: "Podcasts",
    type: "podcast",
    duration: 615,
    views: 31200,
    featured: true,
    trending: false,
    createdAt: "2026-07-13",
    likes: 1250,
    commentsCount: 78
  },
  {
    id: "yt-4",
    title: "Al'ummarmu Podcast: Financial Literacy in Arewa 💰",
    description: "Wannan kashi na tattaunawa akan yadda matasa zasu samu ilimin kudi, kasuwanci, da kuma cin gashin kai a tattalin arzikin yau. #Finance #HausaPodcast #Matasa",
    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    youtubeUrl: "https://www.youtube.com/watch?v=qg6Qn_3gT4s",
    thumbnailUrl: "https://images.unsplash.com/photo-1487530811176-3780de880c2d?q=80&w=800&auto=format&fit=crop",
    categoryId: "cat-6",
    categoryName: "Podcasts",
    type: "podcast",
    duration: 840,
    views: 18400,
    featured: false,
    trending: true,
    createdAt: "2026-07-11",
    likes: 830,
    commentsCount: 42
  },
  // --- REAL VOTMASS TV FACEBOOK UPLOADS (BABU RUFA-RUFA) ---
  {
    id: "fb-1",
    title: "BABU RUFA-RUFA: Kashi na Farko",
    description: "Shirin da ke tattauna batutuwan da suka shafi rayuwar yau da kullum da kalubalen shugabanci ba tare da ɓoye gaskiya ba. MC Sabi Talk tare da Sadiq SY.",
    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    facebookUrl: "https://web.facebook.com/share/v/1Janebz4ov/",
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
    facebookUrl: "https://web.facebook.com/share/v/1BrENBBiHc/",
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
    facebookUrl: "https://web.facebook.com/share/v/14kAsFo4AaX/",
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
    facebookUrl: "https://web.facebook.com/share/r/1JqTURLkYK/",
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
    facebookUrl: "https://web.facebook.com/share/v/1Hak229wAu/",
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
    title: "The Next Era of African Leadership",
    description: "An exclusive summit dissecting the shift in governance structures, institutional reforms, and youth integration into policy making across emerging economic hubs.",
    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
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
    title: "Sintel: A Cinematic Journey",
    description: "Follow the gripping quest of Sintel as she searches for her baby dragon in a beautiful yet harsh fantasy realm. A showcase of modern narrative independence.",
    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1600&auto=format&fit=crop",
    categoryId: "cat-5",
    categoryName: "Movies",
    type: "movie",
    duration: 888,
    views: 128940,
    featured: true,
    trending: false,
    castList: ["Sintel", "The Shaman", "Land Dragon"],
    director: "Colin Levy",
    createdAt: "2026-05-10",
    likes: 8530,
    commentsCount: 421
  },

  // --- MOVIES ---
  {
    id: "m-1",
    title: "Tears of Steel (Sci-Fi Short Movie)",
    description: "Set in a dystopian future where artificial intelligence and cybernetics collide. A group of scientists gather in Rotterdam to execute a technology reset.",
    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?q=80&w=800&auto=format&fit=crop",
    categoryId: "cat-5",
    categoryName: "Movies",
    type: "movie",
    duration: 734,
    views: 89045,
    featured: false,
    trending: true,
    castList: ["Derek de Lint", "Rogier Schippers", "Jody Bhe"],
    director: "Ian Hubert",
    createdAt: "2026-07-01",
    likes: 3105,
    commentsCount: 220
  },
  {
    id: "m-2",
    title: "Big Buck Bunny",
    description: "A comedy story of a giant rabbit whose morning is disrupted by mischievous forest rodents. He schemes a series of interactive traps to regain his peace.",
    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800&auto=format&fit=crop",
    categoryId: "cat-5",
    categoryName: "Movies",
    type: "movie",
    duration: 596,
    views: 243950,
    featured: false,
    trending: false,
    castList: ["Bunny", "Frank the Squirrel", "Rinky"],
    director: "Sacha Goedegebure",
    createdAt: "2026-04-20",
    likes: 12450,
    commentsCount: 884
  },
  {
    id: "m-3",
    title: "Cosmos Laundromat (Fantasy Short)",
    description: "On a desolate island, a suicidal sheep meets a quirky salesman who offers him a transformation deal that sends him spinning through space and time.",
    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubTee.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=800&auto=format&fit=crop",
    categoryId: "cat-5",
    categoryName: "Movies",
    type: "movie",
    duration: 610,
    views: 54100,
    featured: false,
    trending: true,
    castList: ["Fran the Sheep", "Victor"],
    director: "Mathieu Auvray",
    createdAt: "2026-07-10",
    likes: 2190,
    commentsCount: 95
  },

  // --- DOCUMENTARIES ---
  {
    id: "doc-1",
    title: "The Silicon Savanna Rising",
    description: "An investigative documentary tracing the explosive tech ecosystem expansion across East Africa, interviewing startup founders, venture fund managers, and developers.",
    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
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
    title: "Youth, Governance & Civic Resilience",
    description: "Analyzing the role of digital organizing and grassroots networks in building civic engagement channels for the under-30 demographic globally.",
    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubTee.mp4",
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
    title: "Green Tech Mini-Grids Exploration",
    description: "A deep dive into localized solar and wind installation hubs providing persistent rural electrical supply to communities bypassing national grids.",
    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
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
    title: "Votmass Dialogue Ep 24: Reimagining Education Systems",
    description: "A sit-down conversation with leading educational reformers on adapting modern secondary curriculum to standard artificial intelligence and automation competencies.",
    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=800&auto=format&fit=crop",
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
    title: "Youth Empowerment Frameworks for 2026",
    description: "We invite policy directors to analyze skill development pipelines, youth funding grants, and national digital infrastructure investments.",
    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubTee.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1487530811176-3780de880c2d?q=80&w=800&auto=format&fit=crop",
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
    title: "Future of AI Agentic Collaboration",
    description: "Discussing how next generation developer ecosystems depend on code agents, workflows integrations, and sandbox compilers.",
    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
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
    title: "National Tech Incubator Expansion Approved",
    description: "Breaking Update: The Senate approves a $150M development budget to construct 14 regional digital technology incubator hubs across outer states.",
    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
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
    title: "Youth Leadership Summit Slated for October",
    description: "Over 40 nations confirm attendance for the upcoming Global Youth Leadership summit addressing economic integration and micro-credit grants.",
    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
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
    title: "3 Keys to Impactful Leadership 🔑",
    description: "Quick breakdown on empathy, transparency, and strategic foresight. #leadership #youth #growth",
    url: "https://assets.mixkit.co/videos/preview/mixkit-girl-in-neon-sign-looking-at-camera-34282-large.mp4",
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
    title: "Why Mentorship Matters more than money! 💡",
    description: "Surround yourself with guides who challenge your perspectives. #mentorship #education",
    url: "https://assets.mixkit.co/videos/preview/mixkit-man-dancing-under-neon-lights-34281-large.mp4",
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
    title: "Tech skills you need in 2026 💻",
    description: "Skip learning syntax, focus on logic and AI agent collaboration frameworks. #tech #code",
    url: "https://assets.mixkit.co/videos/preview/mixkit-keyboard-keys-lit-with-neon-colors-34287-large.mp4",
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
    title: "Nature will restore your energy 🌲",
    description: "Unplug, touch grass, and notice the mental bandwidth shift. #mindfulness #wellness",
    url: "https://assets.mixkit.co/videos/preview/mixkit-waterfall-in-forest-2213-large.mp4",
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
