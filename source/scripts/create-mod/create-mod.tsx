import prompts from "prompts";
import { mkdir } from "fs/promises";
import { existsSync } from "fs";

(async () => {
  const { value: values }: { value: string[] } = await prompts({
    type: "multiselect",
    name: "value",
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
  const foldersToCreate = values.map(async (value) => {
    if (!existsSync(value)) {
      await mkdir(value);
    }
  });
  await Promise.all(foldersToCreate);
})();
