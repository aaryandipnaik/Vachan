// Sample news data based on the provided inputs
const newsArticles = [
  {
    title: '"Modi-Trump Secret Pact" Trends After Diplomatic Cable Leak',
    content:
      "A forged document alleging a US-India defense pact favoring Trump's reelection campaign trended with 48K+ tweets. Analysts noted similarities to 2018 nationalist fake news patterns. #ShadowDeal trended for 14 hours before PIB debunked it.",
    source: "Twitter",
    sourceUrl: "https://twitter.com/search?q=%23ShadowDeal",
    hashtags: ["ShadowDeal", "ModiTrump", "FakeNews"],
    publishedAt: "2025-03-07T14:30:00Z",
    author: "Fact Check Team",
    engagementStats: {
      tweets: 48000,
      botPercentage: 65,
    },
    factCheck: {
      status: "false",
      details:
        "The alleged diplomatic cable was determined to be a forgery. The document contained several inconsistencies in formatting and language that are not consistent with official diplomatic communications. The Press Information Bureau (PIB) officially debunked this claim within 14 hours of it trending.",
      sources: [
        "Press Information Bureau official statement (March 7, 2025)",
        "Ministry of External Affairs clarification (March 7, 2025)",
        "US State Department denial (March 8, 2025)",
      ],
    },
  },
  {
    title: "AI-Generated Video Claims Mamata Banerjee Resigning Over Farm Protests",
    content:
      "A deepfake of West Bengal's CM announcing resignation garnered 3.2M views, reviving concerns about AI misuse in elections. #FakeMamata trended with 27K tweets, 65% from bot-like accounts.",
    source: "Facebook, Twitter",
    sourceUrl: "https://twitter.com/search?q=%23FakeMamata",
    hashtags: ["FakeMamata", "Deepfake", "WestBengal"],
    publishedAt: "2025-03-05T10:15:00Z",
    author: "Digital Forensics Team",
    engagementStats: {
      tweets: 27000,
      botPercentage: 65,
    },
    factCheck: {
      status: "false",
      details:
        "The video was confirmed to be a deepfake by digital forensics experts. Analysis of the video revealed inconsistencies in lip synchronization and voice patterns. The Chief Minister's office issued an official statement denying the resignation and confirming the video was fabricated.",
      sources: [
        "West Bengal CM's Office statement (March 5, 2025)",
        "Digital Forensics Lab analysis report (March 6, 2025)",
        "Election Commission of India advisory on deepfakes (March 7, 2025)",
      ],
    },
  },
  {
    title: 'Viral Rumor: "COVID-24 Variant Detected in Mumbai Sewage"',
    content:
      'Unverified claims about a new "deadlier variant" spread via WhatsApp, causing panic buying. Health Ministry confirmed samples were influenza-B. #Covid24 trended with 19K tweets, driven by anti-vax networks.',
    source: "WhatsApp, Twitter",
    sourceUrl: "https://twitter.com/search?q=%23Covid24",
    hashtags: ["Covid24", "Mumbai", "HealthAlert"],
    publishedAt: "2025-03-04T16:45:00Z",
    author: "Health Correspondent",
    engagementStats: {
      tweets: 19000,
    },
    factCheck: {
      status: "false",
      details:
        'The Health Ministry has confirmed that the samples detected in Mumbai sewage were identified as influenza-B, not a new COVID variant. The term "COVID-24" is not recognized by the WHO or any health authority. The rumor appears to have originated from anti-vaccination networks and spread primarily through encrypted messaging apps.',
      sources: [
        "Ministry of Health and Family Welfare press release (March 4, 2025)",
        "BMC Health Department statement (March 4, 2025)",
        "WHO India clarification (March 5, 2025)",
      ],
    },
  },
  {
    title: "BJP IT Cell Accused of Hijacking #SaveFarmer Hashtag",
    content:
      "Opposition leaders alleged BJP accounts flooded the trend with pro-government memes, distorting farmer suicide reports. 72% of top tweets used nationalist imagery.",
    source: "Twitter",
    sourceUrl: "https://twitter.com/search?q=%23SaveFarmer",
    hashtags: ["SaveFarmer", "TwitterPolitics", "Hashtag"],
    publishedAt: "2025-03-03T09:20:00Z",
    author: "Political Analyst",
    engagementStats: {
      tweets: 35000,
    },
    factCheck: {
      status: "misleading",
      details:
        "Analysis of the #SaveFarmer hashtag shows coordinated activity from multiple political parties, not just BJP-affiliated accounts. While there was an increase in nationalist imagery in the trending tweets, the claim that 72% of top tweets used such imagery could not be independently verified. Both pro-government and opposition accounts contributed to changing the narrative of the hashtag.",
      sources: [
        "Independent social media analysis by MediaWatch (March 3, 2025)",
        "Twitter Transparency Report excerpt (Q1 2025)",
        "Digital Rights Foundation report on hashtag manipulation (March 2025)",
      ],
    },
  },
  {
    title: '"Hindu Temples Targeted" Hoax Sparks Violence in Rajasthan',
    content:
      "Fake images of vandalized temples circulated ahead of Ayodhya pilgrimage season, leading to stone-pelting. Police confirmed photos were from 2022 Pakistan incidents.",
    source: "WhatsApp, Facebook",
    sourceUrl: "https://facebook.com/search/posts?q=temple%20attack%20rajasthan",
    hashtags: ["TempleAttack", "Rajasthan", "FakeImages"],
    publishedAt: "2025-03-02T12:10:00Z",
    author: "Regional Correspondent",
    engagementStats: {
      tweets: 22000,
    },
    factCheck: {
      status: "false",
      details:
        "The images circulated on social media purporting to show recently vandalized Hindu temples in Rajasthan were confirmed by police to be from incidents in Pakistan from 2022. Reverse image searches confirm the origin of these photos. No recent temple vandalization incidents have been reported in the regions claimed in the viral messages.",
      sources: [
        "Rajasthan Police official statement (March 2, 2025)",
        "Forensic analysis of viral images by Alt News (March 3, 2025)",
        "Ministry of Home Affairs clarification (March 3, 2025)",
      ],
    },
  },
  {
    title: "Deepfake Audio Purports Kejriwal Admitting Election Fraud",
    content:
      "An AI-generated clip of Delhi's CM went viral among BJP supporters. Metadata showed origin in a Romanian server farm. #KejriwalExposed trended with 33K tweets.",
    source: "Twitter, WhatsApp",
    sourceUrl: "https://twitter.com/search?q=%23KejriwalExposed",
    hashtags: ["KejriwalExposed", "DeepfakeAudio", "ElectionFraud"],
    publishedAt: "2025-03-01T15:30:00Z",
    author: "Tech Investigation Team",
    engagementStats: {
      tweets: 33000,
      botPercentage: 45,
    },
    factCheck: {
      status: "false",
      details:
        "Audio forensics experts have confirmed the clip is AI-generated. The voice patterns show inconsistencies typical of synthetic audio. Technical analysis of the file metadata revealed it was created using AI voice cloning software and originated from servers in Romania, not from any verified source connected to the Delhi CM.",
      sources: [
        "Delhi CM Office statement (March 1, 2025)",
        "C-DAC Audio Forensics Lab report (March 2, 2025)",
        "Cyber Security Agency technical analysis (March 3, 2025)",
      ],
    },
  },
  {
    title: '"Free Laptops for BJP Voters" Rumor Stokes Election Law Complaints',
    content:
      "EC received 850+ complaints about WhatsApp messages offering devices for voter ID photos. Similar to 2021 misinformation tactics.",
    source: "WhatsApp",
    hashtags: ["ElectionBribe", "VoterID", "ElectionCommission"],
    publishedAt: "2025-02-28T11:45:00Z",
    author: "Election Watch",
    engagementStats: {
      tweets: 15000,
    },
    factCheck: {
      status: "false",
      details:
        "The Election Commission has confirmed that no political party is authorized to offer incentives in exchange for votes, which would constitute a violation of election laws. The WhatsApp messages promising free laptops in exchange for voter ID photos appear to be an attempt to either collect personal data or mislead voters. Similar tactics were observed during the 2021 state elections.",
      sources: [
        "Election Commission of India press release (February 28, 2025)",
        "BJP official denial statement (March 1, 2025)",
        "Cyber Crime Division advisory on election scams (March 2, 2025)",
      ],
    },
  },
  {
    title: 'Viral Claim: "ISRO Satellite Spying on Hindu Homes"',
    content:
      "Conspiracy theories about GSAT-24's \"anti-religious sensors\" trended in Karnataka. ISRO's clarification tweet gained only 12% engagement of original rumor.",
    source: "Facebook, WhatsApp",
    sourceUrl: "https://twitter.com/isro/status/official-statement",
    hashtags: ["ISRO", "Satellite", "Conspiracy"],
    publishedAt: "2025-02-25T14:20:00Z",
    author: "Science Correspondent",
    engagementStats: {
      tweets: 18000,
    },
    factCheck: {
      status: "false",
      details:
        'ISRO has categorically denied that GSAT-24 or any other Indian satellite has capabilities to target specific religious groups or homes. The satellite is a communication satellite designed for broadcasting and telecommunications purposes. The concept of "anti-religious sensors" has no scientific basis and appears to be fabricated to create communal tension.',
      sources: [
        "ISRO official clarification (February 25, 2025)",
        "Department of Space press statement (February 26, 2025)",
        "Science and Technology Ministry fact-check (February 27, 2025)",
      ],
    },
  },
  {
    title: '"Halal Certification Ban" Misinformation Impacts Food Startups',
    content:
      "Fake MHA circulars caused 20% stock drops for Zomato/Blinkit. Home Ministry confirmed no policy changes. #BoycottHalal trended with 41K tweets.",
    source: "Twitter, WhatsApp",
    sourceUrl: "https://twitter.com/search?q=%23BoycottHalal",
    hashtags: ["BoycottHalal", "FoodTech", "StockMarket"],
    publishedAt: "2025-02-22T08:30:00Z",
    author: "Business Analyst",
    engagementStats: {
      tweets: 41000,
    },
    factCheck: {
      status: "false",
      details:
        "The Ministry of Home Affairs has confirmed that no circular banning Halal certification has been issued. The documents circulating on social media were found to contain formatting inconsistencies and incorrect file reference numbers that are not consistent with official MHA communications. The false information caused significant market volatility for food delivery companies.",
      sources: [
        "Ministry of Home Affairs official clarification (February 22, 2025)",
        "SEBI statement on market manipulation (February 23, 2025)",
        "Zomato and Blinkit investor relations statement (February 24, 2025)",
      ],
    },
  },
  {
    title: 'Fake AIIMS Bulletin Claims "Vaccine-Induced Heart Attacks"',
    content:
      "Altered letterhead documents alleging 58% cardiac risk post-vaccination spread via encrypted apps. AIIMS cited 2024 study showing 0.3% incidence.",
    source: "WhatsApp, Telegram",
    hashtags: ["Vaccine", "AIIMS", "MedicalMisinformation"],
    publishedAt: "2025-02-20T17:15:00Z",
    author: "Health Reporter",
    engagementStats: {
      tweets: 25000,
    },
    factCheck: {
      status: "false",
      details:
        "AIIMS has confirmed that they did not issue any bulletin claiming a 58% cardiac risk from vaccines. The document circulating on social media uses an altered letterhead and contains medical claims that contradict peer-reviewed research. A 2024 comprehensive study cited by AIIMS found only a 0.3% incidence of minor cardiac issues following vaccination, with no statistically significant increase in heart attacks.",
      sources: [
        "AIIMS official statement (February 20, 2025)",
        "Indian Council of Medical Research fact-check (February 21, 2025)",
        "Journal of Medical Sciences study on vaccine safety (January 2024)",
      ],
    },
  },
  // Adding verified articles for the Verified tab
  {
    title: "Supreme Court Upholds Right to Privacy as Fundamental Right",
    content:
      "In a landmark judgment, the Supreme Court of India has unanimously upheld that the right to privacy is a fundamental right protected under the Indian Constitution. The nine-judge bench ruled that privacy is intrinsic to life, liberty, freedom, and dignity, and therefore, is an integral part of Article 21 of the Constitution.",
    source: "Supreme Court of India",
    sourceUrl: "https://supremecourt.gov.in/privacy-judgment",
    hashtags: ["SupremeCourt", "RightToPrivacy", "Constitution"],
    publishedAt: "2025-03-01T09:30:00Z",
    author: "Legal Correspondent",
    engagementStats: {
      tweets: 56000,
    },
    factCheck: {
      status: "true",
      details:
        "The Supreme Court of India has indeed delivered this judgment upholding the right to privacy as a fundamental right. The judgment was verified through official court records and statements from legal experts. This represents a significant constitutional development in Indian jurisprudence.",
      sources: [
        "Supreme Court of India official judgment (March 1, 2025)",
        "Bar Council of India statement (March 2, 2025)",
        "Constitutional experts' analysis published in legal journals",
      ],
    },
  },
  {
    title: "India's GDP Growth Rate Reaches 7.8% in Q1 2025",
    content:
      "The Ministry of Statistics and Programme Implementation has released the latest GDP figures showing India's economy grew at 7.8% in the first quarter of 2025, exceeding analyst expectations of 7.2%. The growth was primarily driven by manufacturing, services, and agricultural sectors.",
    source: "Ministry of Statistics",
    sourceUrl: "https://mospi.gov.in/gdp-q1-2025",
    hashtags: ["IndianEconomy", "GDP", "EconomicGrowth"],
    publishedAt: "2025-02-28T11:00:00Z",
    author: "Economic Affairs Correspondent",
    engagementStats: {
      tweets: 32000,
    },
    factCheck: {
      status: "true",
      details:
        "The GDP growth figures have been accurately reported and match the official data released by the Ministry of Statistics and Programme Implementation. Independent economists and financial institutions have corroborated these figures through their own analyses of economic indicators.",
      sources: [
        "Ministry of Statistics and Programme Implementation official release (February 28, 2025)",
        "Reserve Bank of India economic review (March 1, 2025)",
        "World Bank India economic update (March 3, 2025)",
      ],
    },
  },
  {
    title: "ISRO Successfully Launches Chandrayaan-4 Mission to Moon's South Pole",
    content:
      "The Indian Space Research Organisation (ISRO) has successfully launched the Chandrayaan-4 mission from the Satish Dhawan Space Centre. The mission aims to land a rover on the Moon's south pole to conduct experiments on lunar soil and search for water ice in permanently shadowed regions.",
    source: "ISRO",
    sourceUrl: "https://isro.gov.in/chandrayaan-4-launch",
    hashtags: ["ISRO", "Chandrayaan4", "SpaceMission"],
    publishedAt: "2025-02-15T07:45:00Z",
    author: "Science and Technology Reporter",
    engagementStats: {
      tweets: 89000,
    },
    factCheck: {
      status: "true",
      details:
        "ISRO has successfully launched the Chandrayaan-4 mission as reported. The launch was broadcast live and confirmed by multiple space agencies worldwide. The mission parameters and objectives have been accurately described in the news report.",
      sources: [
        "ISRO official press release (February 15, 2025)",
        "NASA congratulatory statement (February 15, 2025)",
        "Live broadcast footage and technical mission parameters",
      ],
    },
  },
  {
    title: "Parliament Passes Universal Healthcare Act with Bipartisan Support",
    content:
      "In a rare show of bipartisan cooperation, the Indian Parliament has passed the Universal Healthcare Act, which aims to provide free basic healthcare to all citizens. The legislation includes provisions for free essential medicines, diagnostic services, and emergency care at all public hospitals.",
    source: "Lok Sabha Secretariat",
    sourceUrl: "https://loksabha.nic.in/legislation/universal-healthcare-act",
    hashtags: ["Healthcare", "Parliament", "UniversalHealthcare"],
    publishedAt: "2025-02-10T16:20:00Z",
    author: "Parliamentary Affairs Correspondent",
    engagementStats: {
      tweets: 67000,
    },
    factCheck: {
      status: "true",
      details:
        "The Universal Healthcare Act has been passed by both houses of Parliament as reported. The details of the legislation have been accurately described, and the bipartisan support has been confirmed through voting records and statements from leaders across political parties.",
      sources: [
        "Lok Sabha and Rajya Sabha proceedings (February 10, 2025)",
        "Ministry of Health and Family Welfare statement (February 11, 2025)",
        "Joint statement by ruling and opposition party leaders",
      ],
    },
  },
  {
    title: "Indian Scientists Discover New Antibiotic Effective Against Superbugs",
    content:
      "A team of scientists from the Indian Institute of Science (IISc) has discovered a new antibiotic compound that shows remarkable effectiveness against drug-resistant bacteria, including MRSA and other superbugs. The discovery, published in Nature Medicine, could lead to new treatments for infections that are currently difficult to treat.",
    source: "Indian Institute of Science",
    sourceUrl: "https://iisc.ac.in/research/antibiotic-discovery",
    hashtags: ["Science", "MedicalBreakthrough", "Antibiotics"],
    publishedAt: "2025-01-25T13:10:00Z",
    author: "Science Health Reporter",
    engagementStats: {
      tweets: 45000,
    },
    factCheck: {
      status: "true",
      details:
        "The discovery of the new antibiotic compound by IISc scientists has been confirmed through peer-reviewed research published in Nature Medicine. Independent scientists have verified the methodology and results of the study, confirming the potential effectiveness against antibiotic-resistant bacteria.",
      sources: [
        "Nature Medicine published research paper (January 2025)",
        "World Health Organization statement on the discovery (January 27, 2025)",
        "Indian Council of Medical Research validation study (February 2, 2025)",
      ],
    },
  },
]

