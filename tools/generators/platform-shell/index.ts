import { Tree, formatFiles, installPackagesTask, generateFiles, joinPathFragments } from '@nx/devkit';

export default async function (tree: Tree, schema: any) {
  const { name, platform } = schema;

  if (platform === 'desktop') {
    const targetDir = `apps/desktop/${name}/app`;

    // In a real scenario, we would use templates.
    // Here we'll manually ensure the basic structure exists.

    if (!tree.exists(targetDir)) {
      tree.write(`${targetDir}/project.json`, JSON.stringify({
        name: `desktop-${name}-app`,
        projectType: "application",
        targets: {
          build: {
            executor: "nx-electron:build",
            options: {
              main: `${targetDir}/src/main.ts`,
              tsConfig: `${targetDir}/tsconfig.app.json`
            }
          }
        },
        tags: [`scope:${name}`, "platform:desktop", "type:app"]
      }, null, 2));

      tree.write(`${targetDir}/src/main.ts`, "// Electron main entry point\n");
      tree.write(`${targetDir}/src/main.preload.ts`, "// Electron preload script\n");
    }
  }

  await formatFiles(tree);
  return () => {
    installPackagesTask(tree);
  };
}
