import { NextRequest, NextResponse } from "next/server";
// import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status"); // "open" | null

    // TODO: replace with real DB queries
    // const trades = await prisma.trade.findMany({ ... });
    // const openTrades = await prisma.trade.findMany({ where: { isOpen: true } });

    const mockTrades: any[] = [];     // replace later
    const mockOpen: any[] = [];       // replace later

    if (status === "open") {
      return NextResponse.json({ openTrades: mockOpen }, { status: 200 });
    }
    return NextResponse.json({ trades: mockTrades }, { status: 200 });
  } catch (e: any) {
    return NextResponse.json({ error: e.message ?? "Failed" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { trade } = await req.json();

    // const saved = await prisma.trade.create({ data: mapTradeToDb(trade) });
    const saved = { id: crypto.randomUUID(), ...trade, createdAt: new Date().toISOString() }; // mock

    return NextResponse.json({ trade: saved }, { status: 200 });
  } catch (e: any) {
    return NextResponse.json({ error: e.message ?? "Failed" }, { status: 500 });
  }
}
