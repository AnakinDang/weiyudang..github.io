import { readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const siteI18nPath = fileURLToPath(new URL("../lib/site-i18n.ts", import.meta.url));
const siteI18n = readFileSync(siteI18nPath, "utf8");
const sourceFile = ts.createSourceFile(siteI18nPath, siteI18n, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
const repoRoot = fileURLToPath(new URL("..", import.meta.url));
const publicScanRoots = ["../app", "../components"];
const manualScannedPublicComponentPaths = [
  "../app/contact/page.tsx",
  "../app/journal/page.tsx",
  "../app/lab/page.tsx",
  "../app/projects/page.tsx",
  "../components/HomeHeroClient.tsx",
  "../components/AiLabPanel.tsx",
  "../components/JournalCard.tsx",
  "../components/LocalizedText.tsx",
  "../components/SelectedWorkShowcase.tsx",
  "../components/LiveNotesFeed.tsx",
  "../components/ProjectArchive.tsx",
  "../components/LabNotesBrowser.tsx"
];

const dynamicLocalizedTextSources = {
  "../app/contact/page.tsx": ["contactLanes", "noteChecklist", "boundaryRules", "responseModes"],
  "../app/journal/page.tsx": ["journalPillars", "journalBoundary"],
  "../app/lab/page.tsx": ["labSignals", "protocolSteps", "publicResearchItems", "privateVaultItems"],
  "../app/projects/page.tsx": ["systemLanes", "boundaryStrip"]
};

const allowedDynamicLocalizedTextExpressions = {
  "../app/contact/page.tsx": ["lane.badge", "lane.title", "lane.summary", "lane.label", "item", "rule", "title", "summary"],
  "../app/journal/page.tsx": ["pillar.title", "pillar.summary", "item.title", "item.summary"],
  "../app/lab/page.tsx": ["title", "summary", "item"],
  "../app/projects/page.tsx": ["lane.title", "lane.summary", "title", "summary"]
};

const localizedObjectPropertyNames = new Set(["badge", "label", "summary", "title"]);

const requiredPublicSiteCopy = {
  home: [
    "One operating system. Four clear surfaces.",
    "Four clear Personal OS surfaces",
    "Selected systems",
    "Selected project artifacts",
    "Selected work public safety boundaries",
    "Safe to browse. Curated and sanitized.",
    "High-level overview only. Internals stay private.",
    "For research and learning. Not for execution.",
    "No prompts, accounts, orders, IDs, or paths.",
    "Personal research studio",
    "Doraemon-ready",
    "Homepage Personal OS entry path",
    "Public homepage",
    "Understand the work",
    "Doraemon Office entry",
    "See public-safe agent rhythm",
    "Owner cockpit gate",
    "Keep decisions private",
    "Enter Doraemon Office",
    "Open Personal OS map",
    "Research in public",
    "Doraemon visible",
    "Owner gated",
    "research feed",
    "drafting",
    "annotating",
    "connecting",
    "publishing",
    "Open notes",
    "Notes, projects, or a focused conversation."
  ],
  projects: [
    "Projects as artifacts.",
    "Browse the archive",
    "Public by design",
    "Projects content model",
    "Search projects",
    "Selected artifact",
    "Personal OS Core",
    "The website, Doraemon Office, owner cockpit, and research surfaces share one public/private contract.",
    "Doraemon Office",
    "A public-safe command room for agent presence, activity, schedules, knowledge, and system posture.",
    "Research Studio",
    "Public notes and build logs expose the method and evidence without exposing private source material.",
    "Trading Research",
    "Research-only market work: evidence, validation, review, and no execution path.",
    "Public story",
    "Curated pages, notes, demos, and safe summaries.",
    "Private execution",
    "Prompts, tasks, accounts, raw data, and controls stay gated.",
    "Owner review",
    "Important actions remain human-bounded and reviewable."
  ],
  tradingProject: [
    "MiniDora Trading Research",
    "A public-safe window into the research desks behind Trading MiniDora: questions, evidence, desk disagreement, replay, and owner review. It explains how thinking forms without turning the site into a trading terminal.",
    "Open read-only console",
    "Trading research disclaimer",
    "Trading research console summary",
    "Public trading research workflow preview",
    "Market context enters as research, not a trade idea.",
    "Packets name proof, blockers, and counter-evidence.",
    "Desks, method, evidence shapes, sample blockers.",
    "Evidence packets, replay, gates, source health.",
    "Accounts, orders, broker writes, private signals.",
    "Research desk, not trading terminal",
    "Public page can show",
    "Private console preview",
    "Open read-only dashboard"
  ],
  research: [
    "Research notes.",
    "Read the latest note",
    "Research protocol",
    "Public Research",
    "Private Vault",
    "Research model",
    "Search notes",
    "Public by design",
    "Share what's safe. Protect what's not.",
    "Evidence first",
    "Show the why, the how, and the limits.",
    "Linked to work",
    "Every note connects to projects and artifacts.",
    "Capture privately",
    "Raw notes, prompts, and source material stay inside the private vault.",
    "Distill safely",
    "Turn the useful idea into a principle, method, or public sketch.",
    "Attach evidence",
    "Link only public artifacts, screenshots, project pages, or durable summaries.",
    "Publish with boundary",
    "Keep the note useful without exposing accounts, paths, raw logs, or controls.",
    "Curated summaries",
    "Design sketches",
    "Concepts and methods",
    "Project links",
    "Raw notes and drafts",
    "Prompts and credentials",
    "Internal runtime and logs",
    "Account and system state"
  ],
  journal: [
    "Field notes from life outside the lab.",
    "Photography, everyday observations, places, and personal fragments. A softer shelf beside the technical work.",
    "Photography Walks",
    "Life Outside the Lab",
    "Field Observations",
    "Read entry",
    "Photography",
    "Frames, light, texture, and visual memory.",
    "Life Notes",
    "Small personal updates without turning the site into a feed.",
    "Places",
    "Travel fragments, daily walks, and field observations.",
    "Public Journal",
    "Photos, places, observations, and personal notes that are safe to share.",
    "Research Lab",
    "Experiments and system notes stay structured in the research surface.",
    "Private Work",
    "Owner tasks, prompts, raw memory, and private operations stay out of public entries."
  ],
  contact: [
    "Start with a focused note.",
    "AI agent systems",
    "Use the domain mailbox once it is configured in Cloudflare or your preferred mail provider.",
    "Public contact should stay separate from private command, trading, and credential systems.",
    "Ask Doraemon about public projects",
    "Agent systems and Doraemon",
    "Discuss Personal OS ideas, MiniDora team design, public command-room interfaces, or agent workflow architecture.",
    "Research tools and experiments",
    "Share a research question, interface problem, note, paper, dataset shape, or workflow that deserves a better tool.",
    "Projects and product surfaces",
    "Talk about a public project, prototype, dashboard, visual system, or collaboration path with clear boundaries.",
    "Writing and creative work",
    "Start from a note, photo, field observation, or media workflow that could become a small public artifact.",
    "What are you trying to understand or build?",
    "Which public project, research note, or workflow does it connect to?",
    "What artifact can you share safely: link, screenshot, sketch, repo, paper, or short context?",
    "What would make the first response useful: critique, collaboration, introduction, or a focused call?",
    "Use public summaries. Do not send private tasks, prompts, owner notes, raw logs, or internal IDs.",
    "Do not include credentials, account details, tokens, broker data, or private operational channels.",
    "Trading-related conversations stay research-only: not an order, recommendation, or execution system.",
    "Research exchange",
    "A question, paper, note, or experiment that benefits from careful reasoning.",
    "Interface collaboration",
    "A dashboard, workflow, product surface, or agent experience that needs sharper design.",
    "Long-term Personal OS",
    "A broader conversation about Doraemon, MiniDoras, and human-bounded automation."
  ]
};

function sourcePath(relativePath) {
  return fileURLToPath(new URL(relativePath, import.meta.url));
}

function relativeSourcePath(absolutePath) {
  return `../${path.relative(repoRoot, absolutePath).split(path.sep).join("/")}`;
}

function listSourceFiles(rootRelativePath) {
  const rootPath = sourcePath(rootRelativePath);
  const files = [];

  function visit(currentPath) {
    const stat = statSync(currentPath);
    if (stat.isDirectory()) {
      for (const entry of readdirSync(currentPath)) {
        visit(path.join(currentPath, entry));
      }
      return;
    }

    if (/\.[jt]sx?$/.test(currentPath)) {
      files.push(currentPath);
    }
  }

  visit(rootPath);
  return files;
}

function discoverLocalizedTextImporters() {
  const importers = [];

  for (const root of publicScanRoots) {
    for (const absolutePath of listSourceFiles(root)) {
      const source = readFileSync(absolutePath, "utf8");
      if (/from\s+["']@\/components\/LocalizedText["']/.test(source)) {
        importers.push(relativeSourcePath(absolutePath));
      }
    }
  }

  return importers;
}

const scannedPublicComponentPaths = [
  ...new Set([...manualScannedPublicComponentPaths, ...discoverLocalizedTextImporters()])
].sort();

function stringValue(node) {
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) {
    return node.text.trim();
  }

  return null;
}

function variableInitializerIn(fileSource, name) {
  let initializer = null;

  function visit(node) {
    if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name) && node.name.text === name) {
      initializer = node.initializer ?? null;
      return;
    }

    ts.forEachChild(node, visit);
  }

  visit(fileSource);
  return initializer;
}

