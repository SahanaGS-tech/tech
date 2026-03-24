import { useState } from "react";

const platforms = [
  {
    id: "youtube",
    label: "YouTube",
    icon: "▶",
    accent: "#FF0000",
    desc: "Subscribe once → new content arrives forever",
    channels: [
      { name: "Andrej Karpathy", handle: "@AndrejKarpathy", url: "https://www.youtube.com/@AndrejKarpathy", why: "Ex-OpenAI/Tesla. Builds LLMs from scratch on camera. His 'Let's build GPT' and tokenizer videos are legendary. Deep intuition on how models actually work.", tags: ["llm", "research", "fundamentals"], tier: "must" },
      { name: "LangChain", handle: "@LangChain", url: "https://www.youtube.com/@LangChain", why: "Official channel. RAG pipeline tutorials, LangGraph multi-agent workflows, new feature walkthroughs. Directly relevant to your daily work.", tags: ["rag", "agents", "framework"], tier: "must" },
      { name: "AssemblyAI", handle: "@AssemblyAI", url: "https://www.youtube.com/@AssemblyAI", why: "Voice AI deep dives — STT/TTS architectures, real-time ASR, voice agent building tutorials. The best channel for speech AI engineering.", tags: ["asr", "tts", "voice", "latency"], tier: "must" },
      { name: "DeepLearning.AI", handle: "@Deeplearningai", url: "https://www.youtube.com/@Deeplearningai", why: "Andrew Ng's channel. Free short courses on RAG, agents, fine-tuning, prompt engineering. New courses drop regularly with industry partners.", tags: ["rag", "agents", "courses"], tier: "must" },
      { name: "Yannic Kilcher", handle: "@YannicKilcher", url: "https://www.youtube.com/@YannicKilcher", why: "Paper breakdowns within days of release. Transformer variants, RAG papers, agent architectures. Brutally honest analysis.", tags: ["research", "papers", "llm"], tier: "high" },
      { name: "sentdex", handle: "@sentdex", url: "https://www.youtube.com/@sentdex", why: "Full end-to-end builds — from model training to deployment. Raw, practical, shows the messy debugging parts. Full-stack ML.", tags: ["llm", "production", "code"], tier: "high" },
      { name: "Krish Naik", handle: "@krishnaik06", url: "https://www.youtube.com/@krishnaik06", why: "Prolific tutorials on RAG with LangChain/LlamaIndex, agentic AI, fine-tuning, vector DBs. Very hands-on and project-driven.", tags: ["rag", "agents", "tutorials"], tier: "high" },
      { name: "VoloBuilds", handle: "@VoloBuilds", url: "https://www.youtube.com/@VoloBuilds", why: "Deep developer-focused content on RAG systems, AI agents, and modern AI patterns. For experienced engineers, not beginners.", tags: ["rag", "agents", "advanced"], tier: "high" },
      { name: "Two Minute Papers", handle: "@TwoMinutePapers", url: "https://www.youtube.com/@TwoMinutePapers", why: "Quick, exciting breakdowns of new AI research. Good for spotting breakthroughs across all AI domains fast.", tags: ["research", "quick", "general"], tier: "good" },
      { name: "AI Explained", handle: "@AIExplained-official", url: "https://www.youtube.com/@AIExplained-official", why: "Thoughtful deep dives into model capabilities, benchmarks, and where AI is actually heading. Less hype, more substance.", tags: ["analysis", "llm", "benchmarks"], tier: "good" },
      { name: "Matt Wolfe", handle: "@maboroshi", url: "https://www.youtube.com/@maboroshi", why: "Weekly AI news roundups covering new tools, models, and products. Great for quick scanning of the week's developments.", tags: ["news", "tools", "weekly"], tier: "good" },
      { name: "Dwarkesh Patel", handle: "@DwarkeshPatel", url: "https://www.youtube.com/@DwarkeshPatel", why: "Long-form interviews with top AI researchers (Karpathy, Sutton, etc). Deep conversations about where the field is actually going.", tags: ["interviews", "frontier", "research"], tier: "good" },
    ],
  },
  {
    id: "x",
    label: "X / Twitter",
    icon: "𝕏",
    accent: "#1DA1F2",
    desc: "Real-time pulse of AI — papers drop here first",
    channels: [
      { name: "Andrej Karpathy", handle: "@karpathy", url: "https://x.com/karpathy", why: "Clear thinking on LLMs, training, and where the field is going. When he posts, it's always worth reading.", tags: ["llm", "research", "fundamentals"], tier: "must" },
      { name: "swyx (Shawn Wang)", handle: "@swyx", url: "https://x.com/swyx", why: "AI Engineer community leader. Latent Space newsletter/podcast. Breaking news on agents, RAG, infra. The AI engineering voice.", tags: ["agents", "rag", "infra"], tier: "must" },
      { name: "Simon Willison", handle: "@simonw", url: "https://x.com/simonw", why: "Constantly experimenting with latest models. Practical, code-heavy observations. First to test new releases and share findings.", tags: ["llm", "tools", "practical"], tier: "must" },
      { name: "Sebastian Raschka", handle: "@rasaborsi", url: "https://x.com/rasbt", why: "Implementation-focused. Architecture breakdowns, LLM tutorials, training techniques. If you build models, essential follow.", tags: ["llm", "training", "research"], tier: "must" },
      { name: "DAIR.AI", handle: "@daborosi", url: "https://x.com/daborosi", why: "'ML Papers of the Week' threads. Technical but readable research pointers. One of the most dependable AI research feeds.", tags: ["research", "papers", "weekly"], tier: "must" },
      { name: "Ethan Mollick", handle: "@emollick", url: "https://x.com/emollick", why: "UPenn professor. How LLMs change work, education, productivity. Less about internals, more about 'what does this mean?'", tags: ["practical", "future", "analysis"], tier: "high" },
      { name: "Nathan Lambert", handle: "@natolambert", url: "https://x.com/natolambert", why: "RLHF and LLM-centric deep dives. Fast, thorough coverage of new model releases. Interconnects newsletter companion.", tags: ["llm", "rlhf", "models"], tier: "high" },
      { name: "Harrison Chase", handle: "@hwchase17", url: "https://x.com/hwchase17", why: "LangChain CEO. First to announce RAG/agent framework updates. Direct source for the most-used RAG tooling.", tags: ["rag", "agents", "langchain"], tier: "high" },
      { name: "alphaXiv", handle: "@alphaXiv", url: "https://x.com/alphaXiv", why: "Social layer on top of arXiv papers. Discover and discuss trending research with community annotations.", tags: ["research", "papers", "discovery"], tier: "high" },
      { name: "Logan Kilpatrick", handle: "@OfficialLoganK", url: "https://x.com/OfficialLoganK", why: "Google DeepMind product lead (ex-OpenAI). AI developer tooling, Gemini updates, API changes from the inside.", tags: ["tools", "api", "google"], tier: "high" },
      { name: "Akshay Pachaar", handle: "@akshay_pachaar", url: "https://x.com/akshay_pachaar", why: "240K followers. Simplifies LLMs, AI Agents, RAG, and ML. Co-founder of Daily Dose of DS. Great visual explanations.", tags: ["rag", "agents", "visual"], tier: "high" },
      { name: "Yann LeCun", handle: "@ylecun", url: "https://x.com/ylecun", why: "Meta's Chief AI Scientist. Provocative takes on open-source AI, architecture debates, and fundamental limits of LLMs.", tags: ["research", "open-source", "frontier"], tier: "good" },
      { name: "Chip Huyen", handle: "@chipro", url: "https://x.com/chipro", why: "AI Engineering book author. System design for production ML, RAG architectures, and engineering best practices.", tags: ["production", "system-design", "rag"], tier: "good" },
      { name: "Jim Fan", handle: "@DrJimFan", url: "https://x.com/DrJimFan", why: "NVIDIA senior research scientist. Multimodal agents, embodied AI, and foundation model research at the frontier.", tags: ["agents", "multimodal", "research"], tier: "good" },
    ],
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    icon: "in",
    accent: "#0A66C2",
    desc: "Professional AI insights + industry moves",
    channels: [
      { name: "Andrej Karpathy", handle: "andrej-karpathy", url: "https://www.linkedin.com/in/andrej-karpathy/", why: "Technical posts on LLMs, RAG optimization, and model internals. Explains complex concepts accessibly.", tags: ["llm", "research"], tier: "must" },
      { name: "Ethan Mollick", handle: "emollick", url: "https://www.linkedin.com/in/emollick/", why: "Leading authority on how GenAI changes work. Data-driven posts on productivity, creativity, and AI impact.", tags: ["practical", "future"], tier: "must" },
      { name: "Chip Huyen", handle: "chiphuyen", url: "https://www.linkedin.com/in/chiphuyen/", why: "Production AI systems, MLOps, RAG architecture decisions. Posts from real-world engineering experience.", tags: ["production", "rag", "system-design"], tier: "must" },
      { name: "Andrew Ng", handle: "andrewyng", url: "https://www.linkedin.com/in/andrewyng/", why: "DeepLearning.AI founder. AI education, industry trends, practical implementation strategies. Bridges research and real-world.", tags: ["courses", "general", "practical"], tier: "must" },
      { name: "Sebastian Raschka", handle: "sebastianraschka", url: "https://www.linkedin.com/in/sebastianraschka/", why: "LLM research breakdowns, architecture comparisons, and training technique deep dives. Academic rigor + practical.", tags: ["llm", "research", "training"], tier: "high" },
      { name: "Harrison Chase", handle: "harrison-chase", url: "https://www.linkedin.com/in/harrison-chase-961287118/", why: "LangChain/LangGraph CEO. RAG and agent framework announcements, architecture decisions, and roadmap posts.", tags: ["rag", "agents", "langchain"], tier: "high" },
      { name: "Jerry Liu", handle: "jerrysliu", url: "https://www.linkedin.com/in/jerry-liu-64390071/", why: "LlamaIndex CEO. Advanced RAG architectures, indexing strategies, and retrieval optimization insights.", tags: ["rag", "llamaindex", "retrieval"], tier: "high" },
      { name: "Yann LeCun", handle: "yann-lecun", url: "https://www.linkedin.com/in/yann-lecun/", why: "Meta Chief AI Scientist. Open-source AI advocacy, fundamental research directions, architecture debates.", tags: ["research", "open-source"], tier: "high" },
      { name: "Cassie Kozyrkov", handle: "cassiekozyrkov", url: "https://www.linkedin.com/in/kozyrkov/", why: "Ex-Google Chief Decision Scientist. Decision intelligence, AI risk management, practical AI evaluation frameworks.", tags: ["decision-making", "evaluation"], tier: "good" },
      { name: "Allie K. Miller", handle: "alliekmiller", url: "https://www.linkedin.com/in/alliekmiller/", why: "AI advisor to Fortune 500s. Bridges technical engineering and executive strategy. Vendor vetting, ROI frameworks.", tags: ["strategy", "enterprise"], tier: "good" },
    ],
  },
  {
    id: "newsletters",
    label: "Newsletters",
    icon: "📬",
    accent: "#E8590C",
    desc: "Curated insights delivered to your inbox",
    channels: [
      { name: "Latent Space", handle: "latent.space", url: "https://www.latent.space/", why: "THE newsletter for AI engineers. Deep dives on agents, LLM tooling, infra, open-source. Companion podcast with builder interviews.", tags: ["agents", "rag", "infra"], tier: "must" },
      { name: "Ahead of AI", handle: "Sebastian Raschka", url: "https://magazine.sebastianraschka.com/", why: "Research-heavy LLM paper breakdowns. Architecture comparisons (DeepSeek-V3 to Kimi K2), training techniques. Rigorous.", tags: ["llm", "research", "papers"], tier: "must" },
      { name: "Interconnects", handle: "Nathan Lambert", url: "https://www.interconnects.ai/", why: "LLM-centric news. Detailed breakdowns of model releases, RLHF, and alignment research. Fast and thorough.", tags: ["llm", "rlhf", "models"], tier: "must" },
      { name: "The Batch", handle: "DeepLearning.AI", url: "https://www.deeplearning.ai/the-batch/", why: "Andrew Ng's weekly. 4 deep analyses of the week's most important developments + commentary. Great breadth.", tags: ["general", "weekly", "analysis"], tier: "must" },
      { name: "AlphaSignal", handle: "alphasignal.ai", url: "https://alphasignal.ai/", why: "Technical roundup of papers, GitHub repos, tool releases. Compact format, popular among OSS ML contributors.", tags: ["papers", "repos", "tools"], tier: "high" },
      { name: "ML Spring", handle: "Akshay Pachaar", url: "https://mlspring.beehiiv.com/", why: "Practical RAG, prompting, and finetuning analysis. From a senior data scientist applying these techniques daily.", tags: ["rag", "prompting", "practical"], tier: "high" },
      { name: "Import AI", handle: "Jack Clark", url: "https://importai.substack.com/", why: "Frontier AI research, policy, and safety from an Anthropic co-founder. Research-focused, high-signal.", tags: ["research", "frontier", "policy"], tier: "high" },
      { name: "TLDR AI", handle: "tldrai.tech", url: "https://tldr.tech/ai", why: "5-minute daily digest. Quick scan of new models, tools, papers. When you're short on time, this catches you up.", tags: ["daily", "quick", "news"], tier: "good" },
      { name: "The Rundown AI", handle: "therundownai", url: "https://www.therundown.ai/", why: "1.75M+ subscribers. Daily AI news with practical tool recommendations. Good for broad awareness.", tags: ["daily", "news", "tools"], tier: "good" },
    ],
  },
  {
    id: "discord",
    label: "Discord & Slack",
    icon: "💬",
    accent: "#5865F2",
    desc: "Real-time help, discussions, and breaking discoveries",
    channels: [
      { name: "Hugging Face Discord", handle: "discord.gg/hugging-face", url: "https://discord.com/invite/hugging-face", why: "Direct access to model authors and researchers. Channels for transformers, ASR, diffusion, agents. Get answers from people building the models.", tags: ["models", "research", "community"], tier: "must" },
      { name: "LangChain Discord", handle: "discord.gg/langchain", url: "https://discord.gg/langchain", why: "RAG pipelines, LangGraph agent patterns, vector DB questions. Maintainers are active. Great for debugging RAG issues.", tags: ["rag", "agents", "help"], tier: "must" },
      { name: "MLOps Community (Slack)", handle: "mlops.community", url: "https://mlops.community/", why: "8000+ practitioners. Dedicated channels for RAG, LLMOps, vector DBs, production ML. The most serious practitioner community.", tags: ["production", "rag", "mlops"], tier: "must" },
      { name: "AutoGen / AG2 Discord", handle: "discord.gg/sNGSwQME3x", url: "https://discord.gg/sNGSwQME3x", why: "Microsoft's multi-agent framework community. Weekly office hours with maintainers. Multi-agent architecture discussions.", tags: ["multi-agent", "framework"], tier: "high" },
      { name: "CrewAI Discord", handle: "crewai.com", url: "https://discord.gg/crewai", why: "Multi-agent orchestration community. Role-based agent patterns, crew workflows, and production deployment help.", tags: ["multi-agent", "agents"], tier: "high" },
      { name: "Deepgram Discord", handle: "deepgram.com", url: "https://discord.gg/deepgram", why: "STT/TTS engineering community. Voice agent builders, ASR optimization, latency debugging. Direct access to speech AI engineers.", tags: ["asr", "tts", "voice"], tier: "high" },
      { name: "r/LocalLLaMA (Reddit)", handle: "r/LocalLLaMA", url: "https://reddit.com/r/LocalLLaMA", why: "Fastest community for open-source LLM news. Model releases land here first. Quantization, RAG experiments, benchmarks.", tags: ["open-source", "models", "benchmarks"], tier: "must" },
      { name: "r/MachineLearning", handle: "r/MachineLearning", url: "https://reddit.com/r/MachineLearning", why: "Research-focused. Paper discussions, industry news, career threads. More academic than r/LocalLLaMA.", tags: ["research", "papers", "career"], tier: "high" },
    ],
  },
  {
    id: "research",
    label: "Research Feeds",
    icon: "📄",
    accent: "#6B46C1",
    desc: "Never miss a breakthrough paper",
    channels: [
      { name: "arXiv cs.CL (daily)", handle: "arxiv.org/list/cs.CL", url: "https://arxiv.org/list/cs.CL/recent", why: "THE source for RAG, LLM, NLP papers. Check daily. Filter by keywords: retrieval, augmented, agent, speech, voice.", tags: ["rag", "llm", "research"], tier: "must" },
      { name: "arXiv cs.SD (Sound)", handle: "arxiv.org/list/cs.SD", url: "https://arxiv.org/list/cs.SD/recent", why: "Speech and audio processing papers. ASR, TTS, voice synthesis, speaker diarization research.", tags: ["asr", "tts", "voice"], tier: "must" },
      { name: "Hugging Face Papers", handle: "huggingface.co/papers", url: "https://huggingface.co/papers", why: "Community-upvoted trending papers. See what practitioners actually care about. Daily updates with social signals.", tags: ["trending", "community", "papers"], tier: "must" },
      { name: "Papers With Code", handle: "paperswithcode.com", url: "https://paperswithcode.com/", why: "Papers linked with code implementations. SOTA benchmarks for RAG, ASR, NLU. Track progress quantitatively.", tags: ["code", "benchmarks", "sota"], tier: "must" },
      { name: "Semantic Scholar Alerts", handle: "semanticscholar.org", url: "https://www.semanticscholar.org/", why: "Set custom alerts for 'RAG', 'GraphRAG', 'voice agents', 'hybrid search', 'agentic RAG'. AI-powered paper discovery.", tags: ["alerts", "discovery", "custom"], tier: "must" },
      { name: "alphaXiv", handle: "alphaxiv.org", url: "https://alphaxiv.org/", why: "Social layer on arXiv. Community annotations, discussions, and ratings on research papers.", tags: ["papers", "community", "discussion"], tier: "high" },
      { name: "HF Open ASR Leaderboard", handle: "huggingface.co/spaces", url: "https://huggingface.co/spaces/hf-audio/open_asr_leaderboard", why: "Live STT/ASR model benchmarks. Track Canary Qwen, Whisper, Parakeet, Granite Speech rankings in real-time.", tags: ["asr", "stt", "benchmarks"], tier: "high" },
      { name: "Artificial Analysis", handle: "artificialanalysis.ai", url: "https://artificialanalysis.ai/", why: "Live leaderboards for LLM quality, speed, price. Plus TTS voice quality rankings. Data-driven model comparisons.", tags: ["benchmarks", "tts", "llm"], tier: "high" },
      { name: "LLM-Stats News", handle: "llm-stats.com", url: "https://llm-stats.com/ai-news", why: "Daily tracker of model releases, benchmark updates, and research across all major labs.", tags: ["models", "daily", "tracking"], tier: "good" },
    ],
  },
  {
    id: "podcasts",
    label: "Podcasts",
    icon: "🎧",
    accent: "#DD6B20",
    desc: "Deep conversations during your commute",
    channels: [
      { name: "Latent Space Podcast", handle: "latent.space/podcast", url: "https://www.latent.space/podcast", why: "By AI engineers, for AI engineers. Builder interviews, deep technical conversations on agents, RAG, infra.", tags: ["agents", "rag", "technical"], tier: "must" },
      { name: "Dwarkesh Podcast", handle: "@DwarkeshPatel", url: "https://www.dwarkeshpatel.com/podcast", why: "3-hour deep interviews with Karpathy, Sutton, Levine, etc. Where the field is actually going, from people building it.", tags: ["frontier", "interviews", "research"], tier: "must" },
      { name: "Practical AI", handle: "changelog.com", url: "https://changelog.com/practicalai", why: "Making AI practical, productive, and accessible. Focus on deploying and scaling AI in real systems.", tags: ["production", "practical", "deployment"], tier: "high" },
      { name: "The TWIML AI Podcast", handle: "twimlai.com", url: "https://twimlai.com/podcast/", why: "Interviews with ML researchers and practitioners. Covers RAG, agents, speech AI, and production challenges.", tags: ["research", "interviews", "broad"], tier: "high" },
      { name: "Gradient Dissent", handle: "wandb.ai", url: "https://wandb.ai/fully-connected/gradient-dissent", why: "W&B's podcast. ML practitioners discuss experiments, evals, and production ML. Good for MLOps perspective.", tags: ["mlops", "evals", "production"], tier: "good" },
    ],
  },
  {
    id: "github",
    label: "GitHub Repos",
    icon: "⚡",
    accent: "#38A169",
    desc: "Star + Watch → get notified on every release",
    channels: [
      { name: "awesome-ai-agents-2026", handle: "caramaschiHG", url: "https://github.com/caramaschiHG/awesome-ai-agents-2026", why: "300+ resources, 20+ categories. Updated monthly. THE curated index for agents, voice, RAG, vector DBs.", tags: ["agents", "rag", "voice", "curated"], tier: "must" },
      { name: "LangChain / LangGraph", handle: "langchain-ai", url: "https://github.com/langchain-ai/langgraph", why: "Watch releases. RAG pipelines, agent orchestration, graph-based workflows. Your primary framework likely.", tags: ["rag", "agents", "framework"], tier: "must" },
      { name: "LlamaIndex", handle: "run-llama", url: "https://github.com/run-llama/llama_index", why: "Advanced RAG architectures, indexing strategies, and retrieval optimization. Strong on structured data RAG.", tags: ["rag", "retrieval", "indexing"], tier: "must" },
      { name: "Microsoft AutoGen", handle: "microsoft", url: "https://github.com/microsoft/autogen", why: "Multi-agent conversation framework. Magentic-One for complex tasks. Very active development.", tags: ["multi-agent", "framework"], tier: "must" },
      { name: "CrewAI", handle: "crewAIInc", url: "https://github.com/crewAIInc/crewAI", why: "38k+ stars. Role-based multi-agent collaboration. Great for orchestrating specialist agent teams.", tags: ["multi-agent", "agents"], tier: "high" },
      { name: "Pipecat", handle: "pipecat-ai", url: "https://github.com/pipecat-ai/pipecat", why: "Vendor-agnostic voice agent framework by Daily.co. Used by NVIDIA, Cresta. OSS for real-time voice pipelines.", tags: ["voice", "agents", "real-time"], tier: "high" },
      { name: "NVIDIA NeMo", handle: "NVIDIA", url: "https://github.com/NVIDIA/NeMo", why: "Production ASR/TTS/NLP toolkit. Canary, Parakeet models. The speech AI infrastructure backbone.", tags: ["asr", "tts", "production"], tier: "high" },
      { name: "Whisper (OpenAI)", handle: "openai", url: "https://github.com/openai/whisper", why: "Gold standard multilingual ASR. Watch for v4 updates. Base model for many production STT systems.", tags: ["asr", "stt", "multilingual"], tier: "high" },
      { name: "500-AI-Agents-Projects", handle: "ashishpatel26", url: "https://github.com/ashishpatel26/500-AI-Agents-Projects", why: "Curated collection of agent projects across industries. Great for inspiration and learning patterns.", tags: ["agents", "projects", "learning"], tier: "good" },
    ],
  },
  {
    id: "labs",
    label: "AI Lab Blogs",
    icon: "🔬",
    accent: "#319795",
    desc: "Announcements come here first — before the news",
    channels: [
      { name: "Anthropic Research", handle: "anthropic.com", url: "https://www.anthropic.com/research", why: "Claude releases, safety research, interpretability breakthroughs. Primary source for Claude API capabilities.", tags: ["models", "safety", "api"], tier: "must" },
      { name: "OpenAI Blog", handle: "openai.com", url: "https://openai.com/blog", why: "GPT releases, Realtime API, voice models, reasoning research. Set up RSS or bookmark.", tags: ["models", "voice", "api"], tier: "must" },
      { name: "Google DeepMind Blog", handle: "deepmind.google", url: "https://deepmind.google/discover/blog/", why: "Gemini family, speech AI, long-context advances, multimodal breakthroughs.", tags: ["models", "multimodal", "speech"], tier: "must" },
      { name: "Meta AI Blog", handle: "ai.meta.com", url: "https://ai.meta.com/blog/", why: "Llama releases, open-source ASR/TTS (Seamless), RAG innovations. The open-source frontier.", tags: ["open-source", "models", "voice"], tier: "must" },
      { name: "Cohere Blog", handle: "cohere.com", url: "https://cohere.com/blog", why: "Enterprise RAG, embeddings, reranking models. Strong focus on retrieval quality and production patterns.", tags: ["rag", "embeddings", "enterprise"], tier: "high" },
      { name: "Allen AI (Ai2)", handle: "allenai.org", url: "https://allenai.org/newsletters", why: "OLMo open models, SERA coding agents. Fully open research. Monthly newsletter.", tags: ["open-source", "agents", "research"], tier: "high" },
      { name: "Mistral Blog", handle: "mistral.ai", url: "https://mistral.ai/news/", why: "Open-weight model releases, embedding models, and European AI innovation.", tags: ["models", "open-source", "embeddings"], tier: "good" },
    ],
  },
];

