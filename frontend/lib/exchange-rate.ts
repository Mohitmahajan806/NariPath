/** ExchangeRate-API v6 — codes list (supported currencies). */
export const CURRENCY_URL_SYMBOL = 'https://v6.exchangerate-api.com/v6/9f2ea7ef5458ee383c22de3f/codes';

/** Base URL for pair conversion; append `/${from}/${to}/${amount}`. */
export const BASE_CONVERSION_URL = 'https://v6.exchangerate-api.com/v6/9f2ea7ef5458ee383c22de3f/pair';

export type CurrencyOption = { code: string; name: string };

type CodesResponse = {
  result: string;
  supported_codes?: [string, string][];
  'error-type'?: string;
};

type PairResponse = {
  result: string;
  base_code?: string;
  target_code?: string;
  conversion_rate?: number;
  conversion_result?: number;
  time_last_update_utc?: string;
  'error-type'?: string;
};

export async function fetchSupportedCurrencyCodes(): Promise<CurrencyOption[]> {
  const res = await fetch(CURRENCY_URL_SYMBOL);
  const data = (await res.json()) as CodesResponse;
  if (!res.ok || data.result !== 'success' || !data.supported_codes) {
    throw new Error(data['error-type'] ?? 'Could not load currency list');
  }
  return data.supported_codes.map(([code, name]) => ({ code, name }));
}

export async function fetchPairConversion(amount: number, from: string, to: string): Promise<PairResponse> {
  const fromC = from.trim().toUpperCase();
  const toC = to.trim().toUpperCase();
  const url = `${BASE_CONVERSION_URL}/${encodeURIComponent(fromC)}/${encodeURIComponent(toC)}/${encodeURIComponent(String(amount))}`;
  const res = await fetch(url);
  const data = (await res.json()) as PairResponse;
  if (!res.ok || data.result !== 'success') {
    throw new Error(data['error-type'] ?? 'Conversion failed');
  }
  return data;
}
