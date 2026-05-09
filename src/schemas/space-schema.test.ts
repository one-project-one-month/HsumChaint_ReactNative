import { type SpaceSchema, spaceSchema } from "./space-schema";

const validSpace = (overrides: Partial<SpaceSchema> = {}): SpaceSchema => ({
  name: "Some monastery",
  address: "Somewhere",
  email: "test@example.com",
  phones: [{ value: "09123456789" }],
  ...overrides,
});

describe("spaceSchema", () => {
  it("accepts a valid space", () => {
    const result = spaceSchema.safeParse(validSpace());
    expect(result.success).toBe(true);
  });

  it("requires name", () => {
    const result = spaceSchema.safeParse(validSpace({ name: "" }));
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.some((i) => i.message === "Monastery name is required")).toBe(
        true,
      );
    }
  });

  it("requires address", () => {
    const result = spaceSchema.safeParse(validSpace({ address: "" }));
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.some((i) => i.message === "Address is required")).toBe(true);
    }
  });

  it("allows empty email string and undefined email", () => {
    expect(spaceSchema.safeParse(validSpace({ email: "" })).success).toBe(true);
    expect(spaceSchema.safeParse(validSpace({ email: undefined })).success).toBe(true);
  });

  it("rejects invalid email", () => {
    const result = spaceSchema.safeParse(validSpace({ email: "not-an-email" }));
    expect(result.success).toBe(false);
  });

  it("requires at least one phone", () => {
    const result = spaceSchema.safeParse(validSpace({ phones: [] }));
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.some((i) => i.message === "At least one phone number is")).toBe(
        true,
      );
    }
  });

  it("rejects more than 4 phones", () => {
    const result = spaceSchema.safeParse(
      validSpace({
        phones: [{ value: "1" }, { value: "2" }, { value: "3" }, { value: "4" }, { value: "5" }],
      }),
    );
    expect(result.success).toBe(false);
  });

  it("requires each phone value", () => {
    const result = spaceSchema.safeParse(validSpace({ phones: [{ value: "" }] }));
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.some((i) => i.message === "Phone number is required")).toBe(true);
    }
  });
});
