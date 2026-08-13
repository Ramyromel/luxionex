import { decisionEngine } from "@/core/engine/DecisionEngine";
import { executiveAgent } from "@/core/agents/executive";

export async function POST(req: Request) {
  const body = await req.json();

  const decision = decisionEngine.decide(body);

  if (!decision.allowed) {
    return Response.json(decision);
  }

  const result = await executiveAgent.execute(
    decision.route,
    body.payload
  );

  return Response.json({
    decision,
    result,
  });
}
