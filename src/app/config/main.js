import { IApplicationConfig } from 'framework/types/application.flow';

export default async function (): Promise<IApplicationConfig> {
  return {
    configurationFile: 'app/config/main.js',
    controllerNamespace: 'app/controllers',
    bootstrapFile: 'app/config/main.js',
    routeFile: 'app/config/routes.js',
    componentCatalogue: [
      'test',
      'cors',
    ]
  };
}
