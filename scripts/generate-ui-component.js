const fs = require('fs');
const path = require('path');

console.log(process.argv)
const componentName = process.argv[2];

if (!componentName) {
  console.error('Please provide a component name.');
  process.exit(1);
}

const componentDir = path.join(__dirname, '../src/GlamUI/components', componentName);

if (fs.existsSync(componentDir)) {
  console.error(`Component ${componentName} already exists.`);
  process.exit(1);
}

fs.mkdirSync(componentDir, { recursive: true });

const indexContent = `export { default } from './${componentName}';
export * from './${componentName}.types';
`;

const typesContent = `/**
* ${componentName} types
* Add your types here like:
* @property {${componentName}Variant} variant - The variant of the ${componentName}
* @property {${componentName}Size} size - The size of the ${componentName}
*
* export type ${componentName}Variant = 'default';
* export type ${componentName}Size = 'md';
*/
`;

const stylesContent = `import styled from 'styled-components';

import type { ${componentName}Variant } from './${componentName}.types';

interface Styled${componentName}Props {
  readonly $variant: ${componentName}Variant;
}

export const Styled${componentName} = styled.div.attrs<Styled${componentName}Props>(
  ({ $variant }) => ({
    className: \`\`,
  })
)\`
  /* Add styles here */
\`;
`;

const componentContent = `import { FC, PropsWithChildren } from 'react';

import { Styled${componentName} } from './${componentName}.styles';
import type { ${componentName}Variant } from './${componentName}.types';

interface ${componentName}Props extends PropsWithChildren {
  variant?: ${componentName}Variant;
}

const ${componentName}: FC<${componentName}Props> = ({
  children,
  variant = 'default',
}) => {
  return (
    <Styled${componentName} $variant={variant}>
      {children}
    </Styled${componentName}>
  );
};

export default ${componentName};
`;

fs.writeFileSync(path.join(componentDir, 'index.ts'), indexContent);
fs.writeFileSync(path.join(componentDir, `${componentName}.types.ts`), typesContent);
fs.writeFileSync(path.join(componentDir, `${componentName}.styles.ts`), stylesContent);
fs.writeFileSync(path.join(componentDir, `${componentName}.tsx`), componentContent);

console.log(`Component ${componentName} created successfully at ${componentDir}`);
