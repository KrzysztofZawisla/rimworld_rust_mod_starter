import prompts from "prompts";
import { mkdir } from "fs/promises";
import { existsSync } from "fs";
import { join } from "path";
import { $ } from "zx";
import { platform } from "os";
import { camelCase, startCase } from "lodash";

(async () => {
  const os: NodeJS.Platform = platform();
  if (os === "win32") {
    $.shell = "cmd";
    $.prefix = "";
  }
  const { nameOfTheMod }: { nameOfTheMod: string } = await prompts({
    type: "text",
    name: "nameOfTheMod",
    message: "What is the name of the mod?",
  });
  const { versions }: { versions: string[] } = await prompts({
    type: "multiselect",
    name: "versions",
    message: "Pick a target version",
    choices: [
      {
        title: "1.5",
        description: "Latest RimWorld version",
        value: "1.5",
      },
      { title: "1.4", value: "1.4" },
      { title: "1.3", value: "1.3" },
      { title: "1.2", value: "1.2" },
      { title: "1.1", value: "1.1" },
      { title: "1.0", value: "1.0" },
    ],
    initial: 0,
  });
  if (!existsSync(nameOfTheMod)) {
    await mkdir(nameOfTheMod);
  }
  const aboutFolder = join(nameOfTheMod, "About");
  if (!existsSync(aboutFolder)) {
    await mkdir(aboutFolder);
  }
  const foldersToCreate = versions.map(async (value) => {
    const folderPath = join(nameOfTheMod, value);
    if (!existsSync(folderPath)) {
      await mkdir(folderPath);
    }
  });
  await Promise.all(foldersToCreate);
  const sourcesFolder = join(nameOfTheMod, "Sources");
  if (!existsSync(sourcesFolder)) {
    await mkdir(sourcesFolder);
  }
  const solutionName = startCase(camelCase(nameOfTheMod)).split(" ").join("");
  await $([
    `cd ${sourcesFolder} && dotnet new classlib -n ${solutionName} --target-framework-override net4.7.2`,
  ] as unknown as TemplateStringsArray);
})();
