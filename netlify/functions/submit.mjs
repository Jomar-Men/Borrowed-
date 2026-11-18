// Forwards website form submissions (reservations + email signups) to Airtable.
// The Airtable automation webhook URL lives in the AIRTABLE_WEBHOOK_URL env var.
const clean = (v, max = 200) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export default async (req) => {
  if (req.method !== "POST") return new Response("Method not allowed", { status: 405 });
  let body;
  try { body = await req.json(); } catch { return Response.json({ ok: false, error: "bad_json" }, { status: 400 }); }

  const type = body.type === "reservation" ? "reservation" : "signup";
  const email = clean(body.email, 120);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return Response.json({ ok: false, error: "bad_email" }, { status: 400 });
  if (clean(body.website)) return Response.json({ ok: true }); // honeypot

  const payload = {
    type,
    name: clean(body.name, 100),
    email,
    look: clean(body.look, 140),
    collection: clean(body.collection, 40),
    size: clean(body.size, 80),
    eventType: clean(body.eventType, 40),
    eventDate: clean(body.eventDate, 10),
    heardAbout: clean(body.heardAbout, 40),
    utm: clean(body.utm, 120),
    submittedAt: new Date().toISOString(),
  };

  const hook = Netlify.env.get("AIRTABLE_WEBHOOK_URL");
  if (!hook) return Response.json({ ok: false, error: "not_configured" }, { status: 500 });
  const r = await fetch(hook, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
  if (!r.ok) return Response.json({ ok: false, error: "upstream" }, { status: 502 });
  return Response.json({ ok: true });
};

export const config = { path: "/api/submit", method: "POST" };
