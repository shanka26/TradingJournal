import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export const runtime = "nodejs";
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

const tradeSchema = {
  type: "object",
  additionalProperties: false,
  required: ["instrument","side","quantity","price"],
  properties: {
    source: { type: "string" },
    instrument: {
      type: "object",
      required: ["symbol","assetType"],
      properties: {
        symbol: { type: "string" },
        assetType: { type: "string", enum: ["EQUITY","OPTION"] },
        option: {
          type: "object",
          nullable: true,
          properties: {
            right: { type: "string", enum: ["CALL","PUT"] },
            strike: { type: "number" },
            expiration: { type: "string" },
            contracts: { type: "number" }
          }
        }
      }
    },
    side: { type: "string", enum: ["BUY","SELL","LONG","SHORT","ASSIGN","EXERCISE"] },
    quantity: { type: "number" },
    price: { type: "number" },
    fees: { type: "number", nullable: true },
    executedAt: { type: "string", nullable: true },
    notes: { type: "string", nullable: true },
    confidence: { type: "number" }
  }
} as const;

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData();
    const file = form.get("image") as File | null;
    if (!file) return NextResponse.json({ error: "No file" }, { status: 400 });

    const bytes = Buffer.from(await file.arrayBuffer());
    const b64 = bytes.toString("base64");
    const dataUrl = `data:${file.type};base64,${b64}`;

    const prompt = `Extract ONE trade from this trading-app screenshot. Prefer on-screen values. Return valid JSON per schema. Leave unknowns null. Include confidence 0..1.`;

    const resp = await client.responses.create({
      model: "gpt-4o",
      input: [
        { role: "system", content: "You convert trade screenshots into structured JSON." },
        { role: "user", content: [
          { type: "input_text", text: prompt },
          { type: "input_image", image_url: dataUrl }
        ]}
      ],
      response_format: { type: "json_schema", json_schema: { name: "Trade", schema: tradeSchema } }
    });

    const jsonText = (resp as any).output_text ?? (resp as any).output?.[0]?.content?.[0]?.text;
    const trade = JSON.parse(jsonText);
    const needsReview = (trade.confidence ?? 0) < 0.75 || !trade?.instrument?.symbol;

    return NextResponse.json({ trade, needsReview }, { status: 200 });
  } catch (e: any) {
    return NextResponse.json({ error: e.message ?? "Failed" }, { status: 500 });
  }
}
