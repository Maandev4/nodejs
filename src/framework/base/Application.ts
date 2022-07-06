/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @link https://github.com/blacksmoke26 Author Website
 * @since 2022-07-05
 */
import Module from 'framework/base/Module';
import { Configuration } from 'framework/base/CoreObject';
import Container from 'framework/di/Container';

export default abstract class Application extends Module {
  /**
   * The namespace that controller classes are located in.
   * This namespace will be used to load controller classes by prepending it to the controller-class name.
   * The default namespace is `app/controllers`.
   */
  public controllerNamespace: string = 'app/controllers';

  /**
   * List of loaded modules indexed by their class names.
   */
  public loadedModules = {};

  /**
   * Full qualified namespace
   */
  get namespace (): string {
    return 'framework/base/Application';
  }

  constructor ( config: Configuration = {} ) {
    super(config);
    global.App.app = this;
    global.App.container = new Container();
    Application.setInstance(this)
    //global.App = this;
  }

  public async run (): Promise<void> {

  }
}
