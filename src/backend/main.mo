import Iter "mo:core/Iter";
import Map "mo:core/Map";
import Order "mo:core/Order";
import Array "mo:core/Array";
import Text "mo:core/Text";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import Time "mo:core/Time";

actor {
  type Lesson = {
    title : Text;
    content : Text;
  };

  type Module = {
    id : Nat;
    title : Text;
    description : Text;
    difficulty : Difficulty;
    lessons : [Lesson];
    quiz : [Question];
  };

  type Question = {
    question : Text;
    options : [Text];
    correctAnswer : Nat;
  };

  type QuizResult = {
    score : Nat;
    timestamp : Int;
  };

  type UserProgress = {
    completedModules : [Nat];
    quizResults : [(Nat, QuizResult)];
  };

  type GlossaryTerm = {
    term : Text;
    definition : Text;
  };

  type Difficulty = {
    #Beginner;
    #Intermediate;
    #Advanced;
  };

  module GlossaryTerm {
    public func compare(a : GlossaryTerm, b : GlossaryTerm) : Order.Order {
      Text.compare(a.term, b.term);
    };
  };

  // Persistent storage
  let modules = Map.empty<Nat, Module>();
  let users = Map.empty<Principal, UserProgress>();
  let glossary = Map.empty<Text, GlossaryTerm>();

  // Pre-seed modules
  func createDefaultModules() {
    let defaultModules : [Module] = [
      {
        id = 1;
        title = "Introduction to Investing";
        description = "Learn the basics of investing for beginners.";
        difficulty = #Beginner;
        lessons = [
          {
            title = "What is Investing?";
            content = "Investing is putting money into assets to grow wealth over time.";
          },
          {
            title = "Types of Investments";
            content = "Stocks, bonds, real estate, and more are investment options.";
          },
        ];
        quiz = [
          {
            question = "What is the primary goal of investing?";
            options = ["Save money", "Grow wealth", "Spend less", "Avoid risk"];
            correctAnswer = 1;
          },
        ];
      },
      {
        id = 2;
        title = "Understanding Stocks";
        description = "Basics of stock market investing.";
        difficulty = #Beginner;
        lessons = [
          {
            title = "What are Stocks?";
            content = "Stocks represent ownership in a company.";
          },
        ];
        quiz = [
          {
            question = "What do stocks represent?";
            options = ["Debt", "Ownership", "Liability", "Expense"];
            correctAnswer = 1;
          },
        ];
      },
      // Add more modules (3-7) as needed
    ];

    for (mod in defaultModules.values()) {
      modules.add(mod.id, mod);
    };
  };

  // Pre-seed glossary terms
  func createDefaultGlossary() {
    let defaultTerms : [GlossaryTerm] = [
      {
        term = "Stock";
        definition = "A share representing ownership in a company.";
      },
      {
        term = "Bond";
        definition = "A fixed income instrument representing a loan made by an investor.";
      },
      {
        term = "Dividend";
        definition = "A portion of a company's earnings distributed to shareholders.";
      },
      {
        term = "Mutual Fund";
        definition = "An investment vehicle pooling money to invest in diversified assets.";
      },
    ];

    for (term in defaultTerms.values()) {
      glossary.add(term.term, term);
    };
  };

  system func preupgrade() {};
  system func postupgrade() { createDefaultModules(); createDefaultGlossary() };

  // Get all modules
  public query ({ caller }) func getModules() : async [Module] {
    modules.values().toArray();
  };

  // Get module by id
  public query ({ caller }) func getModuleById(id : Nat) : async Module {
    switch (modules.get(id)) {
      case (null) { Runtime.trap("Module not found") };
      case (?mod) { mod };
    };
  };

  // Get quiz questions for a module
  public query ({ caller }) func getQuizQuestions(moduleId : Nat) : async [Question] {
    switch (modules.get(moduleId)) {
      case (null) { Runtime.trap("Module not found") };
      case (?mod) { mod.quiz };
    };
  };

  // Submit quiz and get score
  public shared ({ caller }) func submitQuiz(moduleId : Nat, answers : [Nat]) : async {
    score : Nat;
    totalQuestions : Nat;
    percentage : Nat;
  } {
    let mod = switch (modules.get(moduleId)) {
      case (null) { Runtime.trap("Module not found") };
      case (?mod) { mod };
    };

    let totalQuestions = mod.quiz.size();
    var score = 0;

    for (i in mod.quiz.keys()) {
      if (i < answers.size() and answers[i] == mod.quiz[i].correctAnswer) {
        score += 1;
      };
    };

    // Store user result
    let currentTime = Time.now();
    let quizResult : QuizResult = {
      score;
      timestamp = currentTime;
    };

    let existingProgress = switch (users.get(caller)) {
      case (null) { { completedModules = []; quizResults = [] } };
      case (?progress) { progress };
    };

    let updatedQuizResults = Array.tabulate(
      existingProgress.quizResults.size() + 1,
      func(i) {
        if (i == existingProgress.quizResults.size()) {
          (moduleId, quizResult);
        } else { existingProgress.quizResults[i] };
      },
    );

    let updatedProgress : UserProgress = {
      completedModules = existingProgress.completedModules;
      quizResults = updatedQuizResults;
    };

    users.add(caller, updatedProgress);

    {
      score;
      totalQuestions;
      percentage = if (totalQuestions > 0) {
        (score * 100) / totalQuestions;
      } else { 0 };
    };
  };

  // Mark module as completed
  public shared ({ caller }) func markModuleCompleted(moduleId : Nat) : async Bool {
    let existingProgress = switch (users.get(caller)) {
      case (null) { { completedModules = []; quizResults = [] } };
      case (?progress) { progress };
    };

    let moduleExists = existingProgress.completedModules.find(
      func(id) { id == moduleId }
    );

    switch (moduleExists) {
      case (?_) { return false };
      case (null) {
        let updatedModules = Array.tabulate(
          existingProgress.completedModules.size() + 1,
          func(i) {
            if (i == existingProgress.completedModules.size()) {
              moduleId;
            } else { existingProgress.completedModules[i] };
          },
        );

        let updatedProgress : UserProgress = {
          completedModules = updatedModules;
          quizResults = existingProgress.quizResults;
        };

        users.add(caller, updatedProgress);
        return true;
      };
    };
  };

  // Get user progress
  public query ({ caller }) func getUserProgress() : async {
    completedModules : [Nat];
    quizResults : [(Nat, QuizResult)];
  } {
    switch (users.get(caller)) {
      case (null) {
        {
          completedModules = [];
          quizResults = [];
        };
      };
      case (?progress) {
        {
          completedModules = progress.completedModules;
          quizResults = progress.quizResults;
        };
      };
    };
  };

  // Get glossary terms
  public query ({ caller }) func getGlossary() : async [GlossaryTerm] {
    glossary.values().toArray().sort();
  };

  // Get glossary term by term text
  public query ({ caller }) func getGlossaryTerm(term : Text) : async GlossaryTerm {
    switch (glossary.get(term)) {
      case (null) { Runtime.trap("Term not found") };
      case (?glossaryTerm) { glossaryTerm };
    };
  };
};
