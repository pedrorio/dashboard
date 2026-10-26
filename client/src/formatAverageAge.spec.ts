import { formatAverageAge } from "./formatAverageAge";

describe("formatAverageAge", () => {
  it("shows years and a whole number of months", () => {
    expect(formatAverageAge("34.25")).toBe("34 years 3 months");
    expect(formatAverageAge("32.6667")).toBe("32 years 8 months");
    expect(formatAverageAge("37.0")).toBe("37 years");
    expect(formatAverageAge("49.5")).toBe("49 years 6 months");
  });

  it("uses the singular for one year or one month", () => {
    expect(formatAverageAge("1")).toBe("1 year");
    expect(formatAverageAge(String(1 / 12))).toBe("1 month");
    expect(formatAverageAge(String(13 / 12))).toBe("1 year 1 month");
  });
});