function variableInitializer(name) {
  return variableInitializerIn(sourceFile, name);
}

function unwrapExpression(expression) {
  let current = expression;

  while (
    current &&
    (ts.isAsExpression(current) || ts.isSatisfiesExpression(current) || ts.isParenthesizedExpression(current))
  ) {
    current = current.expression;
  }

  return current;
}

function propertyNameText(name) {
  if (ts.isIdentifier(name) || ts.isStringLiteral(name) || ts.isNumericLiteral(name)) {
    return name.text;
  }

  return null;
}

function readLocalizedStringsFromExpression(expression) {
  const current = unwrapExpression(expression);
  if (!current) return [];

  if (ts.isStringLiteral(current) || ts.isNoSubstitutionTemplateLiteral(current)) {
    return [current.text.trim()].filter(Boolean);
  }

  if (ts.isArrayLiteralExpression(current)) {
    return current.elements.flatMap((element) => readLocalizedStringsFromExpression(element));
  }

  if (ts.isObjectLiteralExpression(current)) {
    return current.properties.flatMap((property) => {
      if (!ts.isPropertyAssignment(property)) return [];

      const name = propertyNameText(property.name);
      if (!name || !localizedObjectPropertyNames.has(name)) return [];

      return readLocalizedStringsFromExpression(property.initializer);
    });
  }

  return [];
}

