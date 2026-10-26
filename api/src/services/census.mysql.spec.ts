import * as fs from "fs";
import * as path from "path";
import { columnNames, data, pool, remainingTotalCount, remainingUniqueValuesCount } from "./census";

const seedPath = path.join(__dirname, "../../../db/seed.sql");

async function ensureSeed() {
    const [existing] = await pool.query(
        "SELECT table_name FROM information_schema.tables " +
        "WHERE table_schema = DATABASE() AND table_name = 'census_learn_sql'",
    );
    if ((existing as Array<{}>).length > 0) {
        return;
    }
    const sql = fs.readFileSync(seedPath, "utf8");
    const statements = sql.split(";").map((part) => part.trim()).filter((part) => part.length > 0);
    for (const statement of statements) {
        await pool.query(statement);
    }
}

describe("census queries on the configured database", () => {
    beforeAll(async () => {
        await ensureSeed();
    });

    afterAll(async () => {
        await pool.end();
    });

    it("returns lowercase column_name for the seeded table", async () => {
        const result = await columnNames();
        expect(result.status).toBe(200);
        const names = (result.success as Array<{ column_name: string }>)
            .map((row) => row.column_name)
            .sort();
        expect(names).toEqual(["age", "education", "sex"]);
    });

    it("groups education with a count and an average age", async () => {
        const result = await data("education");
        expect(result.status).toBe(200);
        const rows = result.success as Array<{ education: string; counter: number; average: string }>;
        const hsGrad = rows.find((row) => row.education === "HS-grad");
        expect(hsGrad).toBeDefined();
        expect(hsGrad.counter).toBe(8);
        expect(hsGrad.average).toBe("34.2500");
    });

    it("runs the remaining-count queries", async () => {
        const total = await remainingTotalCount("education");
        const unique = await remainingUniqueValuesCount("education");
        expect(total.status).toBe(200);
        expect(unique.status).toBe(200);
        expect(total.success).toHaveLength(1);
        expect(unique.success).toHaveLength(1);
    });
});
