import { cn } from "./utils";

describe("cn utility", () => {
  it("should merge basic tailwind classes", () => {
    expect(cn("bg-red-500", "text-white")).toBe("bg-red-500 text-white");
  });

  it("should handle conditional classes", () => {
    const isTrue = true;
    const isFalse = false;
    expect(cn("p-4", isTrue && "m-4", isFalse && "text-black")).toBe("p-4 m-4");
  });

  it("should merge conflicting tailwind classes correctly (tail overrides head)", () => {
    // tailwind-merge should resolve conflicting padding values, keeping only the latter
    expect(cn("p-4", "p-8")).toBe("p-8");
    expect(cn("flex text-red-500", "text-blue-500")).toBe("flex text-blue-500");
  });

  it("should ignore falsy values (null, undefined, false, 0, empty string)", () => {
    expect(cn("mt-2", null, undefined, false, 0, "", "mb-2")).toBe("mt-2 mb-2");
  });

  it("should handle arrays of classes", () => {
    expect(cn(["w-full", "h-full"], "flex")).toBe("w-full h-full flex");
  });

  it("should handle objects with boolean values", () => {
    expect(
      cn("base-class", { "active-class": true, "hidden-class": false }),
    ).toBe("base-class active-class");
  });
});