function readDynamicLocalizedTextSourceValues() {
  const missingSources = [];
  const values = Object.entries(dynamicLocalizedTextSources).flatMap(([relativePath, variableNames]) => {
    const file = publicComponentSourceFile(relativePath);

    return variableNames.flatMap((variableName) => {
      const initializer = variableInitializerIn(file.sourceFile, variableName);
      if (!initializer) {
        missingSources.push(`${relativePath}: missing dynamic source ${variableName}`);
        return [];
      }

      return readLocalizedStringsFromExpression(initializer).map((value) => ({
        label: `${relativePath}:${variableName}: ${value}`,
        value
      }));
    });
  });

  return { missingSources, values };
}

function readExactTranslations() {
  const initializer = unwrapExpression(variableInitializer("exactZhTranslations"));
  if (!initializer || !ts.isObjectLiteralExpression(initializer)) {
    throw new Error("Could not read exactZhTranslations from lib/site-i18n.ts");
  }

  const translations = new Map();
  const duplicates = new Set();
  for (const property of initializer.properties) {
    if (!ts.isPropertyAssignment(property)) continue;

    const key = stringValue(property.name);
    const value = stringValue(property.initializer);
    if (!key) continue;

    if (translations.has(key)) {
      duplicates.add(key);
    }
    translations.set(key, value ?? "");
  }

  return { duplicates: [...duplicates], translations };
}

