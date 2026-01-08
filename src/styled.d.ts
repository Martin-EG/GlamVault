import 'styled-components';
import { AppTheme } from './GlamUI/styles/theme';

declare module 'styled-components' {
  export interface DefaultTheme extends AppTheme { }
}
