import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BarChart2,
  BookOpen,
  Calculator,
  CheckCircle2,
  Layers,
  Shield,
  Star,
  TrendingUp,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";

const featureCards = [
  {
    icon: TrendingUp,
    title: "Stock Market",
    desc: "Understand how equity markets work, what drives prices, and how to read market signals.",
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    icon: Layers,
    title: "Mutual Funds",
    desc: "Learn about different fund categories, NAV, expense ratio, and how to pick the right fund.",
    color: "text-teal-600",
    bg: "bg-teal-50",
  },
  {
    icon: Calculator,
    title: "SIP Investing",
    desc: "Master Systematic Investment Plans: the power of compounding, rupee cost averaging, and more.",
    color: "text-purple-600",
    bg: "bg-purple-50",
  },
  {
    icon: BarChart2,
    title: "Portfolio Building",
    desc: "Create a diversified portfolio, manage risk, and track your investments over time.",
    color: "text-amber-600",
    bg: "bg-amber-50",
  },
];

const steps = [
  {
    icon: BookOpen,
    step: "01",
    title: "Pick a Module",
    desc: "Choose from beginner to advanced topics",
  },
  {
    icon: Zap,
    step: "02",
    title: "Read Lessons",
    desc: "Bite-sized lessons you can complete in 10 minutes",
  },
  {
    icon: Star,
    step: "03",
    title: "Take a Quiz",
    desc: "Test your knowledge with interactive questions",
  },
  {
    icon: Shield,
    step: "04",
    title: "Track Progress",
    desc: "Watch your learning journey grow",
  },
];

const featuredModules = [
  {
    id: 1,
    title: "Introduction to Investing",
    desc: "Why invest? Beating inflation, financial goals, and the basics of wealth creation.",
    difficulty: "Beginner",
    lessons: 5,
  },
  {
    id: 2,
    title: "Understanding SIP",
    desc: "Systematic Investment Plans — how they work, benefits, and how to start one today.",
    difficulty: "Beginner",
    lessons: 6,
  },
  {
    id: 3,
    title: "Stock Market Fundamentals",
    desc: "How stocks are traded, key indices like NIFTY & SENSEX, and reading a stock chart.",
    difficulty: "Intermediate",
    lessons: 8,
  },
];

const difficultyColor: Record<string, string> = {
  Beginner: "bg-green-100 text-green-700",
  Intermediate: "bg-orange-100 text-orange-700",
  Advanced: "bg-red-100 text-red-700",
};

export default function HomePage() {
  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden bg-background">
        <div className="container mx-auto px-4 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="mb-4 bg-secondary text-accent-foreground border-0 font-medium">
                🚀 Learn Investing for Free
              </Badge>
              <h1 className="text-5xl lg:text-6xl font-extrabold text-foreground leading-tight mb-6">
                Learn Investing{" "}
                <span className="text-primary">from Scratch</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-lg">
                From understanding why you should invest to building a
                diversified portfolio — InvestIQ guides you through every step
                with clear lessons, quizzes, and real calculators.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  asChild
                  size="lg"
                  className="text-base"
                  data-ocid="hero.primary_button"
                >
                  <Link to="/learn">
                    Start Learning <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="text-base"
                  data-ocid="hero.secondary_button"
                >
                  <Link to="/calculators">Try SIP Calculator</Link>
                </Button>
              </div>
            </motion.div>

            {/* Right teal panel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="relative"
            >
              <div
                className="rounded-2xl overflow-hidden"
                style={{ background: "oklch(0.61 0.12 185)" }}
              >
                <img
                  src="/assets/generated/hero-invest.dim_600x500.png"
                  alt="Investment growth"
                  className="w-full object-cover mix-blend-multiply opacity-90"
                />
                {/* Floating stat cards */}
                <div className="absolute inset-0 flex flex-col justify-between p-6 pointer-events-none">
                  <div className="flex justify-end">
                    <div className="bg-white rounded-xl shadow-card px-4 py-3">
                      <p className="text-2xl font-bold text-foreground">7</p>
                      <p className="text-xs text-muted-foreground">Modules</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-end">
                    <div className="bg-white rounded-xl shadow-card px-4 py-3">
                      <p className="text-2xl font-bold text-foreground">20+</p>
                      <p className="text-xs text-muted-foreground">
                        Glossary Terms
                      </p>
                    </div>
                    <div className="bg-white rounded-xl shadow-card px-4 py-3">
                      <p className="text-2xl font-bold text-foreground">Free</p>
                      <p className="text-xs text-muted-foreground">Quizzes</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* WHAT YOU'LL LEARN */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-foreground mb-3">
              What You'll Learn
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Structured curriculum covering all aspects of personal finance and
              investing.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featureCards.map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-card rounded-2xl p-6 shadow-card hover:shadow-hover transition-shadow"
              >
                <div
                  className={`w-12 h-12 rounded-xl ${card.bg} flex items-center justify-center mb-4`}
                >
                  <card.icon className={`w-6 h-6 ${card.color}`} />
                </div>
                <h3 className="font-semibold text-foreground mb-2">
                  {card.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {card.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-foreground mb-3">
              How It Works
            </h2>
            <p className="text-muted-foreground">
              Four simple steps to financial literacy
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((s, i) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="text-center"
              >
                <div className="relative inline-flex mb-4">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <s.icon className="w-7 h-7 text-primary" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
                    {s.step}
                  </span>
                </div>
                <h3 className="font-semibold text-foreground mb-1">
                  {s.title}
                </h3>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED MODULES */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-10 gap-4">
            <div>
              <h2 className="text-3xl font-bold text-foreground">
                Featured Modules
              </h2>
              <p className="text-muted-foreground mt-1">
                Handpicked to get you started fast
              </p>
            </div>
            <Button asChild variant="outline" data-ocid="home.secondary_button">
              <Link to="/learn">
                View All <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredModules.map((m, i) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <Link to="/learn" className="block">
                  <div className="bg-card rounded-2xl p-6 shadow-card hover:shadow-hover transition-shadow h-full">
                    <div className="flex items-start justify-between mb-4">
                      <span
                        className={`text-xs font-semibold px-2.5 py-1 rounded-full ${difficultyColor[m.difficulty]}`}
                      >
                        {m.difficulty}
                      </span>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <BookOpen className="w-3 h-3" /> {m.lessons} lessons
                      </span>
                    </div>
                    <h3 className="font-semibold text-lg text-foreground mb-2">
                      {m.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                      {m.desc}
                    </p>
                    <div className="flex items-center text-primary text-sm font-medium">
                      Start Module <ArrowRight className="ml-1 w-4 h-4" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Start Your Investment Journey?
            </h2>
            <p className="text-white/80 mb-8 max-w-md mx-auto">
              Free, structured, and beginner-friendly. No finance degree
              required.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                asChild
                size="lg"
                variant="secondary"
                data-ocid="cta.primary_button"
              >
                <Link to="/learn">
                  Get Started Free <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-primary"
                data-ocid="cta.secondary_button"
              >
                <Link to="/calculators">Try Calculators</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
