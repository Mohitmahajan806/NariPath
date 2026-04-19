'use client';

import { useEffect, useState, type FormEvent } from 'react';
import {
  fetchPairConversion,
  fetchSupportedCurrencyCodes,
  type CurrencyOption,
} from '@/lib/exchange-rate';

const FALLBACK_CODES: CurrencyOption[] = [
  { code: 'USD', name: 'United States Dollar' },
  { code: 'EUR', name: 'Euro' },
  { code: 'INR', name: 'Indian Rupee' },
  { code: 'GBP', name: 'Pound Sterling' },
];

export function CurrencyConverter() {
  const [codes, setCodes] = useState<CurrencyOption[]>(FALLBACK_CODES);
  const [codesLoading, setCodesLoading] = useState(true);
  const [codesError, setCodesError] = useState<string | null>(null);

  const [amount, setAmount] = useState(100);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [result, setResult] = useState<string | null>(null);
  const [meta, setMeta] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setCodesLoading(true);
      setCodesError(null);
      try {
        const list = await fetchSupportedCurrencyCodes();
        if (!cancelled) {
          setCodes(list);
        }
      } catch (e) {
        if (!cancelled) {
          setCodesError((e as Error).message);
          setCodes(FALLBACK_CODES);
        }
      } finally {
        if (!cancelled) {
          setCodesLoading(false);
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  async function handleConvert(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setMeta(null);

    const amt = Number(amount);
    if (!Number.isFinite(amt) || amt <= 0) {
      setError('Enter a positive amount.');
      setLoading(false);
      return;
    }

    try {
      if (fromCurrency === toCurrency) {
        setResult(`${amt} ${toCurrency}`);
        setMeta('Same currency — no conversion applied.');
        return;
      }
      const data = await fetchPairConversion(amt, fromCurrency, toCurrency);
      const converted = data.conversion_result;
      if (converted === undefined) {
        throw new Error('Unexpected API response');
      }
      setResult(`${converted} ${toCurrency}`);
      const rate = data.conversion_rate;
      const updated = data.time_last_update_utc;
      const parts: string[] = [];
      if (rate !== undefined) {
        parts.push(`Rate: 1 ${fromCurrency} = ${rate} ${toCurrency}`);
      }
      if (updated) {
        parts.push(`Rates as of ${updated}`);
      }
      setMeta(parts.length ? parts.join(' · ') : null);
    } catch (err) {
      setError((err as Error).message);
      setResult(null);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="currency" className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-soft">
      <div className="mb-6">
        <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Currency converter</p>
        <h2 className="mt-3 text-3xl font-semibold text-slate-900">Smart travel budgeting</h2>
        <p className="mt-2 text-sm text-slate-500">Live rates from ExchangeRate-API (pair conversion).</p>
      </div>

      {codesError ? (
        <p className="mb-4 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          Currency list fallback: {codesError}
        </p>
      ) : null}

      <form className="space-y-4" onSubmit={handleConvert}>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="block space-y-2">
            <span className="text-sm font-medium text-slate-700">From</span>
            <select
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
              disabled={codesLoading}
              className="w-full rounded-3xl border border-slate-200 bg-slate-50 p-4 text-slate-900 outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 disabled:opacity-60"
            >
              {codes.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.code} — {c.name}
                </option>
              ))}
            </select>
          </label>
          <label className="block space-y-2">
            <span className="text-sm font-medium text-slate-700">To</span>
            <select
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
              disabled={codesLoading}
              className="w-full rounded-3xl border border-slate-200 bg-slate-50 p-4 text-slate-900 outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 disabled:opacity-60"
            >
              {codes.map((c) => (
                <option key={`to-${c.code}`} value={c.code}>
                  {c.code} — {c.name}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
          <label className="block min-w-0 flex-1 space-y-2">
            <span className="text-sm font-medium text-slate-700">Amount</span>
            <input
              type="number"
              min={0.00000001}
              step="any"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full rounded-3xl border border-slate-200 bg-slate-50 p-4 text-slate-900 outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
            />
          </label>
          <button
            type="submit"
            className="shrink-0 rounded-3xl bg-slate-900 px-8 py-4 font-semibold text-white transition hover:bg-slate-800 disabled:opacity-60"
            disabled={loading || codesLoading}
          >
            {loading ? 'Converting…' : 'Convert'}
          </button>
        </div>
      </form>

      {error ? <p className="mt-4 text-sm text-red-600">{error}</p> : null}
      {result ? (
        <div className="mt-6 space-y-2 rounded-3xl bg-slate-50 p-5 text-slate-800 shadow-sm">
          <p className="text-lg font-semibold text-slate-900">{result}</p>
          {meta ? <p className="text-sm text-slate-600">{meta}</p> : null}
        </div>
      ) : null}
    </section>
  );
}
