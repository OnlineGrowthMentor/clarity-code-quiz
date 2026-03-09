// ============================================
// CLARITY CODE QUIZ — App Logic
// ============================================

(function () {
  'use strict';

  // State
  let currentQuestion = 0;
  const tallies = {
    'frozen-high-achiever': 0,
    'secret-dreamer': 0,
    'slow-burn': 0,
    'almost-ready': 0
  };

  // DOM refs
  const landingView = document.getElementById('landing-view');
  const quizView = document.getElementById('quiz-view');
  const resultsView = document.getElementById('results-view');
  const questionContainer = document.getElementById('question-container');
  const progressBar = document.getElementById('progress-bar');
  const progressCount = document.getElementById('progress-count');

  // ============================================
  // VIEW MANAGEMENT
  // ============================================

  function showView(view) {
    [landingView, quizView, resultsView].forEach(v => v.classList.remove('active'));
    // Small delay to allow CSS transition
    requestAnimationFrame(() => {
      view.classList.add('active');
      window.scrollTo({ top: 0, behavior: 'instant' });
    });
  }

  // ============================================
  // QUIZ LOGIC
  // ============================================

  function startQuiz() {
    currentQuestion = 0;
    Object.keys(tallies).forEach(k => tallies[k] = 0);
    showView(quizView);
    renderQuestion();
  }

  function renderQuestion() {
    const q = quizQuestions[currentQuestion];
    const total = quizQuestions.length;

    // Update progress
    progressCount.textContent = `Question ${currentQuestion + 1} of ${total}`;
    progressBar.style.width = `${((currentQuestion) / total) * 100}%`;

    // Shuffle answer order for variety (but keep it deterministic per question)
    const shuffledAnswers = shuffleWithSeed(q.answers, q.id);

    // Build question HTML
    questionContainer.innerHTML = `
      <div class="question-dimension">${q.dimension}</div>
      <h2 class="question-text">${q.question}</h2>
      <div class="answer-options">
        ${shuffledAnswers.map((a, i) => `
          <button class="answer-btn" data-profile="${a.profile}" data-index="${i}">
            ${a.text}
          </button>
        `).join('')}
      </div>
    `;

    // Scroll to top of question on mobile
    window.scrollTo({ top: 0, behavior: 'instant' });

    // Animate in
    questionContainer.style.opacity = '0';
    questionContainer.style.transform = 'translateY(16px)';
    requestAnimationFrame(() => {
      questionContainer.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
      questionContainer.style.opacity = '1';
      questionContainer.style.transform = 'translateY(0)';
    });

    // Attach click handlers
    questionContainer.querySelectorAll('.answer-btn').forEach(btn => {
      btn.addEventListener('click', handleAnswer);
    });
  }

  function handleAnswer(e) {
    const btn = e.currentTarget;
    const profile = btn.dataset.profile;

    // Visual feedback
    btn.classList.add('selected');

    // Disable all buttons
    questionContainer.querySelectorAll('.answer-btn').forEach(b => {
      b.removeEventListener('click', handleAnswer);
      b.style.pointerEvents = 'none';
    });

    // Tally
    tallies[profile]++;

    // Advance after brief delay
    setTimeout(() => {
      currentQuestion++;
      if (currentQuestion < quizQuestions.length) {
        renderQuestion();
      } else {
        // Fill progress bar fully
        progressBar.style.width = '100%';
        setTimeout(() => showResults(), 400);
      }
    }, 350);
  }

  // Simple seeded shuffle to vary answer order per question
  function shuffleWithSeed(arr, seed) {
    const copy = [...arr];
    let s = seed;
    for (let i = copy.length - 1; i > 0; i--) {
      s = (s * 16807 + 11) % 2147483647;
      const j = s % (i + 1);
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  // ============================================
  // SCORING & RESULTS
  // ============================================

  function showResults() {
    const result = calculateResult();
    renderResults(result);
    showView(resultsView);
  }

  function calculateResult() {
    // Find max
    const sorted = Object.entries(tallies).sort((a, b) => b[1] - a[1]);
    const primary = sorted[0];
    const secondary = sorted[1];

    // Check for tie
    const isTied = primary[1] === secondary[1];

    return {
      primaryKey: primary[0],
      primaryCount: primary[1],
      secondaryKey: isTied ? secondary[0] : null,
      secondaryCount: isTied ? secondary[1] : null,
      isTied
    };
  }

  function renderResults(result) {
    const profile = profileData[result.primaryKey];

    // Hero
    const heroEl = document.getElementById('result-hero');
    heroEl.style.background = `linear-gradient(160deg, ${profile.color} 0%, ${adjustColor(profile.color, -40)} 100%)`;

    document.getElementById('result-emoji').textContent = profile.emoji;
    document.getElementById('result-name').textContent = profile.name;
    document.getElementById('result-opening-line').textContent = profile.openingLine;

    // Blended note
    const blendedNote = document.getElementById('blended-note');
    if (result.isTied && result.secondaryKey) {
      const secondary = profileData[result.secondaryKey];
      blendedNote.textContent = `You're ${profile.name} with ${secondary.name} energy.`;
      blendedNote.style.display = 'inline-block';
    } else {
      blendedNote.style.display = 'none';
    }

    // Core Identity
    document.getElementById('result-identity').innerHTML = profile.coreIdentity;

    // Daily Reality
    document.getElementById('result-daily-reality').innerHTML = profile.dailyReality;

    // Inner Dialogue
    const dialogueList = document.getElementById('result-inner-dialogue');
    dialogueList.innerHTML = profile.innerDialogue.map(d => `<li>${d}</li>`).join('');

    // AI Relationship
    document.getElementById('result-ai-relationship').innerHTML = profile.aiRelationship;

    // Capacity Blocks
    const blocksContainer = document.getElementById('result-capacity-blocks');
    blocksContainer.innerHTML = profile.capacityBlocks.map(b => `
      <div class="capacity-block-item">
        <h3>${b.name}</h3>
        <p>${b.description}</p>
      </div>
    `).join('');

    // Secret Fear & Hope
    document.getElementById('result-secret-fear').textContent = profile.secretFear;
    document.getElementById('result-secret-hope').textContent = profile.secretHope;

    // MAP Visual
    renderMAP(profile.mapPosition);
    document.getElementById('map-description').textContent = profile.mapLabel;

    // Mini-Lessons
    renderMiniLessons(profile.miniLessons);

    // Next Step
    document.getElementById('result-next-step').textContent = profile.nextStep;

    // Set accent colors throughout results
    document.querySelectorAll('.result-block-label').forEach(el => {
      el.style.color = profile.color;
    });
  }

  function renderMAP(position) {
    const phases = [
      { letter: 'M', name: 'Mindset', keys: ['mindset', 'mindset-to-strategy'] },
      { letter: 'A', name: 'Aligned AI Strategy', keys: ['mindset-to-strategy', 'strategy-to-action'] },
      { letter: 'P', name: 'Profitable Action', keys: ['strategy-to-action', 'action'] }
    ];

    const mapVisual = document.getElementById('map-visual');
    mapVisual.innerHTML = phases.map((phase, i) => {
      const isActive = phase.keys.includes(position);
      const arrow = i < phases.length - 1 ? '<span class="map-arrow">&rarr;</span>' : '';
      return `
        <div class="map-phase ${isActive ? 'active' : ''}">
          <div class="map-phase-letter">${phase.letter}</div>
          <div class="map-phase-name">${phase.name}</div>
        </div>
        ${arrow}
      `;
    }).join('');
  }

  function renderMiniLessons(lessons) {
    const container = document.getElementById('mini-lessons-container');
    container.innerHTML = lessons.map((lesson, i) => `
      <div class="mini-lesson" id="lesson-${i}">
        <div class="mini-lesson-header" onclick="toggleLesson(${i})">
          <div>
            <div class="mini-lesson-number">Mini-Lesson ${i + 1}</div>
            <div class="mini-lesson-title">${lesson.title}</div>
          </div>
          <div class="mini-lesson-toggle">+</div>
        </div>
        <div class="mini-lesson-content" id="lesson-content-${i}">
          <div class="mini-lesson-content-inner">
            ${lesson.content}
          </div>
        </div>
      </div>
    `).join('');
  }

  // ============================================
  // HELPERS
  // ============================================

  function adjustColor(hex, amount) {
    // Darken or lighten a hex color
    let color = hex.replace('#', '');
    const num = parseInt(color, 16);
    let r = Math.max(0, Math.min(255, (num >> 16) + amount));
    let g = Math.max(0, Math.min(255, ((num >> 8) & 0x00FF) + amount));
    let b = Math.max(0, Math.min(255, (num & 0x0000FF) + amount));
    return `#${(r << 16 | g << 8 | b).toString(16).padStart(6, '0')}`;
  }

  // ============================================
  // GLOBAL FUNCTIONS (for onclick in HTML)
  // ============================================

  window.toggleLesson = function (index) {
    const lesson = document.getElementById(`lesson-${index}`);
    const content = document.getElementById(`lesson-content-${index}`);

    if (lesson.classList.contains('open')) {
      lesson.classList.remove('open');
      content.style.maxHeight = '0';
    } else {
      lesson.classList.add('open');
      content.style.maxHeight = content.scrollHeight + 'px';
    }
  };

  // ============================================
  // EVENT LISTENERS
  // ============================================

  document.getElementById('start-quiz-btn').addEventListener('click', startQuiz);
  document.getElementById('start-quiz-btn-2').addEventListener('click', startQuiz);
  document.getElementById('retake-btn').addEventListener('click', startQuiz);

  // Email form (UI only)
  document.getElementById('email-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const input = this.querySelector('input');
    const btn = this.querySelector('button');
    btn.textContent = 'Thank you!';
    btn.style.background = '#682e66';
    btn.style.color = '#fff';
    input.disabled = true;
    btn.disabled = true;
  });

  // Share buttons
  document.getElementById('share-copy').addEventListener('click', function () {
    navigator.clipboard.writeText(window.location.href).then(() => {
      this.textContent = 'Copied!';
      setTimeout(() => { this.textContent = 'Copy Link'; }, 2000);
    });
  });

  document.getElementById('share-native').addEventListener('click', function () {
    if (navigator.share) {
      navigator.share({
        title: 'The Clarity Code Quiz',
        text: 'I just discovered my Clarity Code. Take the quiz and find yours!',
        url: window.location.href
      });
    } else {
      // Fallback - copy
      navigator.clipboard.writeText(window.location.href).then(() => {
        this.textContent = 'Link Copied!';
        setTimeout(() => { this.textContent = 'Share'; }, 2000);
      });
    }
  });

})();
