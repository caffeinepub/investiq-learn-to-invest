import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calculator, TrendingUp } from "lucide-react";
import { motion } from "motion/react";
import { useId, useState } from "react";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { formatIndianCurrency } from "../utils/format";

function calcSIP(monthly: number, years: number, annualRate: number) {
  const r = annualRate / 12 / 100;
  const n = years * 12;
  const maturity = monthly * ((((1 + r) ** n - 1) / r) * (1 + r));
  const invested = monthly * n;
  const returns = maturity - invested;
  return { invested, returns, maturity };
}

function calcLumpsum(principal: number, years: number, annualRate: number) {
  const maturity = principal * (1 + annualRate / 100) ** years;
  const invested = principal;
  const returns = maturity - invested;
  return { invested, returns, maturity };
}

const CHART_COLORS = ["oklch(0.46 0.225 264)", "oklch(0.61 0.12 185)"];

function ResultCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-secondary/40 rounded-xl p-4 text-center">
      <p className="text-xs text-muted-foreground mb-1">{label}</p>
      <p className="text-xl font-bold text-foreground">{value}</p>
    </div>
  );
}

type ChartEntry = { name: string; value: number };

function ChartCells({ data }: { data: ChartEntry[] }) {
  return (
    <>
      {data.map((entry, i) => (
        <Cell key={entry.name} fill={CHART_COLORS[i]} />
      ))}
    </>
  );
}

function SliderField({
  label,
  value,
  min,
  max,
  step,
  display,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  display: string;
  onChange: (v: number) => void;
}) {
  const fieldId = useId();
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label
          htmlFor={fieldId}
          className="text-sm font-medium text-foreground"
        >
          {label}
        </label>
        <span className="text-sm font-semibold text-primary px-3 py-0.5 bg-primary/10 rounded-full">
          {display}
        </span>
      </div>
      <Slider
        id={fieldId}
        min={min}
        max={max}
        step={step}
        value={[value]}
        onValueChange={([v]) => onChange(v)}
        className="w-full"
      />
    </div>
  );
}

function SIPCalculator() {
  const [monthly, setMonthly] = useState(5000);
  const [years, setYears] = useState(10);
  const [rate, setRate] = useState(12);

  const { invested, returns, maturity } = calcSIP(monthly, years, rate);
  const chartData: ChartEntry[] = [
    { name: "Invested", value: Math.round(invested) },
    { name: "Returns", value: Math.round(returns) },
  ];

  return (
    <div className="grid lg:grid-cols-2 gap-8 items-start">
      <div className="space-y-6">
        <SliderField
          label="Monthly Investment"
          value={monthly}
          min={500}
          max={100000}
          step={500}
          display={formatIndianCurrency(monthly)}
          onChange={setMonthly}
        />
        <SliderField
          label="Duration"
          value={years}
          min={1}
          max={30}
          step={1}
          display={`${years} yr${years > 1 ? "s" : ""}`}
          onChange={setYears}
        />
        <SliderField
          label="Expected Annual Return"
          value={rate}
          min={1}
          max={30}
          step={0.5}
          display={`${rate}% p.a.`}
          onChange={setRate}
        />
      </div>

      <div className="space-y-4">
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={85}
              paddingAngle={3}
              dataKey="value"
            >
              <ChartCells data={chartData} />
            </Pie>
            <Tooltip formatter={(v: number) => formatIndianCurrency(v)} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>

        <div className="grid grid-cols-3 gap-3">
          <ResultCard label="Invested" value={formatIndianCurrency(invested)} />
          <ResultCard
            label="Est. Returns"
            value={formatIndianCurrency(returns)}
          />
          <ResultCard
            label="Total Value"
            value={formatIndianCurrency(maturity)}
          />
        </div>
      </div>
    </div>
  );
}

