import { Input } from "@/components/ui/input";
import { BookOpen, Loader2, Search } from "lucide-react";
import { motion } from "motion/react";
import { useMemo, useState } from "react";
import { useGlossary } from "../hooks/useQueries";

export default function GlossaryPage() {
  const { data: terms, isLoading } = useGlossary();
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    if (!terms) return {};
    const q = search.toLowerCase();
    const matches = terms.filter(
      (t) =>
        t.term.toLowerCase().includes(q) ||
        t.definition.toLowerCase().includes(q),
    );
    // Group alphabetically
    const grouped: Record<string, typeof terms> = {};
    for (const t of matches.sort((a, b) => a.term.localeCompare(b.term))) {
      const letter = t.term[0].toUpperCase();
      if (!grouped[letter]) grouped[letter] = [];
      grouped[letter].push(t);
    }
    return grouped;
  }, [terms, search]);

  const letters = Object.keys(filtered).sort();

  return (
    <div className="bg-background min-h-screen">
      {/* Header */}
      <section className="bg-primary py-14">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold text-white mb-2">
              Investment Glossary
            </h1>
            <p className="text-white/75 mb-6">
              Plain-English definitions of financial terms you'll encounter
            </p>
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                className="pl-10 bg-white border-0"
                placeholder="Search terms..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                data-ocid="glossary.search_input"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Terms */}
      <section className="container mx-auto px-4 py-12 max-w-3xl">
        {isLoading ? (
          <div
            className="flex items-center justify-center py-24"
            data-ocid="glossary.loading_state"
          >
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : letters.length === 0 ? (
          <div className="text-center py-24" data-ocid="glossary.empty_state">
            <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">
              {search
                ? `No terms found for "${search}"`
                : "No glossary terms available yet."}
            </p>
          </div>
        ) : (
          <div className="space-y-10">
            {letters.map((letter) => (
              <motion.div
                key={letter}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
              >
                <h2 className="text-2xl font-bold text-primary mb-4 border-b border-border pb-2">
                  {letter}
                </h2>
                <div className="space-y-3">
                  {filtered[letter].map((term, i) => (
                    <div
                      key={term.term}
                      className="bg-card rounded-xl p-5 shadow-xs border border-border"
                      data-ocid={`glossary.item.${i + 1}`}
                    >
                      <h3 className="font-semibold text-foreground mb-1">
                        {term.term}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {term.definition}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
