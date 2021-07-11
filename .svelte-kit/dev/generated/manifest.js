const c = [
	() => import("../../../src/routes/__layout.svelte"),
	() => import("../components/error.svelte"),
	() => import("../../../src/routes/index.svelte"),
	() => import("../../../src/routes/[lang]/index.svelte"),
	() => import("../../../src/routes/[lang]/newspaper-article/index.svelte"),
	() => import("../../../src/routes/[lang]/newspaper-article/[slug].svelte"),
	() => import("../../../src/routes/[lang]/post-link/index.svelte"),
	() => import("../../../src/routes/[lang]/post-link/[slug].svelte"),
	() => import("../../../src/routes/[lang]/sermon/index.svelte"),
	() => import("../../../src/routes/[lang]/sermon/[slug].svelte"),
	() => import("../../../src/routes/[lang]/about.svelte"),
	() => import("../../../src/routes/[lang]/post/index.svelte"),
	() => import("../../../src/routes/[lang]/post/[slug].svelte")
];

const d = decodeURIComponent;

export const routes = [
	// src/routes/index.svelte
	[/^\/$/, [c[0], c[2]], [c[1]]],

	// src/routes/[lang]/index.svelte
	[/^\/([^/]+?)\/?$/, [c[0], c[3]], [c[1]], (m) => ({ lang: d(m[1])})],

	// src/routes/[lang]/newspaper-article/index.svelte
	[/^\/([^/]+?)\/newspaper-article\/?$/, [c[0], c[4]], [c[1]], (m) => ({ lang: d(m[1])})],

	// src/routes/[lang]/newspaper-article/[slug].svelte
	[/^\/([^/]+?)\/newspaper-article\/([^/]+?)\/?$/, [c[0], c[5]], [c[1]], (m) => ({ lang: d(m[1]), slug: d(m[2])})],

	// src/routes/[lang]/post-link/index.svelte
	[/^\/([^/]+?)\/post-link\/?$/, [c[0], c[6]], [c[1]], (m) => ({ lang: d(m[1])})],

	// src/routes/[lang]/post-link/[slug].svelte
	[/^\/([^/]+?)\/post-link\/([^/]+?)\/?$/, [c[0], c[7]], [c[1]], (m) => ({ lang: d(m[1]), slug: d(m[2])})],

	// src/routes/[lang]/sermon/index.svelte
	[/^\/([^/]+?)\/sermon\/?$/, [c[0], c[8]], [c[1]], (m) => ({ lang: d(m[1])})],

	// src/routes/[lang]/sermon/[slug].svelte
	[/^\/([^/]+?)\/sermon\/([^/]+?)\/?$/, [c[0], c[9]], [c[1]], (m) => ({ lang: d(m[1]), slug: d(m[2])})],

	// src/routes/[lang]/about.svelte
	[/^\/([^/]+?)\/about\/?$/, [c[0], c[10]], [c[1]], (m) => ({ lang: d(m[1])})],

	// src/routes/[lang]/post/index.svelte
	[/^\/([^/]+?)\/post\/?$/, [c[0], c[11]], [c[1]], (m) => ({ lang: d(m[1])})],

	// src/routes/[lang]/post/[slug].svelte
	[/^\/([^/]+?)\/post\/([^/]+?)\/?$/, [c[0], c[12]], [c[1]], (m) => ({ lang: d(m[1]), slug: d(m[2])})]
];

export const fallback = [c[0](), c[1]()];