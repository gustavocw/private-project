// Imports
const fs = require('fs');

// Classes/Functions
interface PackageJson {
  dependencies?: { [key: string]: string };
}

interface Mapping {
  folder: string;
  name: string;
  packageJson: PackageJson;
}

interface GenerateConfigParams {
  baseFile: string;
  filePath: string;
  mappings: Mapping[];
  root?: boolean;
}

export class AlkordMappings {
  private static libraries?: Mapping[] = null;
  private static apps?: Mapping[] = null;

  public static getLibraries(): Mapping[] {
    if (this.libraries == null) {
      this.libraries = fs.readdirSync('./libs', {withFileTypes: true})
          .filter((dir) => dir.isDirectory())
          .map((dir) => ({
            folder: `libs/${dir.name}`,
            name: `@alkord/${dir.name}`,
            packageJson: JSON.parse(fs.readFileSync(`./libs/${dir.name}/package.json`).toString()) as PackageJson,
          } as Mapping));
    }

    return this.libraries;
  }

  public static getApps(): Mapping[] {
    if (this.apps == null) {
      this.apps = fs.readdirSync('./apps', {withFileTypes: true})
          .filter((dir) => dir.isDirectory())
          .map((dir) => ({
            folder: `apps/${dir.name}`,
            name: dir.name,
            packageJson: JSON.parse(fs.readFileSync(`./apps/${dir.name}/package.json`).toString()) as PackageJson,
          } as Mapping));
    }

    return this.apps;
  }

  public static generate() {
    const libraries = this.getLibraries();

    for (const library of libraries) {
      const dependencyList = Object.keys(library.packageJson['dependencies'] ?? {});

      this.generateConfig({
        baseFile: '../../tsconfig.dependency.json',
        filePath: `./${library.folder}`,
        mappings: libraries.filter((item) => dependencyList.includes(item.name)),
      });
    }

    const apps = this.getApps();

    for (const app of apps) {
      const dependencyList = Object.keys(app.packageJson['dependencies'] ?? {});

      this.generateConfig({
        baseFile: `../../tsconfig.project.json`,
        filePath: `./${app.folder}`,
        mappings: libraries.filter((item) => dependencyList.includes(item.name)),
      });

      if (fs.existsSync(`./${app.folder}/tsconfig.generated.tsbuildinfo`)) {
        fs.unlinkSync(`./${app.folder}/tsconfig.generated.tsbuildinfo`);
      }
    }

    this.generateConfig({
      baseFile: `./tsconfig.json`,
      filePath: '.',
      mappings: libraries,
      root: true,
    });

    if (fs.existsSync('./tsconfig.generated.tsbuildinfo')) {
      fs.unlinkSync('./tsconfig.generated.tsbuildinfo');
    }
  }

  private static generateConfig(config: GenerateConfigParams) {
    const {
      filePath,
      baseFile,
      mappings,
      root,
    } = config;
    let json: any = {};

    if (fs.existsSync(`${filePath}/tsconfig.base.json`)) {
      json = JSON.parse(fs.readFileSync(`${filePath}/tsconfig.base.json`).toString());
    }

    if (!json['compilerOptions']) json['compilerOptions'] = {};
    if (!json['compilerOptions']['paths']) json['compilerOptions']['paths'] = {};

    json['extends'] = baseFile;
    json.compilerOptions.paths = {
      ...json.compilerOptions.paths,
      ...Object.fromEntries(
          mappings.map((mapping) => [
            `${mapping.name}/*`, root ? [`./${mapping.folder}/src/*`] :
            [`node_modules/${mapping.name}/src/*`, `../../${mapping.folder}/src/*`],
          ]),
      ),
    };

    fs.writeFileSync(
        `${filePath}/tsconfig.generated.json`,
        JSON.stringify(json, null, 4),
        {encoding: 'utf8', flag: 'w'},
    );
  }

  public static getAlias(appName?: string): { [key: string]: string } {
    const alias = Object.fromEntries(this.getLibraries().map((mapping) => [mapping.name, `${mapping.name}/src`]));

    if (appName) {
      const tsconfig = `./apps/${appName}/tsconfig.base.json`;
      if (fs.existsSync(tsconfig)) {
        const json: any = JSON.parse(fs.readFileSync(tsconfig).toString());

        for (const [key, value] of Object.entries(json.compilerOptions?.paths ?? {})) {
          alias[key.replace('/*', '')] = (value as string[])[0]
              .replace('./src/', `@project/${appName}/src/`)
              .replace('/*', '');
        }
      }
    }

    return alias;
  }

  public static getDependencies(): string[] {
    return [
      ...this.getLibraries(),
      ...this.getApps(),
    ].filter((mapping) => mapping.packageJson.dependencies)
        .map((mapping) => Object.keys(mapping.packageJson.dependencies))
        .reduce((array, current) => {
          for (const dependency of current) {
            if (!array.includes(dependency)) array.push(dependency);
          }

          return array;
        }, [])
        .filter((dependency) => !dependency.startsWith('@alkord/'));
  }
}

// Arguments
const args = process.argv.slice(2);

if (args[0] === 'generate') {
  AlkordMappings.generate();
}
