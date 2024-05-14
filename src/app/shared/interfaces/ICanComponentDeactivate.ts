export interface ICanComponentDeactivate {
  canDeactivate: () => Promise<boolean>;
}
