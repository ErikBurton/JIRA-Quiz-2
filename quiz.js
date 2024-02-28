const questions = [
    {
        question: "1. What is the primary purpose of linking a bug to a parent Epic in Jira?",
        options: ["To assign responsibility to the Product Owners", "To ensure proper tracking and classification", "To prioritize the bug for immediate fixing", "To create visibility for developers' work"],
        answer: "To ensure proper tracking and classification"
      },
      {
        question: "2. Which classification codes can be assigned to an Epic?",
        options: ["BAU, DQM, or BPP", "QA, DRM, or BPP", "BAU, DRM, or BPP", "QA, DQM, or BPP"],
        answer: "BAU, DRM, or BPP"
      },
      {
        question: "3. In Jira, how should the component field of a Story be filled out?",
        options: ["It should match the Assignee's team", "It should match the Epic's classification", "It should be left blank", "It should match the Product Owner's team"],
        answer: "It should match the Assignee's team"
      },
      {
        question: "4. What should be done if help is needed from another team for a work item?",
        options: ["Create a Sub-task and assign it to the other team", "Log a Story or Task for that team", "Contact the Scrum Master of the other team directly", "Reach out to the SOS for assistance"],
        answer: "Log a Story or Task for that team"
      },
      {
        question: "5. When should the FixVersion field be set in Jira?",
        options: ["After the work item is completed", "Before any testing is conducted", "By the Product Owner or their delegate", "By the Scrum Master during Sprint Planning"],
        answer: "By the Product Owner or their delegate"
      },
      {
        question: "6. What is the significance of the FixVersion field in Jira?",
        options: ["It indicates the priority level of the work item", "It determines the assignee of the work item", "It represents a commitment to deploying the work item to production", "It indicates the estimated effort required to complete the work item"],
        answer: "It represents a commitment to deploying the work item to production"
      },
      {
        question: "7. How should bugs found in UAT or Production be logged in Jira?",
        options: ["As Bugs and assigned directly to developers", "As Defects and prioritized like any other Story", "As Sub-tasks of the parent Epic", "As Tasks and assigned to the Scrum Master"],
        answer: "As Defects and prioritized like any other Story"
      },
      {
        question: "8. What is the recommended action when a bug exists in both Dev160 and Dev105 environments?",
        options: ["Log separate bugs for each environment", "Close the bug in one environment and link it to the other", "Prioritize fixing the bug in Dev160 over Dev105", "Notify the Product Owner for further instructions"],
        answer: "Close the bug in one environment and link it to the other"
      },
      {
        question: "9. How are changes to Dev160 environment categorized in terms of work items?",
        options: ["All changes require a FixVersion for deployment", "Config changes require a FixVersion, but code changes do not", "Config changes are unique to Dev160 and do not require a FixVersion", "Only code changes require a FixVersion, config changes do not"],
        answer: "Config changes are unique to Dev160 and do not require a FixVersion"
      },
      {
        question: "10. What action is taken about three weeks before a planned release in terms of work item management?",
        options: ["Teams provide daily updates on the status of open items", "All work items are immediately closed", "New work items are created for the release", "The release date is postponed for further planning"],
        answer: "Teams provide daily updates on the status of open items"
      }
  ];
  
  let currentQuestionIndex = 0;
  let score = 0;
  let userName = '';
  let highestScore = 0;
  let userScores = [];
  
  const questionElement = document.getElementById('question');
  const optionsElement = document.getElementById('options');
  const resultElement = document.getElementById('result');
  const scoreElement = document.getElementById('score');
  const nextButton = document.getElementById('nextButton');
  const userNameInput = document.getElementById('userNameInput');
  const startButton = document.getElementById('startButton');
  const highestScoreElement = document.getElementById('highestScore');
  const topScoresElement = document.getElementById('topScores');
  
  function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    optionsElement.innerHTML = '';
    currentQuestion.options.forEach(option => {
      const button = document.createElement('button');
      button.textContent = option;
      button.classList.add('option');
      button.addEventListener('click', () => checkAnswer(option));
      optionsElement.appendChild(button);
    });
  }
  
  function checkAnswer(selectedOption) {
    const currentQuestion = questions[currentQuestionIndex];
    if (selectedOption === currentQuestion.answer) {
      score += 10;
      resultElement.textContent = "Correct!";
    } else {
      resultElement.textContent = "Wrong!"
    }
    scoreElement.textContent = "Score: " + score;
    disableOptions();
    nextButton.style.display = 'block';
  }
  
  function disableOptions() {
    const optionButtons = document.querySelectorAll('.option');
    optionButtons.forEach(button => {
      button.disabled = true;
    });
  }
  
  function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      loadQuestion();
      resultElement.textContent = '';
      nextButton.style.display = 'none';
    } else {
      endQuiz();
    }
  }
  
  function endQuiz() {
    if (score > highestScore) {
      highestScore = score;
      highestScoreElement.textContent = "Highest Score: " + highestScore;
    }
    userScores.push({ name: userName, score });
    userScores.sort((a, b) => b.score - a.score);
    if (userScores.length > 10) {
      userScores.pop();
    }
    localStorage.setItem('userScores', JSON.stringify(userScores));
    showTopScores();
    questionElement.textContent = "Quiz Completed!";
    optionsElement.innerHTML = '';
    resultElement.textContent = '';
    scoreElement.textContent = "Final Score: " + score;
  }
  
  function showTopScores() {
    topScoresElement.innerHTML = '<h3>Top 10 Scores:</h3>';
    userScores.forEach((user, index) => {
      const listItem = document.createElement('li');
      listItem.textContent = `${index + 1}. ${user.name}: ${user.score}`;
      topScoresElement.appendChild(listItem);
    });
  }
  
  function startQuiz() {
    userName = userNameInput.value.trim();
    if (userName === '') {
      alert('Please enter your name to start the quiz.');
      return;
    }
    currentQuestionIndex = 0;
    score = 0;
    loadQuestion();
    scoreElement.textContent = "Score: " + score;
  }
  
  function resetQuiz() {
    userNameInput.value = '';
    userName = '';
    score = 0;
    currentQuestionIndex = 0;
    loadQuestion();
    resultElement.textContent = '';
    scoreElement.textContent = "Score: " + score;
  }
  
  // Load userScores from localStorage if available
  const storedScores = localStorage.getItem('userScores');
  if (storedScores) {
    userScores = JSON.parse(storedScores);
    showTopScores();
  }
  
  startButton.addEventListener('click', startQuiz);
  nextButton.addEventListener('click', nextQuestion);
  