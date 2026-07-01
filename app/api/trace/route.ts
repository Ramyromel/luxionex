const traceBuffer: any[] = [];

export async function POST(req: Request) {
  const data = await req.json();

  traceBuffer.push({
    id: crypto.randomUUID(),
    ...data,
    timestamp: Date.now(),
  });

  return Response.json({ ok: true });
}

export async function GET() {
  return Response.json(traceBuffer);
}