const allTags = ["rag", "agents", "voice", "llm", "asr", "tts", "research", "multi-agent", "production", "latency", "papers", "benchmarks", "open-source"];
const tierConfig = { must: { label: "MUST FOLLOW", color: "#E8590C" }, high: { label: "HIGH VALUE", color: "#D69E2E" }, good: { label: "SOLID", color: "#718096" } };

export default function EverGreenHub() {
  const [activePlatform, setActivePlatform] = useState("youtube");
  const [search, setSearch] = useState("");
  const [activeTags, setActiveTags] = useState([]);
  const [tierFilter, setTierFilter] = useState(null);

  const toggleTag = (t) => setActiveTags(p => p.includes(t) ? p.filter(x => x !== t) : [...p, t]);
  const platform = platforms.find(p => p.id === activePlatform);

  const filtered = platform?.channels.filter(ch => {
    const s = !search || ch.name.toLowerCase().includes(search.toLowerCase()) || ch.why.toLowerCase().includes(search.toLowerCase());
    const t = activeTags.length === 0 || activeTags.some(tag => ch.tags.includes(tag));
    const tf = !tierFilter || ch.tier === tierFilter;
    return s && t && tf;
  });

  return (
    <div style={{ minHeight: "100vh", background: "#08080D", color: "#D0D0DC", fontFamily: "'SF Mono', 'JetBrains Mono', 'Fira Code', monospace" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&family=JetBrains+Mono:wght@300;400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        
        .hdr { padding: 28px 20px 16px; background: linear-gradient(180deg, #101018 0%, #08080D 100%); border-bottom: 1px solid #1a1a28; position: sticky; top: 0; z-index: 100; }
        .hdr-title { font-family: 'Space Grotesk', sans-serif; font-size: 20px; font-weight: 800; color: #F0F0F5; letter-spacing: -0.5px; }
        .hdr-title span { color: #E8590C; }
        .hdr-sub { font-size: 11px; color: #555568; margin-top: 3px; letter-spacing: 0.3px; font-weight: 300; }
        .hdr-badge { display: inline-block; background: #E8590C22; color: #E8590C; font-size: 9px; padding: 2px 7px; border-radius: 8px; margin-left: 8px; font-weight: 500; letter-spacing: 0.5px; text-transform: uppercase; }
        
        .srch { margin-top: 14px; width: 100%; padding: 9px 13px; background: #111119; border: 1px solid #222233; border-radius: 7px; color: #D0D0DC; font-family: inherit; font-size: 12px; outline: none; }
        .srch:focus { border-color: #444466; }
        .srch::placeholder { color: #3a3a4a; }
        
        .tags { display: flex; flex-wrap: wrap; gap: 5px; margin-top: 10px; }
        .tag { padding: 3px 9px; border-radius: 10px; font-size: 10px; cursor: pointer; border: 1px solid #222233; background: #111119; color: #666680; text-transform: uppercase; letter-spacing: 0.4px; transition: all 0.12s; font-weight: 500; font-family: inherit; }
        .tag:hover { border-color: #444466; color: #9999aa; }
        .tag.on { background: #E8590C; border-color: #E8590C; color: #fff; }
        
        .tier-row { display: flex; gap: 6px; margin-top: 8px; }
        .tier-btn { padding: 3px 10px; border-radius: 10px; font-size: 9px; cursor: pointer; border: 1px solid #222233; background: transparent; letter-spacing: 0.5px; font-weight: 600; font-family: inherit; transition: all 0.12s; }
        .tier-btn:hover { opacity: 0.8; }
        
        .plat-tabs { display: flex; overflow-x: auto; gap: 1px; padding: 0; background: #0c0c14; border-bottom: 1px solid #181828; scrollbar-width: none; }
        .plat-tabs::-webkit-scrollbar { display: none; }
        .ptab { display: flex; flex-direction: column; align-items: center; gap: 2px; padding: 10px 14px; font-size: 10px; cursor: pointer; border: none; background: transparent; color: #555568; font-family: inherit; transition: all 0.12s; white-space: nowrap; font-weight: 500; min-width: 0; }
        .ptab:hover { background: #111119; color: #8888a0; }
        .ptab.on { background: #14141e; color: #F0F0F5; }
        .ptab .pi { font-size: 16px; line-height: 1; }
        
        .plat-hdr { padding: 16px 20px 8px; display: flex; align-items: center; gap: 8px; }
        .plat-dot { width: 7px; height: 7px; border-radius: 50%; }
        .plat-lbl { font-family: 'Space Grotesk', sans-serif; font-size: 12px; font-weight: 600; color: #8888a0; text-transform: uppercase; letter-spacing: 0.8px; }
        .plat-desc { font-size: 10px; color: #444455; margin-left: auto; }
        .plat-ct { font-size: 10px; color: #3a3a4a; margin-left: 6px; }
        
        .cards { padding: 8px 20px 20px; display: flex; flex-direction: column; gap: 8px; }
        .card { background: #0f0f17; border: 1px solid #1a1a28; border-radius: 9px; padding: 14px 16px; transition: all 0.15s; cursor: pointer; text-decoration: none; display: block; color: inherit; }
        .card:hover { border-color: #333344; background: #131320; transform: translateY(-1px); }
        
        .card-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px; }
        .card-name { font-family: 'Space Grotesk', sans-serif; font-size: 14px; font-weight: 600; color: #F0F0F5; }
        .card-tier { font-size: 8px; padding: 2px 7px; border-radius: 8px; font-weight: 700; letter-spacing: 0.5px; flex-shrink: 0; }
        .card-handle { font-size: 11px; color: #444458; margin-bottom: 6px; }
        .card-why { font-size: 11.5px; line-height: 1.55; color: #7a7a90; font-weight: 300; }
        .card-tags { display: flex; flex-wrap: wrap; gap: 3px; margin-top: 8px; }
        .card-tag { font-size: 9px; padding: 1px 6px; border-radius: 3px; background: #151520; color: #555568; text-transform: uppercase; letter-spacing: 0.3px; }
        .card-tag.hl { background: #E8590C22; color: #E8590C; }
        
        .empty { text-align: center; padding: 40px 20px; color: #3a3a4a; font-size: 12px; }
        .ftr { padding: 20px; text-align: center; font-size: 10px; color: #2a2a38; border-top: 1px solid #141420; margin-top: 16px; line-height: 1.7; }
        .ftr b { color: #555568; font-weight: 500; }
      `}</style>

      <div className="hdr">
        <div className="hdr-title">
          <span>▸</span> AI Engineer — Evergreen Source Feed
          <span className="hdr-badge">Follow Once → Never Outdated</span>
        </div>
        <div className="hdr-sub">RAG · GraphRAG · Agents · Voice AI · ASR/TTS/STT · LLMs · Hybrid Search · Latency Optimization</div>
        <input className="srch" placeholder="Search channels, people, topics..." value={search} onChange={e => setSearch(e.target.value)} />
        <div className="tags">
          {allTags.map(t => (
            <button key={t} className={`tag ${activeTags.includes(t) ? "on" : ""}`} onClick={() => toggleTag(t)}>{t}</button>
          ))}
          {activeTags.length > 0 && <button className="tag" style={{ color: "#E8590C", borderColor: "#E8590C33" }} onClick={() => setActiveTags([])}>✕ clear</button>}
        </div>
        <div className="tier-row">
          {Object.entries(tierConfig).map(([k, v]) => (
            <button key={k} className="tier-btn" style={{ color: v.color, borderColor: tierFilter === k ? v.color : "#222233", background: tierFilter === k ? v.color + "18" : "transparent" }} onClick={() => setTierFilter(tierFilter === k ? null : k)}>{v.label}</button>
          ))}
        </div>
      </div>

      <div className="plat-tabs">
        {platforms.map(p => (
          <button key={p.id} className={`ptab ${activePlatform === p.id ? "on" : ""}`} onClick={() => setActivePlatform(p.id)}>
            <span className="pi">{p.icon}</span>
            <span>{p.label}</span>
          </button>
        ))}
      </div>

      <div className="plat-hdr">
        <div className="plat-dot" style={{ background: platform?.accent }} />
        <span className="plat-lbl">{platform?.label}</span>
        <span className="plat-ct">{filtered?.length} channels</span>
        <span className="plat-desc">{platform?.desc}</span>
      </div>

      <div className="cards">
        {filtered?.length > 0 ? filtered.map((ch, i) => (
          <a key={i} className="card" href={ch.url} target="_blank" rel="noopener noreferrer">
            <div className="card-top">
              <div className="card-name">{ch.name}</div>
              <div className="card-tier" style={{ background: tierConfig[ch.tier].color + "18", color: tierConfig[ch.tier].color }}>{tierConfig[ch.tier].label}</div>
            </div>
            <div className="card-handle">{ch.handle}</div>
            <div className="card-why">{ch.why}</div>
            <div className="card-tags">
              {ch.tags.map(t => (
                <span key={t} className={`card-tag ${activeTags.includes(t) ? "hl" : ""}`}>{t}</span>
              ))}
            </div>
          </a>
        )) : <div className="empty">No channels match your filters.</div>}
      </div>

      <div className="ftr">
        <b>HOW TO USE THIS:</b> Subscribe/follow every "MUST FOLLOW" channel across 3-4 platforms of your choice.
        <br />Add "HIGH VALUE" ones for your specific focus areas (RAG latency? Voice agents? Multi-agent?).
        <br />These are <b>living channels</b> — they publish new content continuously. You'll never go stale.
        <br /><br />
        <b>DAILY ROUTINE:</b> X feed (5 min) → arXiv/HF Papers (5 min) → Newsletter inbox (10 min) → Discord when stuck
        <br />
        <b>WEEKLY:</b> 1 podcast episode + 1 YouTube deep dive + scan GitHub trending
        <br /><br />
        All links open in new tabs · Filter by domain tags + tier above
      </div>
    </div>
  );
}
