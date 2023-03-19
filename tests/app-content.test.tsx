import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import App from '../src/App';

describe('Test AppContent', () => {

	it('Should load additional courses on click button Load more', async () => {
		const user = userEvent.setup()
		render(<App />);
		await waitFor(() => expect(screen.getByTestId('button-load-more')).toBeInTheDocument());
		await user.click(screen.getByTestId('button-load-more'))
		await waitFor(() => expect(screen.getByText('Learn & Grow. Self-Improvement')).toBeInTheDocument());
	})

	it('Should hide load more button when no more courses', async () => {
		const user = userEvent.setup()
		render(<App />);
		await waitFor(() => expect(screen.getByTestId('button-load-more')).toBeInTheDocument());
		await user.click(screen.getByTestId('button-load-more'))
		await waitFor(() => expect(screen.getByText('Learn & Grow. Self-Improvement')).toBeInTheDocument());
		await user.click(screen.getByTestId('button-load-more'))
		await waitFor(() => expect(screen.getByText('How to develop a stable mindset')).toBeInTheDocument());
		await waitFor(() => expect(screen.queryByTestId('button-load-more')).not.toBeInTheDocument());
	})
});