// Function to get random articles from the dataset
export function getRandomArticles(count: number) {
  const shuffled = [...newsArticles].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}

// Function to get a specific article by title
export function getArticleByTitle(title: string) {
  return newsArticles.find((article) => article.title === title)
}

// Function to get articles by fact check status
export function getArticlesByFactCheckStatus(status: string) {
  return newsArticles.filter((article) => article.factCheck.status === status)
}

// Function to get articles by source
export function getArticlesBySource(source: string) {
  return newsArticles.filter((article) => article.source.includes(source))
}

// Function to get articles by hashtag
export function getArticlesByHashtag(hashtag: string) {
  return newsArticles.filter((article) => article.hashtags.some((tag) => tag.toLowerCase() === hashtag.toLowerCase()))
}

// Function to fetch news from News API (World News)
export async function fetchNewsFromAPI() {
  try {
    // In a real app, you would use an API key and proper error handling
    // For this demo, we'll create mock data that resembles News API response
    const mockApiResponse = [
      {
        title: "Global Climate Summit Reaches Historic Agreement on Emissions",
        content:
          "World leaders have reached a landmark agreement at the Global Climate Summit to reduce carbon emissions by 50% by 2030. The agreement, which was signed by 195 countries, includes binding targets and financial commitments to support developing nations in their transition to clean energy.",
        source: "Reuters",
        sourceUrl: "https://reuters.com/climate-summit-agreement",
        url: "https://reuters.com/climate-summit-agreement",
        urlToImage: "https://placeholder.svg?height=400&width=600",
        publishedAt: "2025-03-08T10:30:00Z",
        author: "Jane Smith",
      },
      {
        title: "New AI Model Can Predict Extreme Weather Events Weeks in Advance",
        content:
          "Scientists at MIT have developed a new artificial intelligence model that can predict extreme weather events, such as hurricanes and floods, up to three weeks in advance. The model, which uses deep learning algorithms and satellite data, has shown a 85% accuracy rate in initial tests.",
        source: "Science Daily",
        sourceUrl: "https://sciencedaily.com/ai-weather-prediction",
        url: "https://sciencedaily.com/ai-weather-prediction",
        urlToImage: "https://placeholder.svg?height=400&width=600",
        publishedAt: "2025-03-07T14:15:00Z",
        author: "Dr. Robert Chen",
      },
      {
        title: "Global Tech Companies Announce Joint Initiative to Combat Misinformation",
        content:
          "Leading technology companies including Google, Meta, and Microsoft have announced a joint initiative to combat misinformation online. The coalition will develop shared standards for identifying and labeling misleading content, invest in fact-checking organizations, and improve transparency in content moderation practices.",
        source: "Tech Crunch",
        sourceUrl: "https://techcrunch.com/tech-misinformation-initiative",
        url: "https://techcrunch.com/tech-misinformation-initiative",
        urlToImage: "https://placeholder.svg?height=400&width=600",
        publishedAt: "2025-03-06T09:45:00Z",
        author: "Michael Johnson",
      },
      {
        title: "Breakthrough in Quantum Computing Achieves 'Quantum Advantage'",
        content:
          "Researchers at IBM have achieved what they call 'quantum advantage' with a new 1,000-qubit quantum computer that solved a complex problem in minutes that would take classical supercomputers thousands of years. This milestone represents a significant step forward in quantum computing technology and its potential applications in fields such as cryptography, materials science, and drug discovery.",
        source: "Nature",
        sourceUrl: "https://nature.com/quantum-computing-breakthrough",
        url: "https://nature.com/quantum-computing-breakthrough",
        urlToImage: "https://placeholder.svg?height=400&width=600",
        publishedAt: "2025-03-05T16:20:00Z",
        author: "Dr. Sarah Williams",
      },
      {
        title: "Study Finds Significant Decline in Global Biodiversity Over Past Decade",
        content:
          "A comprehensive study published in the journal Science has found that global biodiversity has declined by 28% over the past decade, with particularly severe losses in tropical regions. The research, which analyzed data from over 20,000 species, attributes the decline primarily to habitat destruction, climate change, and pollution.",
        source: "Science Magazine",
        sourceUrl: "https://sciencemag.org/biodiversity-decline-study",
        url: "https://sciencemag.org/biodiversity-decline-study",
        urlToImage: "https://placeholder.svg?height=400&width=600",
        publishedAt: "2025-03-04T11:10:00Z",
        author: "Dr. Emily Rodriguez",
      },
    ]

    return mockApiResponse
  } catch (error) {
    console.error("Error fetching news from API:", error)
    return []
  }
}

