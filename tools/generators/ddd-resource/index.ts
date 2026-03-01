import { Tree, formatFiles, installPackagesTask, generateFiles, joinPathFragments, names } from '@nx/devkit';
import { libraryGenerator } from '@nx/nest';

interface Schema {
  name: string;
  domain: string;
}

export default async function (tree: Tree, schema: Schema) {
  const libName = names(schema.name).fileName;
  const domain = names(schema.domain).fileName;

  const layers = ['domain', 'application', 'infrastructure', 'presentation'];

  // Tasks collector to run serialized tasks at the end
  const tasks: (() => void)[] = [];

  for (const layer of layers) {
    const projectName = `${domain}-${libName}-${layer}`;
    const directory = `libs/domain/${domain}/${libName}/${layer}`;
    const tags = `scope:${domain},type:${layer},platform:agnostic`;

    // 1. Create the library using @nx/nest
    // We use await here because libraryGenerator is async and modifies the tree
    const task = await libraryGenerator(tree, {
      name: projectName,
      directory: directory,
      tags: tags,
      linter: 'eslint',
      unitTestRunner: 'jest',
      buildable: true,
      skipFormat: true,
      projectNameAndRootFormat: 'as-provided'
    });
    tasks.push(task);

    // 2. Generate custom boilerplate files into the library src/lib
    const templateOptions = {
      ...names(schema.name),
      tmpl: '',
      domain: schema.domain,
    };

    const targetDir = `${directory}/src/lib`;

    // Check if template exists for this layer
    // Since we are in the generator execution context, we can assume the structure
    const templatePath = `./files/${layer}/src/lib`;

    try {
        generateFiles(
            tree,
            joinPathFragments(__dirname, templatePath),
            targetDir,
            templateOptions
        );
    } catch (e) {
        // If template doesn't exist, it's fine, we just use the default lib structure
    }
  }

  await formatFiles(tree);

  return () => {
    installPackagesTask(tree);
    for (const task of tasks) {
      if (typeof task === 'function') task();
    }
  };
}
