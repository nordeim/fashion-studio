import { describe, expect, it } from "vitest";
import { EMAIL_MAX_LENGTH, parseEmail } from "./subscribe";

describe("parseEmail", () => {
  it("accepts a normal address", () => {
    expect(parseEmail("studio@moda.studio")).toEqual({ ok: true, email: "studio@moda.studio" });
  });

  it("trims surrounding whitespace and lower-cases", () => {
    expect(parseEmail("  Studio@Moda.Studio  ")).toEqual({ ok: true, email: "studio@moda.studio" });
  });

  it("accepts plus-addressing and hyphenated domains", () => {
    expect(parseEmail("first.last+news@mail.example.com")).toEqual({
      ok: true,
      email: "first.last+news@mail.example.com",
    });
  });

  it("rejects non-string input", () => {
    expect(parseEmail(undefined).ok).toBe(false);
    expect(parseEmail(null).ok).toBe(false);
    expect(parseEmail(42).ok).toBe(false);
  });

  it("rejects an empty string or whitespace-only input", () => {
    expect(parseEmail("").ok).toBe(false);
    expect(parseEmail("   ").ok).toBe(false);
  });

  it("rejects a missing @ or domain", () => {
    expect(parseEmail("studimoda.studio").ok).toBe(false);
    expect(parseEmail("studio@").ok).toBe(false);
  });

  it("rejects a missing TLD dot", () => {
    expect(parseEmail("studio@moda").ok).toBe(false);
  });

  it("rejects internal whitespace", () => {
    expect(parseEmail("stu dio@moda.studio").ok).toBe(false);
  });

  it("rejects multiple @ signs", () => {
    expect(parseEmail("a@b@c.com").ok).toBe(false);
  });

  it("rejects input longer than the RFC-bounded maximum", () => {
    const local = "a".repeat(EMAIL_MAX_LENGTH);
    expect(parseEmail(`${local}@moda.studio`).ok).toBe(false);
  });
});
