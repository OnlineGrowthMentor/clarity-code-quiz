const quizQuestions = [
  {
    id: 1,
    dimension: "Daily Reality",
    question: "When you think about your typical week right now, which feels most true?",
    answers: [
      { text: "I'm busy and productive but something feels off. Like I'm running a program that doesn't fit anymore.", profile: "frozen-high-achiever" },
      { text: "I do what I need to do, but my real energy goes into imagining a different life.", profile: "secret-dreamer" },
      { text: "I'm going through the motions. Honestly, I think I already know I need to make a change.", profile: "slow-burn" },
      { text: "I've already started making changes. I'm further along than I let on to most people.", profile: "almost-ready" }
    ]
  },
  {
    id: 2,
    dimension: "Relationship with Ambition",
    question: "When you think about what you actually want next, what's your honest reaction?",
    answers: [
      { text: "I know I want something different, but I need to figure out exactly what before I can move.", profile: "frozen-high-achiever" },
      { text: "I know what I want. I just haven't said it out loud yet.", profile: "secret-dreamer" },
      { text: "I know what I want, and honestly I'm past the point of wondering. I just need to go.", profile: "slow-burn" },
      { text: "I know what I want, and I've already taken steps toward it — I just haven't fully committed yet.", profile: "almost-ready" }
    ]
  },
  {
    id: 3,
    dimension: "Inner Dialogue",
    question: "What sounds most like the voice in your head lately?",
    answers: [
      { text: "I need to figure this out before I can move.", profile: "frozen-high-achiever" },
      { text: "Someday, when it's the right time, I'll actually go for it.", profile: "secret-dreamer" },
      { text: "I'm done. I just need to figure out how to make the move.", profile: "slow-burn" },
      { text: "I'm so close. I just need to get past this one last thing.", profile: "almost-ready" }
    ]
  },
  {
    id: 4,
    dimension: "The Load She Carries",
    question: "What's the heaviest thing you're carrying right now?",
    answers: [
      { text: "The pressure of not yet having figured out my next chapter — when I'm supposed to have it together.", profile: "frozen-high-achiever" },
      { text: "The quiet weight of a life I haven't let myself live yet.", profile: "secret-dreamer" },
      { text: "The frustration of staying somewhere I've already outgrown.", profile: "slow-burn" },
      { text: "The gap between how far I've come and how I keep stopping just short of the finish line.", profile: "almost-ready" }
    ]
  },
  {
    id: 5,
    dimension: "Body & Energy Reality",
    question: "How does your body show up in all of this?",
    answers: [
      { text: "Tight. Tired. Like it's been bracing for something I haven't dealt with yet.", profile: "frozen-high-achiever" },
      { text: "I feel most alive when I'm imagining or planning the future I haven't stepped into yet.", profile: "secret-dreamer" },
      { text: "Restless. Done. My body made the decision before my brain did.", profile: "slow-burn" },
      { text: "I have energy for this — more than for the things I'm leaving behind.", profile: "almost-ready" }
    ]
  },
  {
    id: 6,
    dimension: "Secret Fear",
    question: "If you're being completely honest, what are you most afraid of?",
    answers: [
      { text: "That I'll make the wrong move and prove I wasn't as capable as everyone thought.", profile: "frozen-high-achiever" },
      { text: "That if I say what I really want, I'll be judged — or worse, I'll fail at it.", profile: "secret-dreamer" },
      { text: "That I'll wait too long and miss my window entirely.", profile: "slow-burn" },
      { text: "That I'll go all-in and it still won't be enough.", profile: "almost-ready" }
    ]
  },
  {
    id: 7,
    dimension: "Secret Hope",
    question: "What are you quietly hoping for?",
    answers: [
      { text: "That I'll finally feel ready — and that someone will tell me it's okay to move before I do.", profile: "frozen-high-achiever" },
      { text: "That someone will see what I'm capable of before I have to prove it.", profile: "secret-dreamer" },
      { text: "That the version of my life I've imagined is actually waiting for me on the other side of this.", profile: "slow-burn" },
      { text: "That the next step is the one that finally feels like enough. That I can stop bracing and start living.", profile: "almost-ready" }
    ]
  },
  {
    id: 8,
    dimension: "Capacity Block Pattern",
    question: "Which of these patterns feels most like yours?",
    answers: [
      { text: "I keep tweaking, researching, and preparing — because putting something imperfect out there feels dangerous.", profile: "frozen-high-achiever" },
      { text: "I say yes to everyone else's needs and quietly push my own dreams to the bottom of the list.", profile: "secret-dreamer" },
      { text: "I believe that making this change will require sacrifice, stress, and trade-offs I'm not sure I can handle.", profile: "slow-burn" },
      { text: "I pour energy into other people's projects while my own sits at 90% done, waiting for \"one more thing.\"", profile: "almost-ready" }
    ]
  },
  {
    id: 9,
    dimension: "Relationship with Action",
    question: "When it comes to actually making a move, what happens?",
    answers: [
      { text: "I get stuck in analysis mode. I need more information before I can decide.", profile: "frozen-high-achiever" },
      { text: "I plan in my head but don't take visible steps. I'm not sure anyone even knows I want this.", profile: "secret-dreamer" },
      { text: "I know exactly what I'd do. I just can't seem to pull the trigger on the logistics.", profile: "slow-burn" },
      { text: "I take action — then pull back right before it gets real. Start, stall, start, stall.", profile: "almost-ready" }
    ]
  },
  {
    id: 10,
    dimension: "Energy & Depletion",
    question: "Which statement best describes your energy right now?",
    answers: [
      { text: "I'm exhausted from holding everything together, but I'd feel guilty if I stopped.", profile: "frozen-high-achiever" },
      { text: "I have energy — but it all goes toward things that don't reflect what I actually want.", profile: "secret-dreamer" },
      { text: "My energy is focused and clear, but I'm spending it on the wrong things because I haven't left yet.", profile: "slow-burn" },
      { text: "I have more energy for what's next than I've had in years — I just keep stalling on using it.", profile: "almost-ready" }
    ]
  },
  {
    id: 11,
    dimension: "Identity & Self-Perception",
    question: "When you think about who you are right now — not your roles, not your title — what comes up?",
    answers: [
      { text: "I'm not sure anymore. I used to know, but somewhere along the way I lost the thread.", profile: "frozen-high-achiever" },
      { text: "I know exactly who I am inside. I'm just not showing that person to the world yet.", profile: "secret-dreamer" },
      { text: "I've outgrown who I was. The new me is clear — I'm just stuck in the old life.", profile: "slow-burn" },
      { text: "I'm becoming her. I can feel it. I just need to stop holding back.", profile: "almost-ready" }
    ]
  },
  {
    id: 12,
    dimension: "Boundaries & Yes/No",
    question: "How do you handle requests on your time and energy?",
    answers: [
      { text: "I say yes to almost everything because I feel like I should be able to handle it all.", profile: "frozen-high-achiever" },
      { text: "I say yes to others and quietly say no to myself. My dreams get the leftover time, if there is any.", profile: "secret-dreamer" },
      { text: "I'm starting to say no, but the guilt is intense. I feel like I'm letting people down.", profile: "slow-burn" },
      { text: "I've gotten better at boundaries, but I still overgive when I'm avoiding my own next step.", profile: "almost-ready" }
    ]
  },
  {
    id: 13,
    dimension: "Stress Response",
    question: "When stress hits, what's your default response?",
    answers: [
      { text: "I double down. More lists, more research, more preparation. If I just plan enough, I'll feel in control.", profile: "frozen-high-achiever" },
      { text: "I go internal. I retreat into my inner world where things feel safer and more possible.", profile: "secret-dreamer" },
      { text: "I get irritable. I don't have patience for things that no longer matter to me.", profile: "slow-burn" },
      { text: "I get busy with things that feel productive but aren't actually moving me forward.", profile: "almost-ready" }
    ]
  },
  {
    id: 14,
    dimension: "What She Needs Most",
    question: "If you could have one thing right now, what would it be?",
    answers: [
      { text: "Permission. Permission to move before I have it all figured out.", profile: "frozen-high-achiever" },
      { text: "Proof. Proof that what I want isn't crazy — and that I'm allowed to go for it.", profile: "secret-dreamer" },
      { text: "A bridge. A practical, realistic plan to get from where I am to where I know I need to be.", profile: "slow-burn" },
      { text: "A push. Someone to look me in the eye and say: \"You're ready. Stop waiting.\"", profile: "almost-ready" }
    ]
  },
  {
    id: 15,
    dimension: "Relationship with AI & Tech",
    question: "When it comes to AI and all the new tools everyone's talking about, where are you honestly?",
    answers: [
      { text: "Overwhelmed. I've signed up for things, watched tutorials, but I still don't know where to start. It's one more thing I need to figure out.", profile: "frozen-high-achiever" },
      { text: "Curious. I can see how AI could help me build the thing I want — I just haven't actually used it for that yet.", profile: "secret-dreamer" },
      { text: "Impatient. I see the window that's open right now and I know I should be using AI to build my exit plan. I just haven't committed to one lane.", profile: "slow-burn" },
      { text: "Already using it. I've drafted things, tested tools, built more than I let on. But somehow nothing is live yet.", profile: "almost-ready" }
    ]
  },
  {
    id: 16,
    dimension: "The AI Overwhelm Pattern",
    question: "Which of these sounds most like your week when it comes to AI?",
    answers: [
      { text: "I read about 3 new tools, watch a tutorial, take notes — and build nothing. High stimulation, zero output.", profile: "frozen-high-achiever" },
      { text: "I save posts about AI businesses other women are building and think \"I could do that\" — but I don't open the tool.", profile: "secret-dreamer" },
      { text: "I know exactly what I'd build with AI. I just can't seem to start because I'm still stuck in the life I'm trying to leave.", profile: "slow-burn" },
      { text: "I open the tool, start building, get it to 80% — then switch to a different idea or tool before I finish anything.", profile: "almost-ready" }
    ]
  }
];