function readPhraseTranslations() {
  const expression = unwrapExpression(variableInitializer("phraseZhTranslations"));

  if (!expression || !ts.isArrayLiteralExpression(expression)) {
    throw new Error("Could not read phraseZhTranslations from lib/site-i18n.ts");
  }

  const translations = new Map();
  const duplicates = new Set();
  for (const item of expression.elements) {
    if (!ts.isArrayLiteralExpression(item) || item.elements.length < 2) continue;

    const key = stringValue(item.elements[0]);
    const value = stringValue(item.elements[1]);
    if (!key) continue;

    if (translations.has(key)) {
      duplicates.add(key);
    }
    translations.set(key, value ?? "");
  }

  return { duplicates: [...duplicates], translations };
}

const exact = readExactTranslations();
const phrase = readPhraseTranslations();

function hasUsableTranslationEntry(value) {
  const exactValue = exact.translations.get(value);
  if (exactValue) return true;

  const phraseValue = phrase.translations.get(value);
  return Boolean(phraseValue);
}

const missing = Object.entries(requiredPublicSiteCopy).flatMap(([surface, values]) =>
  values.filter((value) => !hasUsableTranslationEntry(value)).map((value) => `${surface}: ${value}`)
);

const dynamicLocalizedTextSourceValues = readDynamicLocalizedTextSourceValues();
const missingDynamicLocalizedTextSourceValues = dynamicLocalizedTextSourceValues.values
  .filter((item) => !hasUsableTranslationEntry(item.value))
  .map((item) => item.label);

function publicComponentSourceFile(relativePath) {
  const path = sourcePath(relativePath);
  const source = readFileSync(path, "utf8");
  return {
    path,
    relativePath,
    source,
    sourceFile: ts.createSourceFile(path, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX)
  };
}

function localizedTextImportBindings(fileSource) {
  const names = new Set();
  const namespaces = new Set();

  for (const statement of fileSource.statements) {
    if (!ts.isImportDeclaration(statement)) continue;
    if (!ts.isStringLiteral(statement.moduleSpecifier)) continue;
    if (statement.moduleSpecifier.text !== "@/components/LocalizedText") continue;

    const bindings = statement.importClause?.namedBindings;
    if (!bindings) continue;

    if (ts.isNamespaceImport(bindings)) {
      namespaces.add(bindings.name.text);
    }

    if (ts.isNamedImports(bindings)) {
      for (const element of bindings.elements) {
        if (element.propertyName?.text === "LocalizedText" || element.name.text === "LocalizedText") {
          names.add(element.name.text);
        }
      }
    }
  }

  return { names, namespaces };
}

function isLocalizedTextTag(tagName, bindings) {
  if (ts.isIdentifier(tagName)) {
    return bindings.names.has(tagName.text);
  }

  return (
    ts.isPropertyAccessExpression(tagName) &&
    ts.isIdentifier(tagName.expression) &&
    tagName.name.text === "LocalizedText" &&
    bindings.namespaces.has(tagName.expression.text)
  );
}

function readLiteralLocalizationCalls() {
  const values = [];
  const dynamicCalls = [];

  for (const file of scannedPublicComponentPaths.map(publicComponentSourceFile)) {
    const localizedTextBindings = localizedTextImportBindings(file.sourceFile);

    function visit(node) {
      if (ts.isCallExpression(node)) {
        const callee = node.expression;
        const firstArg = node.arguments[0];
        const isLocalTranslator =
          (ts.isIdentifier(callee) && callee.text === "t") ||
          (ts.isIdentifier(callee) && callee.text === "localizeSiteText");

        if (isLocalTranslator && firstArg) {
          const literal = stringValue(firstArg);
          if (literal) {
            values.push({
              label: `${file.relativePath}: ${literal}`,
              value: literal
            });
          }
        }
      }

      if (ts.isJsxSelfClosingElement(node) || ts.isJsxOpeningElement(node)) {
        const tagName = node.tagName;
        const isLocalizedText = isLocalizedTextTag(tagName, localizedTextBindings);

        if (isLocalizedText) {
          const valueAttribute = node.attributes.properties.find(
            (property) => ts.isJsxAttribute(property) && ts.isIdentifier(property.name) && property.name.text === "value"
          );

          if (valueAttribute && ts.isJsxAttribute(valueAttribute) && valueAttribute.initializer) {
            if (ts.isStringLiteral(valueAttribute.initializer)) {
              values.push({
                label: `${file.relativePath}: ${valueAttribute.initializer.text.trim()}`,
                value: valueAttribute.initializer.text.trim()
              });
            }

            if (ts.isJsxExpression(valueAttribute.initializer)) {
              const expression = valueAttribute.initializer.expression;
              const literal = expression ? stringValue(expression) : null;
              if (literal) {
                values.push({
                  label: `${file.relativePath}: ${literal}`,
                  value: literal
                });
              } else if (expression) {
                dynamicCalls.push({
                  expression: expression.getText(file.sourceFile),
                  label: `${file.relativePath}: ${expression.getText(file.sourceFile)}`,
                  relativePath: file.relativePath
                });
              }
            }
          }
        }
      }

      ts.forEachChild(node, visit);
    }

    visit(file.sourceFile);
  }

  return { dynamicCalls, values };
}

