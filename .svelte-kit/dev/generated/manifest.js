const c = [
	() => import("../../../src/routes/__layout.svelte"),
	() => import("../components/error.svelte"),
	() => import("../../../src/routes/index.svelte"),
	() => import("../../../src/routes/[lang]/index.svelte"),
	() => import("../../../src/routes/[lang]/newspaper-article/index.svelte"),
	() => import("../../../src/routes/[lang]/newspaper-article/[slug].svelte"),
	() => import("../../../src/routes/[lang]/about.svelte"),
	() => import("../../../src/routes/[lang]/[doctype]/index.svelte"),
	() => import("../../../src/routes/[lang]/[doctype]/[slug].svelte")
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

	// src/routes/[lang]/about.svelte
	[/^\/([^/]+?)\/about\/?$/, [c[0], c[6]], [c[1]], (m) => ({ lang: d(m[1])})],

	// src/routes/[lang]/[doctype]/index.svelte
	[/^\/([^/]+?)\/([^/]+?)\/?$/, [c[0], c[7]], [c[1]], (m) => ({ lang: d(m[1]), doctype: d(m[2])})],

	// src/routes/[lang]/[doctype]/[slug].svelte
	[/^\/([^/]+?)\/([^/]+?)\/([^/]+?)\/?$/, [c[0], c[8]], [c[1]], (m) => ({ lang: d(m[1]), doctype: d(m[2]), slug: d(m[3])})]
];

export const fallback = [c[0](), c[1]()];