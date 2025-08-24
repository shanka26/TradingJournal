export type AssetType = "EQUITY" | "OPTION";
export type Side = "BUY" | "SELL" | "LONG" | "SHORT" | "ASSIGN" | "EXERCISE";

export interface TradePayload {
  source?: string | null;
  instrument: {
    symbol: string;
    assetType: AssetType;
    option?: {
      right?: "CALL" | "PUT" | null;
      strike?: number | null;
      expiration?: string | null; // YYYY-MM-DD
      contracts?: number | null;
    } | null;
  };
  side: Side;
  quantity: number;
  price: number;
  fees?: number | null;
  executedAt?: string | null; // ISO date-time
  notes?: string | null;
  confidence?: number | null;
}




export async function processTradeImage(file: File) {
  const body = new FormData();
  body.append("image", file);
  const res = await fetch("/api/trades/ingest", { method: "POST", body });
  if (!res.ok) throw new Error(await res.text());
  const data = await res.json();
  return { extractedData: data.trade, trade: data.trade, needsReview: data.needsReview };
}

export async function saveTrade(trade: any) {
  const res = await fetch("/api/trades", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ trade }),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function getTrades() {
  const r = await fetch("/api/trades");
  if (!r.ok) throw new Error(await r.text());
  return r.json(); // { trades: [...] }
}

export async function getOpenTrades() {
  const r = await fetch("/api/trades?status=open");
  if (!r.ok) throw new Error(await r.text());
  return r.json(); // { openTrades: [...] }
}
