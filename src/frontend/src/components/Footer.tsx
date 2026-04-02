import { Link } from "@tanstack/react-router";
import { TrendingUp } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();
  const utmLink = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`;

  return (
    <footer className="bg-foreground text-primary-foreground mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-xl">InvestIQ</span>
            </div>
            <p className="text-sm opacity-70 leading-relaxed max-w-xs">
              Learn investing from scratch. Master SIP, mutual funds, the stock
              market, and portfolio building — step by step.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider opacity-60">
              Learn
            </h4>
            <ul className="space-y-2 text-sm opacity-70">
              <li>
                <Link
                  to="/learn"
                  className="hover:opacity-100 transition-opacity"
                >
                  All Modules
                </Link>
              </li>
              <li>
                <Link
                  to="/glossary"
                  className="hover:opacity-100 transition-opacity"
                >
                  Glossary
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider opacity-60">
              Tools
            </h4>
            <ul className="space-y-2 text-sm opacity-70">
              <li>
                <Link
                  to="/calculators"
                  className="hover:opacity-100 transition-opacity"
                >
                  SIP Calculator
                </Link>
              </li>
              <li>
                <Link
                  to="/calculators"
                  className="hover:opacity-100 transition-opacity"
                >
                  Lumpsum Calculator
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 text-sm opacity-50 text-center">
          © {year}. Built with ❤️ using{" "}
          <a
            href={utmLink}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:opacity-100"
          >
            caffeine.ai
          </a>
        </div>
      </div>
    </footer>
  );
}
