import { expect, test, describe } from 'vitest';
import { testPageRender } from './testUtils';
import { waitFor, screen } from '@testing-library/react';
import DisplaySearch from '../src/components/DisplaySearch';
import '@testing-library/jest-dom/extend-expect';




describe('renders pokemon', () => {
    test('matches the snapshot', async () => {
        const { asFragment } = testPageRender(<DisplaySearch />, {})
  
        await waitFor(() => {
            expect(screen.getByText(/Rick Astley/i)).toBeInTheDocument();

        });
  
        expect(asFragment()).toMatchSnapshot();
    });
  }); 
