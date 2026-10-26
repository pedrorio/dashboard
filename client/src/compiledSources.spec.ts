import * as fs from "fs";
import * as path from "path";

function findCompiledCopies(dir: string, found: string[]) {
  const entries = fs.readdirSync(dir);
  for (const entry of entries) {
    const full = path.join(dir, entry);
    if (fs.statSync(full).isDirectory()) {
      findCompiledCopies(full, found);
      continue;
    }
    if (!entry.endsWith(".js")) {
      continue;
    }
    const stem = entry.slice(0, -3);
    const hasTypeScript = fs.existsSync(path.join(dir, stem + ".ts"))
      || fs.existsSync(path.join(dir, stem + ".tsx"));
    if (hasTypeScript) {
      found.push(path.relative(path.resolve(__dirname, ".."), full));
    }
  }
}

describe("TypeScript sources", () => {
  it("does not keep compiled JavaScript beside TypeScript sources", () => {
    const found: string[] = [];
    findCompiledCopies(path.resolve(__dirname), found);
    expect(found).toEqual([]);
  });

  it("ignores JavaScript emitted under src and compiles into dist", () => {
    const gitignore = fs.readFileSync(path.resolve(__dirname, "../.gitignore"), "utf8");
    const tsconfig = fs.readFileSync(path.resolve(__dirname, "../tsconfig.json"), "utf8");
    expect(gitignore).toContain("src/**/*.js");
    expect(tsconfig).toContain("\"outDir\": \"./dist/\"");
    expect(tsconfig).toContain("\"rootDir\": \"./src\"");
  });
});
