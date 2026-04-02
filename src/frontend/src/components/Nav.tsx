import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { Menu, TrendingUp, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

export default function Nav() {
  const [open, setOpen] = useState(false);

  const links = [
    { label: "Home", to: "/" },
    { label: "Learn", to: "/learn" },
    { label: "Calculators", to: "/calculators" },
    { label: "Glossary", to: "/glossary" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-card border-b border-border shadow-xs">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2 font-bold text-xl text-foreground"
          data-ocid="nav.link"
        >
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <TrendingUp className="w-4 h-4 text-primary-foreground" />
          </div>
          <span>InvestIQ</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              activeProps={{ className: "text-primary font-semibold" }}
              data-ocid="nav.link"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Button asChild size="sm" data-ocid="nav.primary_button">
            <Link to="/learn">Start Learning</Link>
          </Button>
        </div>

        <button
          type="button"
          className="md:hidden p-2 rounded-md text-foreground"
          onClick={() => setOpen((v) => !v)}
          data-ocid="nav.toggle"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden bg-card border-b border-border"
          >
            <nav className="container mx-auto px-4 py-4 flex flex-col gap-3">
              {links.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  className="text-sm font-medium py-2 text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => setOpen(false)}
                  data-ocid="nav.link"
                >
                  {l.label}
                </Link>
              ))}
              <Button
                asChild
                size="sm"
                className="mt-2"
                data-ocid="nav.primary_button"
              >
                <Link to="/learn" onClick={() => setOpen(false)}>
                  Start Learning
                </Link>
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
