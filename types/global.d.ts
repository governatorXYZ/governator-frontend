export interface GovernatorWindow extends Window {
  ethereum: any
  location: {
    host: string,
    origin: string
  }
}

declare let window: GovernatorWindow;