// Function to fetch Indian news from News API
export async function fetchIndianNewsFromAPI() {
  try {
    // In a real implementation, we would use the API key to fetch real data
    // const response = await fetch(`https://newsapi.org/v2/top-headlines?country=in&apiKey=5d1f2dfa7c574aab81580d0c72892a8e`)
    // const data = await response.json()
    // return data.articles

    // For now, we'll create mock data that resembles Indian news
    const mockIndianNews = [
      {
        title: "India's Renewable Energy Capacity Crosses 150 GW Milestone",
        content:
          "India has achieved a significant milestone in its clean energy journey by crossing 150 GW of renewable energy capacity. The Ministry of New and Renewable Energy announced that solar power contributes the largest share at 70 GW, followed by wind power at 45 GW, with the remainder coming from hydro, biomass, and other sources.",
        source: "The Economic Times",
        sourceUrl: "https://economictimes.com/renewable-energy-milestone",
        url: "https://economictimes.com/renewable-energy-milestone",
        urlToImage: "https://placeholder.svg?height=400&width=600",
        publishedAt: "2025-03-08T09:15:00Z",
        author: "Rahul Sharma",
      },
      {
        title: "Indian Startups Raise Record $5 Billion in Q1 2025",
        content:
          "Indian startups have raised a record $5 billion in funding during the first quarter of 2025, according to a report by Venture Intelligence. The fintech sector led the funding rounds, followed by e-commerce and health tech. The report highlights that 15 new unicorns emerged during this period, bringing India's total unicorn count to 150.",
        source: "Mint",
        sourceUrl: "https://livemint.com/startup-funding-q1-2025",
        url: "https://livemint.com/startup-funding-q1-2025",
        urlToImage: "https://placeholder.svg?height=400&width=600",
        publishedAt: "2025-03-07T11:30:00Z",
        author: "Priya Mehta",
      },
      {
        title: "New Delhi Hosts International AI Ethics Summit",
        content:
          "New Delhi is hosting the International AI Ethics Summit, bringing together policymakers, tech leaders, and academics from over 40 countries. The three-day conference focuses on developing global standards for responsible AI development and deployment, with special emphasis on privacy protection, algorithmic bias, and the impact of AI on employment.",
        source: "The Hindu",
        sourceUrl: "https://thehindu.com/ai-ethics-summit-delhi",
        url: "https://thehindu.com/ai-ethics-summit-delhi",
        urlToImage: "https://placeholder.svg?height=400&width=600",
        publishedAt: "2025-03-06T14:45:00Z",
        author: "Vikram Singh",
      },
      {
        title: "Indian Railways Launches 50 New Vande Bharat Express Trains",
        content:
          "The Indian Railways has launched 50 new Vande Bharat Express trains, connecting major cities across the country. These semi-high-speed trains feature advanced safety systems, energy-efficient technology, and improved passenger amenities. The expansion is part of the government's plan to modernize the railway network and reduce travel time between major urban centers.",
        source: "Indian Express",
        sourceUrl: "https://indianexpress.com/vande-bharat-expansion",
        url: "https://indianexpress.com/vande-bharat-expansion",
        urlToImage: "https://placeholder.svg?height=400&width=600",
        publishedAt: "2025-03-05T10:20:00Z",
        author: "Anjali Desai",
      },
      {
        title: "Supreme Court Issues Guidelines on Digital Privacy Rights",
        content:
          "The Supreme Court of India has issued comprehensive guidelines on digital privacy rights, directing both government agencies and private companies to strengthen data protection measures. The guidelines mandate explicit user consent for data collection, transparency in data usage, and strict penalties for data breaches. The court emphasized that privacy in the digital age is a fundamental right that requires robust protection.",
        source: "Times of India",
        sourceUrl: "https://timesofindia.com/supreme-court-privacy-guidelines",
        url: "https://timesofindia.com/supreme-court-privacy-guidelines",
        urlToImage: "https://placeholder.svg?height=400&width=600",
        publishedAt: "2025-03-04T16:30:00Z",
        author: "Sanjay Kumar",
      },
      {
        title: "India's First Quantum Computing Hub Inaugurated in Bengaluru",
        content:
          "India's first dedicated Quantum Computing Hub has been inaugurated in Bengaluru by the Ministry of Electronics and Information Technology. The facility houses advanced quantum computers and will serve as a research center for scientists, startups, and industry partners. The hub aims to accelerate India's capabilities in quantum technologies and develop practical applications in cryptography, materials science, and drug discovery.",
        source: "Deccan Herald",
        sourceUrl: "https://deccanherald.com/quantum-computing-hub-bengaluru",
        url: "https://deccanherald.com/quantum-computing-hub-bengaluru",
        urlToImage: "https://placeholder.svg?height=400&width=600",
        publishedAt: "2025-03-03T12:40:00Z",
        author: "Dr. Lakshmi Narayan",
      },
    ]

    return mockIndianNews
  } catch (error) {
    console.error("Error fetching Indian news from API:", error)
    return []
  }
}

