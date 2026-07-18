import OpenAI from "openai";

if (!process.env.OPENAI_API_KEY) console.warn("OPENAI_API_KEY is not configured. AI routes will fail until supplied.");
export const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
export const OPENAI_TEXT_MODEL = process.env.OPENAI_TEXT_MODEL ?? "gpt-5.6";
export const OPENAI_IMAGE_MODEL = process.env.OPENAI_IMAGE_MODEL ?? "gpt-image-2";
