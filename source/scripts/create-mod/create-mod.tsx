import prompts from "prompts";

(async () => {
  await prompts({
    type: "select",
    name: "value",
    message: "Pick a target version",
    choices: [
      {
        title: "1.5",
        description: "Latest RimWorld version",
      },
      { title: "1.4" },
      { title: "1.3" },
      { title: "1.2" },
      { title: "1.1" },
      { title: "1.0" },
    ],
    initial: 0,
  });
})();
