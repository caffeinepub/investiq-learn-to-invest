# InvestIQ - Learn to Invest

## Current State
New project. No existing application files beyond scaffolding.

## Requested Changes (Diff)

### Add
- Learning modules covering: What is Investing, Share Market basics, Mutual Funds, SIP (Systematic Investment Plan), Risk & Returns, Portfolio building, Tax basics on investments
- Each module contains: intro text, key concepts, real-world examples
- Quizzes per module (MCQ) with score tracking
- SIP Calculator: user inputs monthly amount, duration, expected return rate → shows maturity value and wealth gain
- Lumpsum Calculator: one-time investment projection
- User progress tracking: which modules completed, quiz scores
- Glossary of investment terms
- Dashboard: progress overview, recommended next module, calculator shortcuts

### Modify
- N/A (new project)

### Remove
- N/A

## Implementation Plan
1. Backend: Store modules (title, content, lessons), quiz questions with answers, user progress records, glossary terms
2. Backend APIs: getModules, getModuleById, getQuizQuestions, submitQuizAnswer, getUserProgress, updateProgress, getGlossary
3. Frontend: Landing/hero page, module list, module detail reader, quiz interface, SIP/Lumpsum calculators, glossary, user dashboard
4. Navigation: Home, Learn (modules), Calculators, Glossary