const literalLocalizationCalls = readLiteralLocalizationCalls();

const missingLiteralCalls = literalLocalizationCalls.values
  .filter((item) => !hasUsableTranslationEntry(item.value))
  .map((item) => item.label);

const unexpectedDynamicLocalizedTextCalls = literalLocalizationCalls.dynamicCalls
  .filter((item) => {
    const allowedExpressions = allowedDynamicLocalizedTextExpressions[item.relativePath] ?? [];
    return !allowedExpressions.includes(item.expression);
  })
  .map((item) => item.label);

const duplicates = [
  ...exact.duplicates.map((key) => `exactZhTranslations: ${key}`),
  ...phrase.duplicates.map((key) => `phraseZhTranslations: ${key}`)
];

if (
  missing.length > 0 ||
  missingLiteralCalls.length > 0 ||
  missingDynamicLocalizedTextSourceValues.length > 0 ||
  dynamicLocalizedTextSourceValues.missingSources.length > 0 ||
  unexpectedDynamicLocalizedTextCalls.length > 0 ||
  duplicates.length > 0
) {
  console.error("Public site i18n check failed.");
}

if (missing.length > 0) {
  console.error("Missing or empty translations:");
  for (const item of missing) {
    console.error(`- ${item}`);
  }
}

if (missingLiteralCalls.length > 0) {
  console.error("Literal localization calls without translations:");
  for (const item of missingLiteralCalls) {
    console.error(`- ${item}`);
  }
}

if (missingDynamicLocalizedTextSourceValues.length > 0) {
  console.error("Dynamic LocalizedText source values without translations:");
  for (const item of missingDynamicLocalizedTextSourceValues) {
    console.error(`- ${item}`);
  }
}

if (dynamicLocalizedTextSourceValues.missingSources.length > 0) {
  console.error("Configured dynamic LocalizedText sources missing from files:");
  for (const item of dynamicLocalizedTextSourceValues.missingSources) {
    console.error(`- ${item}`);
  }
}

if (unexpectedDynamicLocalizedTextCalls.length > 0) {
  console.error("Unexpected dynamic LocalizedText values. Use a literal value or register the expression and source array:");
  for (const item of unexpectedDynamicLocalizedTextCalls) {
    console.error(`- ${item}`);
  }
}

if (duplicates.length > 0) {
  console.error("Duplicate translation keys:");
  for (const item of duplicates) {
    console.error(`- ${item}`);
  }
}

if (
  missing.length > 0 ||
  missingLiteralCalls.length > 0 ||
  missingDynamicLocalizedTextSourceValues.length > 0 ||
  dynamicLocalizedTextSourceValues.missingSources.length > 0 ||
  unexpectedDynamicLocalizedTextCalls.length > 0 ||
  duplicates.length > 0
) {
  process.exit(1);
}

console.log(
  `Public site i18n check passed (${Object.values(requiredPublicSiteCopy).flat().length} critical strings, ${dynamicLocalizedTextSourceValues.values.length} dynamic source strings).`
);