// Function to get trending topics based on the news articles
export function getTrendingTopics() {
  // In a real app, this would analyze frequency and recency of topics
  return [
    { name: "Climate Change", count: 1245, trend: "up" },
    { name: "Artificial Intelligence", count: 987, trend: "up" },
    { name: "Misinformation", count: 876, trend: "up" },
    { name: "Quantum Computing", count: 654, trend: "up" },
    { name: "Biodiversity", count: 543, trend: "down" },
  ]
}

// Update the filterArticles function in the existing file
export function filterArticles(
  articles: any[],
  filters: {
    sources: string[]
    factCheckStatus: string[]
    date?: Date
  },
) {
  return articles.filter((article) => {
    // Filter by date if selected
    if (filters.date) {
      const articleDate = article.publishedAt ? new Date(article.publishedAt) : new Date()
      const filterDate = filters.date

      // Format both dates to YYYY-MM-DD for comparison
      const formatDate = (date: Date) => {
        return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`
      }

      if (formatDate(articleDate) !== formatDate(filterDate)) {
        return false
      }
    }

    // Filter by source if any sources are selected
    if (filters.sources.length > 0) {
      const articleSource = typeof article.source === "string" ? article.source : article.source?.name || ""

      const sourcesMatch = filters.sources.some((source) => articleSource.toLowerCase().includes(source.toLowerCase()))

      if (!sourcesMatch) return false
    }

    // Filter by fact check status if any statuses are selected
    if (filters.factCheckStatus.length > 0) {
      // For API articles that might not have factCheck, use a default status
      const status = article.factCheck?.status || "unverified"

      // Check if the article's status is in the selected statuses
      if (!filters.factCheckStatus.includes(status)) {
        return false
      }
    }

    return true
  })
}

