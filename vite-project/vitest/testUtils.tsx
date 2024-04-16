import { render } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import allMocks from './mockQueries/allMocks';


interface TestPageRenderOptions {
    allMocks?: typeof allMocks;
    initialRoutes?: string[];
  }
  
  export function testPageRender(
    ui: React.ReactElement,
    options: TestPageRenderOptions
  ) {
    return render(
        <MemoryRouter initialEntries={options.initialRoutes || ['/project1/']}>
            {ui}
        </MemoryRouter>
    );
}