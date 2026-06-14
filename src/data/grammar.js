export const grammarLessons = [
  {
    id: "g1", level: "beginner", order: 1,
    title: "Greetings & Basic Expressions", icon: "👋",
    explanation: "Master essential French greetings. In Quebec, greetings depend on time of day and formality.",
    content: "**Formal (vouvoiement):** Used with strangers, professionals, older people\n**Informal (tutoiement):** Used with friends, family, children\n\nIn Quebec, people often switch to informal faster than in France.",
    examples: [
      { french: "Bonjour!", english: "Hello! / Good morning!", note: "Used until about 6pm" },
      { french: "Bonsoir!", english: "Good evening!", note: "Used after 6pm" },
      { french: "Salut!", english: "Hi! (informal)", note: "Only with friends" },
      { french: "Comment allez-vous?", english: "How are you? (formal)", note: "Vouvoiement" },
      { french: "Comment vas-tu?", english: "How are you? (informal)", note: "Tutoiement" },
      { french: "Ça va?", english: "How's it going?", note: "Very common and casual" },
      { french: "Au revoir", english: "Goodbye", note: "Both formal and informal" },
      { french: "À bientôt", english: "See you soon", note: "Common farewell" },
      { french: "Bonne journée!", english: "Have a good day!", note: "Said when leaving" },
    ],
    quiz: [
      { question: "How do you say 'Good evening' in French?", options: ["Bonjour", "Bonsoir", "Salut", "Au revoir"], correct: 1, explanation: "Bonsoir is used in the evening, after about 6pm." },
      { question: "Which greeting is informal?", options: ["Bonjour", "Bonsoir", "Salut", "Comment allez-vous?"], correct: 2, explanation: "Salut is casual/informal, used with friends and peers." },
      { question: "What does 'Ça va?' mean?", options: ["Goodbye", "Good morning", "How's it going?", "Thank you"], correct: 2, explanation: "Ça va? is a very common casual way to ask how someone is doing." },
    ],
    commonMistakes: [
      "Don't use 'Salut' with your boss or strangers — it's too informal",
      "In Quebec, 'Bienvenue!' means 'you're welcome' — not just 'welcome'",
      "'Ça va' can be both a question AND an answer: 'Ça va?' / 'Ça va, merci!'",
    ]
  },
  {
    id: "g2", level: "beginner", order: 2,
    title: "Present Tense: -ER Verbs", icon: "🔄",
    explanation: "Regular -er verbs are the most common verb group. Learn the pattern once, conjugate hundreds of verbs!",
    content: "Remove the -er ending and add these endings:\n\n| Subject | Ending | parler |\n|---------|--------|--------|\n| je | -e | parle |\n| tu | -es | parles |\n| il/elle/on | -e | parle |\n| nous | -ons | parlons |\n| vous | -ez | parlez |\n| ils/elles | -ent | parlent |\n\n⚠️ The -e, -es, and -ent endings are all SILENT.",
    examples: [
      { french: "Je parle français.", english: "I speak French." },
      { french: "Tu manges une pomme.", english: "You eat an apple." },
      { french: "Elle travaille au bureau.", english: "She works at the office." },
      { french: "Nous habitons à Montréal.", english: "We live in Montreal." },
      { french: "Vous aimez la musique?", english: "Do you like music?" },
      { french: "Ils regardent la télé.", english: "They watch TV." },
    ],
    quiz: [
      { question: "Conjugate 'manger' for 'nous':", options: ["mange", "mangent", "mangeons", "mangez"], correct: 2, explanation: "Nous mangeons — note the extra 'e' before -ons to preserve the soft 'g' sound." },
      { question: "Which is correct? 'Tu _____ français.'", options: ["parle", "parles", "parlons", "parlez"], correct: 1, explanation: "With 'tu', -er verbs add -es: tu parles." },
      { question: "What is the 'ils' form of 'habiter'?", options: ["habite", "habitons", "habitez", "habitent"], correct: 3, explanation: "Ils habitent — the -ent ending is silent." },
    ],
    commonMistakes: [
      "The -e, -es, and -ent endings are all SILENT — je parle, tu parles, ils parlent sound the same",
      "Nous mangeons keeps the 'e' before -ons — without it, the 'g' would sound hard",
      "'Vous' can be both 'you (plural)' and 'you (formal singular)'",
    ]
  },
  {
    id: "g3", level: "beginner", order: 3,
    title: "The Verb ÊTRE (to be)", icon: "⚡",
    explanation: "Être is one of the two most important verbs. Completely irregular — you must memorize it.",
    content: "ÊTRE conjugation:\n\n| Subject | Form |\n|---------|------|\n| je | suis |\n| tu | es |\n| il/elle/on | est |\n| nous | sommes |\n| vous | êtes |\n| ils/elles | sont |\n\n💡 In French, you don't use un/une with professions after être:\n✅ Je suis médecin. ❌ Je suis un médecin.",
    examples: [
      { french: "Je suis étudiant.", english: "I am a student." },
      { french: "Tu es en retard!", english: "You are late!" },
      { french: "Il est médecin.", english: "He is a doctor." },
      { french: "Nous sommes à Montréal.", english: "We are in Montreal." },
      { french: "Vous êtes d'accord?", english: "Do you agree?" },
      { french: "Ils sont fatigués.", english: "They are tired." },
      { french: "C'est bon!", english: "That's good!" },
    ],
    quiz: [
      { question: "How do you say 'I am tired'?", options: ["Je suis fatigué", "Tu es fatigué", "Il est fatigué", "Je es fatigué"], correct: 0, explanation: "Je suis — 'suis' is the first-person singular form of être." },
      { question: "Complete: 'Nous _____ à Montréal.'", options: ["est", "sont", "êtes", "sommes"], correct: 3, explanation: "Nous sommes — this is the nous form of être." },
      { question: "What does 'C'est bon' mean?", options: ["It's a dog", "That's good / It's good", "He is good", "We are good"], correct: 1, explanation: "C'est is a contraction of 'ce est' and means 'it is' or 'that is'." },
    ],
    commonMistakes: [
      "Don't say 'je es' — with je it's always 'je suis'",
      "Don't use un/une with professions: 'Je suis médecin' not 'Je suis un médecin'",
      "C'est (it is) is different from Il/elle est (he/she is)",
    ]
  },
  {
    id: "g4", level: "beginner", order: 4,
    title: "The Verb AVOIR (to have)", icon: "💡",
    explanation: "Avoir is the second most important verb. Beyond 'to have', it expresses feelings, age, and many states.",
    content: "AVOIR conjugation:\n\n| Subject | Form |\n|---------|------|\n| je | ai |\n| tu | as |\n| il/elle | a |\n| nous | avons |\n| vous | avez |\n| ils/elles | ont |\n\n⚠️ French uses avoir (not être) for many states:\n• avoir faim = to BE hungry\n• avoir soif = to BE thirsty\n• avoir chaud/froid = to BE hot/cold\n• avoir X ans = to BE X years old",
    examples: [
      { french: "J'ai 30 ans.", english: "I am 30 years old." },
      { french: "Tu as faim?", english: "Are you hungry?" },
      { french: "Elle a un chien.", english: "She has a dog." },
      { french: "Nous avons besoin d'aide.", english: "We need help." },
      { french: "Vous avez raison.", english: "You are right." },
      { french: "Ils ont une voiture.", english: "They have a car." },
    ],
    quiz: [
      { question: "How do you say 'I am 25 years old'?", options: ["Je suis 25 ans", "J'ai 25 ans", "J'es 25 ans", "Avoir 25 ans"], correct: 1, explanation: "In French, age uses avoir: j'ai 25 ans (I have 25 years)." },
      { question: "Complete: 'Tu _____ soif?'", options: ["es", "suis", "as", "a"], correct: 2, explanation: "Tu as soif = Are you thirsty? (avoir for physical states)" },
      { question: "What does 'Ils ont peur' mean?", options: ["They have a father", "They are afraid", "They have a pair", "They are not right"], correct: 1, explanation: "Avoir peur = to be afraid. Ils ont peur = They are afraid." },
    ],
    commonMistakes: [
      "Don't say 'je suis 30 ans' — age uses avoir: 'j'ai 30 ans'",
      "Physical sensations use avoir: faim, soif, chaud, froid, peur",
      "J'ai (not 'je ai') — the 'e' in 'je' drops before a vowel (elision)",
    ]
  },
  {
    id: "g5", level: "beginner", order: 5,
    title: "Negation: ne... pas", icon: "🚫",
    explanation: "Making sentences negative in French requires wrapping the verb with 'ne' and 'pas'.",
    content: "Structure: **Subject + ne + verb + pas**\n\nBefore vowels: ne → n'\n• Je n'ai pas → (not 'Je ne ai pas')\n\n💬 In spoken Quebec French, 'ne' is often dropped:\n• 'Je ne sais pas' → 'Je sais pas'\n• 'C'est pas grave' (very common!)\n\nOther negative expressions:\n• ne... jamais = never\n• ne... plus = no longer\n• ne... rien = nothing",
    examples: [
      { french: "Je ne parle pas anglais.", english: "I don't speak English." },
      { french: "Il n'est pas là.", english: "He is not here." },
      { french: "Tu n'as pas faim?", english: "Aren't you hungry?" },
      { french: "Je ne sais pas.", english: "I don't know." },
      { french: "C'est pas grave.", english: "It's no big deal. (spoken Quebec)", note: "Common in Quebec — 'ne' dropped" },
      { french: "Je ne comprends plus.", english: "I no longer understand." },
    ],
    quiz: [
      { question: "Make this negative: 'Je parle français.'", options: ["Je ne parle français", "Je parle ne pas français", "Je ne parle pas français", "Je pas parle français"], correct: 2, explanation: "Ne goes before the verb, pas goes after: Je ne parle pas français." },
      { question: "Which is correct? 'Il ___ est ___ là.'", options: ["pas / ne", "ne / pas", "n' / pas", "ne / point"], correct: 2, explanation: "Before a vowel (est), 'ne' becomes 'n'': Il n'est pas là." },
      { question: "In spoken Quebec French, what's often dropped?", options: ["pas", "ne", "the verb", "the subject"], correct: 1, explanation: "The 'ne' is very commonly dropped in spoken French: 'Je sais pas'." },
    ],
    commonMistakes: [
      "Don't forget both parts in formal/written French: 'ne' AND 'pas'",
      "Ne becomes n' before vowels: n'ai, n'est, n'ont",
      "In Quebec spoken French, dropping 'ne' is normal and natural",
    ]
  },
  {
    id: "g6", level: "beginner", order: 6,
    title: "Asking Questions", icon: "❓",
    explanation: "Three ways to ask questions in French, from informal to formal.",
    content: "**Method 1: Rising Intonation (most informal)**\nRaise your voice at the end. Most common in spoken Quebec French.\nTu parles français?\n\n**Method 2: Est-ce que (very common)**\nAdd 'est-ce que' before a statement.\nEst-ce que tu parles français?\n\n**Method 3: Inversion (formal/written)**\nSwap subject and verb with a hyphen.\nParles-tu français? (sounds very formal!)\n\n**Question words:**\n• Où = Where\n• Quand = When\n• Pourquoi = Why\n• Comment = How\n• Combien = How much/many\n• Qui = Who\n• Quoi/Que = What\n• Quel/Quelle = Which",
    examples: [
      { french: "Est-ce que vous parlez anglais?", english: "Do you speak English?", note: "Most natural formal question" },
      { french: "Où est la station de métro?", english: "Where is the subway station?" },
      { french: "C'est combien?", english: "How much is it?", note: "Very common!" },
      { french: "Pourquoi tu es en retard?", english: "Why are you late? (informal)" },
      { french: "Comment vous appelez-vous?", english: "What is your name? (formal)" },
      { french: "Quand est-ce que tu arrives?", english: "When are you arriving?" },
    ],
    quiz: [
      { question: "Which is the MOST informal way to ask a question?", options: ["Inversion", "Est-ce que", "Rising intonation", "Question words"], correct: 2, explanation: "Simply raising your voice (intonation) is the most casual method, common in spoken French." },
      { question: "How do you say 'How much is it?'", options: ["Combien est-ce?", "C'est combien?", "Combien ça?", "Quel prix?"], correct: 1, explanation: "C'est combien? is the standard everyday way to ask the price." },
      { question: "Complete: '_____ est la salle de bain?'", options: ["Quand", "Pourquoi", "Où", "Comment"], correct: 2, explanation: "Où = Where. Où est la salle de bain? = Where is the bathroom?" },
    ],
    commonMistakes: [
      "Inversion (Parles-tu?) sounds very formal — in real conversation, use est-ce que or intonation",
      "With 'il/elle', inversion adds -t-: 'Parle-t-il?' to avoid two vowels together",
      "'Comment tu t'appelles?' is more natural in Montreal than 'Comment vous appelez-vous?'",
    ]
  },
  {
    id: "g7", level: "intermediate", order: 7,
    title: "Passé Composé", icon: "⏮️",
    explanation: "The passé composé is the main past tense in spoken French for completed actions.",
    content: "**Formation:** avoir/être (present) + past participle\n\n**With avoir (most verbs):**\nj'ai mangé, tu as parlé, il a fini\n\n**With être (movement & reflexive verbs):**\nje suis allé(e), tu es parti(e), il est venu\n\n**Past participle rules:**\n• -er → -é: parler → parlé\n• -ir → -i: finir → fini\n• -re → -u: vendre → vendu\n\n**Irregular participles:**\navoir → eu | être → été | faire → fait | prendre → pris | voir → vu",
    examples: [
      { french: "J'ai mangé une pizza.", english: "I ate a pizza." },
      { french: "Elle a travaillé hier.", english: "She worked yesterday." },
      { french: "Je suis allé au marché.", english: "I went to the market." },
      { french: "Ils sont arrivés ce matin.", english: "They arrived this morning." },
      { french: "J'ai pris le métro.", english: "I took the subway." },
      { french: "Qu'est-ce que tu as fait hier?", english: "What did you do yesterday?" },
    ],
    quiz: [
      { question: "Conjugate 'manger' in passé composé for 'je':", options: ["je mangeais", "j'ai mangé", "je mange", "j'avais mangé"], correct: 1, explanation: "Passé composé = avoir/être + past participle: j'ai mangé." },
      { question: "Which verb uses ÊTRE in passé composé?", options: ["manger", "parler", "aller", "finir"], correct: 2, explanation: "Aller uses être: je suis allé(e)." },
      { question: "What is the past participle of 'prendre'?", options: ["prendu", "prendé", "pris", "prend"], correct: 2, explanation: "Prendre → pris (irregular). J'ai pris le bus." },
    ],
    commonMistakes: [
      "Agree the past participle with être verbs: je suis allé (m) vs je suis allée (f)",
      "In Quebec, passé composé is used for ALL past events in speech",
      "Don't forget that faire → fait: j'ai fait, not 'j'ai faité'",
    ]
  },
  {
    id: "g8", level: "intermediate", order: 8,
    title: "Imparfait (Imperfect)", icon: "🌊",
    explanation: "The imparfait describes ongoing past states, habits, and background actions.",
    content: "**Use imparfait for:**\n• Ongoing past states: J'étais fatigué.\n• Habitual past actions: Je prenais le bus tous les jours.\n• Background descriptions: Il pleuvait quand je suis arrivé.\n• Age in the past: J'avais 10 ans.\n\n**Formation:** nous stem + imperfect endings\n-ais, -ais, -ait, -ions, -iez, -aient\n\nExample - parler (stem: parl-):\nje parlais, tu parlais, il parlait, nous parlions",
    examples: [
      { french: "Je travaillais à Toronto avant.", english: "I used to work in Toronto." },
      { french: "Il faisait beau hier matin.", english: "The weather was nice yesterday morning." },
      { french: "Quand j'étais petit, j'aimais le hockey.", english: "When I was young, I liked hockey." },
      { french: "Elle lisait quand je suis arrivé.", english: "She was reading when I arrived." },
    ],
    quiz: [
      { question: "Which use requires imparfait?", options: ["I ate (specific meal)", "I was eating when...", "I will eat", "I have eaten"], correct: 1, explanation: "Ongoing/background actions use imparfait. Specific completed actions use passé composé." },
      { question: "Imparfait of 'être' for 'je':", options: ["j'étais", "j'ai été", "je suis", "j'étai"], correct: 0, explanation: "Être in imparfait: j'étais (I was/I used to be)" },
      { question: "'Chaque matin, je _____ un café.' (prendre)", options: ["ai pris", "prends", "prenais", "prendrai"], correct: 2, explanation: "Habitual past actions use imparfait: je prenais (I used to take / I would take)" },
    ],
    commonMistakes: [
      "Imparfait for habits: 'Je prenais toujours le café le matin' (every morning = habit)",
      "Passé composé for single events: 'Hier matin j'ai pris un café'",
      "Background conditions are always imparfait: 'il faisait chaud', 'j'avais faim'",
    ]
  },
  {
    id: "g9", level: "beginner", order: 9,
    title: "Near Future: aller + infinitive", icon: "🚀",
    explanation: "The easiest way to talk about the future! Use aller (to go) + any infinitive.",
    content: "**Structure:** conjugated aller + infinitive\n\n| Subject | Aller | Example |\n|---------|-------|----------|\n| je | vais | Je vais partir |\n| tu | vas | Tu vas manger |\n| il/elle | va | Elle va travailler |\n| nous | allons | Nous allons voir |\n| vous | allez | Vous allez arriver |\n| ils/elles | vont | Ils vont venir |\n\n💡 This is the MOST COMMON way to express the future in spoken French!",
    examples: [
      { french: "Je vais manger après le travail.", english: "I'm going to eat after work." },
      { french: "Il va pleuvoir demain.", english: "It's going to rain tomorrow." },
      { french: "On va prendre le métro.", english: "We're going to take the metro." },
      { french: "Vous allez adorer Montréal!", english: "You're going to love Montreal!" },
      { french: "Qu'est-ce que tu vas faire ce soir?", english: "What are you going to do tonight?" },
    ],
    quiz: [
      { question: "How do you say 'I'm going to work tomorrow'?", options: ["Je vais travaille demain", "Je vais travailler demain", "Je vas travailler demain", "J'irai travailler demain"], correct: 1, explanation: "Aller (conjugated) + infinitive: Je vais travailler demain." },
      { question: "Which is correct? 'Il _____ pleuvoir ce soir.'", options: ["va", "vais", "vont", "allez"], correct: 0, explanation: "Il va — third person singular of aller." },
      { question: "Complete: 'Nous _____ prendre le bus.'", options: ["vais", "vas", "allons", "vont"], correct: 2, explanation: "Nous allons — first person plural of aller." },
    ],
    commonMistakes: [
      "Always use the INFINITIVE after aller: 'Je vais manger' not 'Je vais mange'",
      "Don't confuse aller (to go) with the future use: context makes it clear",
      "This is preferred over the simple future tense in everyday speech",
    ]
  },
  {
    id: "g10", level: "intermediate", order: 10,
    title: "Articles & Partitives", icon: "📚",
    explanation: "French articles (le, la, les, un, une, des) and partitives (du, de la, de l') must be used correctly.",
    content: "**Definite articles (the):**\n• le + masculine: le café, le bus\n• la + feminine: la maison, la voiture\n• l' + vowel/h: l'ami, l'heure\n• les + plural: les enfants\n\n**Indefinite articles (a/an, some):**\n• un + masculine: un café, un livre\n• une + feminine: une idée, une table\n• des + plural: des amis\n\n**Partitives (some, any — for non-countable):**\n• du + masculine: du pain, du café\n• de la + feminine: de la musique, de la neige\n• de l' + vowel: de l'eau, de l'air\n\n⚠️ After negation, all become 'de':\n✅ Je veux du café. ❌ Je ne veux pas de café.",
    examples: [
      { french: "Je prends du café le matin.", english: "I have (some) coffee in the morning." },
      { french: "Est-ce qu'il y a de la place?", english: "Is there any room?" },
      { french: "Je ne mange pas de viande.", english: "I don't eat meat." },
      { french: "Il y a des cafés partout à Montréal.", english: "There are cafés everywhere in Montreal." },
    ],
    quiz: [
      { question: "Complete: 'Je veux _____ eau.'", options: ["du", "de la", "de l'", "des"], correct: 2, explanation: "Eau starts with a vowel: de l'eau." },
      { question: "After negation: 'Je ne veux pas _____ café.'", options: ["du", "de", "le", "un"], correct: 1, explanation: "After negation, all articles become 'de': pas de café." },
      { question: "'_____ enfants jouent dans le parc.'", options: ["Le", "La", "L'", "Les"], correct: 3, explanation: "Enfants is plural, so use les: Les enfants." },
    ],
    commonMistakes: [
      "After negation, du/de la/des all become 'de': 'pas de café', 'pas de lait'",
      "Don't omit articles: ✅ 'Je bois du café' ❌ 'Je bois café'",
      "Partitives are for non-countable things: du pain, de la musique (not individual pieces)",
    ]
  },
];
