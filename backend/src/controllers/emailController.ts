import { Request, Response } from "express";
import { db } from "../db";
import { calculateSpamScore } from "../utils/spamChecker";
import { sendEmail } from "../utils/sendEmail";

export const send = async (req: any, res: Response) => {
  const { recipient, subject, body } = req.body;
  const user_id = req.user.id;

  const spam_score = calculateSpamScore(subject, body);
  const result = await sendEmail(recipient, subject, body);

  await db.execute(
    "INSERT INTO emails (user_id, recipient, subject, body, spam_score, delivered) VALUES (?, ?, ?, ?, ?, ?)",
    [user_id, recipient, subject, body, spam_score, result.accepted]
  );

  res.json({ spam_score, delivered: result.accepted, previewUrl: result.previewUrl });
};

export const getEmails = async (req: any, res: Response) => {
  const user_id = req.user.id;
  const email = req.user.email;
  const [rows]: any = await db.execute(
    "SELECT * FROM emails WHERE user_id=? OR recipient=? ORDER BY created_at DESC",
    [user_id, email]
  );
  res.json(rows);
};

// Staging: score a draft without sending or saving
export const scoreDraft = async (req: Request, res: Response) => {
  const { subject = "", body = "" } = (req as any).body || {};
  const spam_score = calculateSpamScore(subject, body);
  res.json({ spam_score });
};

// Staging: refine a draft to reduce spamminess (OpenAI-enabled with fallback)
export const refineDraft = async (req: Request, res: Response) => {
  const { subject = "", body = "" } = (req as any).body || {};
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    const replacements: Array<[RegExp, string]> = [
      [/\bfree\b/gi, "complimentary"],
      [/buy now/gi, "learn more"],
      [/click here/gi, "see details"],
      [/winner/gi, "selected"],
      [/cash/gi, "funds"],
    ];
    const refineLocal = (text: string) => replacements.reduce((acc, [pattern, rep]) => acc.replace(pattern, rep), text);
    const refinedSubject = refineLocal(subject).trim();
    const refinedBody = refineLocal(body).trim();
    const spam_score = calculateSpamScore(refinedSubject, refinedBody);
    return res.json({ subject: refinedSubject, body: refinedBody, spam_score, provider: "heuristic" });
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        temperature: 0.3,
        messages: [
          {
            role: "system",
            content:
              "You refine marketing emails to reduce spamminess while preserving meaning. Replace spammy phrases with neutral language. Return strictly JSON with keys subject and body, no commentary.",
          },
          {
            role: "user",
            content: `Subject: ${subject}\n\nBody:\n${body}\n\nReturn strictly JSON: {"subject":"...","body":"..."}`,
          },
        ],
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(text || `OpenAI error: ${response.status}`);
    }

    const data: any = await response.json();
    const content: string = data?.choices?.[0]?.message?.content || "";

    let refinedSubject = subject;
    let refinedBody = body;
    try {
      const parsed = JSON.parse(content);
      refinedSubject = (parsed.subject ?? subject).toString();
      refinedBody = (parsed.body ?? body).toString();
    } catch {
      refinedSubject = subject;
      refinedBody = body;
    }

    const spam_score = calculateSpamScore(refinedSubject, refinedBody);
    return res.json({ subject: refinedSubject, body: refinedBody, spam_score, provider: "openai" });
  } catch (err: any) {
    const replacements: Array<[RegExp, string]> = [
      [/\bfree\b/gi, "complimentary"],
      [/buy now/gi, "learn more"],
      [/click here/gi, "see details"],
      [/winner/gi, "selected"],
      [/cash/gi, "funds"],
    ];
    const refineLocal = (text: string) => replacements.reduce((acc, [pattern, rep]) => acc.replace(pattern, rep), text);
    const refinedSubject = refineLocal(subject).trim();
    const refinedBody = refineLocal(body).trim();
    const spam_score = calculateSpamScore(refinedSubject, refinedBody);
    return res.json({ subject: refinedSubject, body: refinedBody, spam_score, provider: "heuristic", error: err?.message });
  }
};
