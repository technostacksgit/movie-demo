/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
'use client';

import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';

type Props = {
  spec: Record<string, any>,
};

function ReactSwagger({ spec }: Props) {
  return <SwaggerUI spec={spec} />;
}

export default ReactSwagger;