import GhostContentAPI from '@tryghost/content-api';

export const useContentApi = () => {
	const config = useRuntimeConfig();

	const GHOST_API = new GhostContentAPI({
		url: config.public.ghostContentUrl,
		key: config.public.ghostApiKey,
		version: 'v5.0',
	});

	return { GHOST_API };
};
