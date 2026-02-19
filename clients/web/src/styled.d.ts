import 'styled-components';

import { ITheme  } from './app/styles/styled.ts';

declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface DefaultTheme extends ITheme {
  }
}