function LumpsumCalculator() {
  const [principal, setPrincipal] = useState(100000);
  const [years, setYears] = useState(10);
  const [rate, setRate] = useState(12);

  const { invested, returns, maturity } = calcLumpsum(principal, years, rate);
  const chartData: ChartEntry[] = [
    { name: "Invested", value: Math.round(invested) },
    { name: "Returns", value: Math.round(returns) },
  ];

  return (
    <div className="grid lg:grid-cols-2 gap-8 items-start">
      <div className="space-y-6">
        <SliderField
          label="Investment Amount"
          value={principal}
          min={1000}
          max={1000000}
          step={1000}
          display={formatIndianCurrency(principal)}
          onChange={setPrincipal}
        />
        <SliderField
          label="Duration"
          value={years}
          min={1}
          max={30}
          step={1}
          display={`${years} yr${years > 1 ? "s" : ""}`}
          onChange={setYears}
        />
        <SliderField
          label="Expected Annual Return"
          value={rate}
          min={1}
          max={30}
          step={0.5}
          display={`${rate}% p.a.`}
          onChange={setRate}
        />
      </div>

      <div className="space-y-4">
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={85}
              paddingAngle={3}
              dataKey="value"
            >
              <ChartCells data={chartData} />
            </Pie>
            <Tooltip formatter={(v: number) => formatIndianCurrency(v)} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>

        <div className="grid grid-cols-3 gap-3">
          <ResultCard label="Invested" value={formatIndianCurrency(invested)} />
          <ResultCard
            label="Est. Returns"
            value={formatIndianCurrency(returns)}
          />
          <ResultCard
            label="Total Value"
            value={formatIndianCurrency(maturity)}
          />
        </div>
      </div>
    </div>
  );
}

export default function CalculatorsPage() {
  return (
    <div className="bg-background min-h-screen">
      <section className="bg-primary py-14">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold text-white mb-2">
              Investment Calculators
            </h1>
            <p className="text-white/75">
              Estimate your wealth growth with realistic projections
            </p>
          </motion.div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12 max-w-4xl">
        <Tabs defaultValue="sip" data-ocid="calculators.tab">
          <TabsList className="mb-8">
            <TabsTrigger
              value="sip"
              className="flex items-center gap-2"
              data-ocid="calculators.tab"
            >
              <TrendingUp className="w-4 h-4" /> SIP Calculator
            </TabsTrigger>
            <TabsTrigger
              value="lumpsum"
              className="flex items-center gap-2"
              data-ocid="calculators.tab"
            >
              <Calculator className="w-4 h-4" /> Lumpsum Calculator
            </TabsTrigger>
          </TabsList>

          <TabsContent value="sip">
            <div className="bg-card rounded-2xl p-8 shadow-card">
              <h2 className="text-xl font-semibold text-foreground mb-2">
                SIP Calculator
              </h2>
              <p className="text-sm text-muted-foreground mb-8">
                A Systematic Investment Plan (SIP) lets you invest a fixed
                amount regularly and benefit from rupee cost averaging.
              </p>
              <SIPCalculator />
            </div>
          </TabsContent>

          <TabsContent value="lumpsum">
            <div className="bg-card rounded-2xl p-8 shadow-card">
              <h2 className="text-xl font-semibold text-foreground mb-2">
                Lumpsum Calculator
              </h2>
              <p className="text-sm text-muted-foreground mb-8">
                Calculate the future value of a one-time investment using
                compound interest.
              </p>
              <LumpsumCalculator />
            </div>
          </TabsContent>
        </Tabs>

        <div className="grid sm:grid-cols-2 gap-6 mt-8">
          <div className="bg-secondary/40 rounded-2xl p-6">
            <h3 className="font-semibold text-foreground mb-2">
              💡 What is SIP?
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              SIP stands for Systematic Investment Plan. You invest a fixed sum
              monthly into mutual funds. It leverages{" "}
              <strong>rupee cost averaging</strong> and{" "}
              <strong>compounding</strong> to build wealth over time.
            </p>
          </div>
          <div className="bg-secondary/40 rounded-2xl p-6">
            <h3 className="font-semibold text-foreground mb-2">
              📈 Power of Compounding
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Starting early and staying invested longer dramatically increases
              your returns. Even small monthly amounts grow into significant
              wealth over 15–20 years.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
