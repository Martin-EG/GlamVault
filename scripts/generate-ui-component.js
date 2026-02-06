const fs = require('fs');
const path = require('path');

const componentName = process.argv[2];

if (!componentName) {
  console.error('Please provide a component name.');
  process.exit(1);
}

const componentDir = path.join(
  __dirname,
  '../src/GlamUI/components',
  componentName,
);

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

const storyContent = `import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';

import ${componentName} from './${componentName}';

const meta = {
  title: 'GlamUI/${componentName}',
  component: ${componentName},
} satisfies Meta<typeof ${componentName}>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {}
};
`;

fs.writeFileSync(path.join(componentDir, 'index.ts'), indexContent);
fs.writeFileSync(
  path.join(componentDir, `${componentName}.types.ts`),
  typesContent,
);
fs.writeFileSync(
  path.join(componentDir, `${componentName}.styles.ts`),
  stylesContent,
);
fs.writeFileSync(
  path.join(componentDir, `${componentName}.tsx`),
  componentContent,
);
fs.writeFileSync(
  path.join(componentDir, `${componentName}.stories.tsx`),
  storyContent,
);

console.log(
  `Component ${componentName} created successfully at ${componentDir}`,
);
