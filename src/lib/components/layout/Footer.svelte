<script>
	import Cc from '$lib/components/icons/Cc.svelte'
	import CcShareAlike from '$lib/components/icons/CcShareAlike.svelte'
	import CcAttribution from '$lib/components/icons/CcAttribution.svelte'
	import LogoLarge from '$lib/components/icons/LogoLarge.svelte'
</script>

<footer class="site-footer">
	<div class="site-footer-wrapper">
		<div class="logo">
			<LogoLarge />
		</div>
		<div>
			<ul class="bar-list">
				<li>
					<strong>Email:</strong> <a href="mailto:hello@theformer.faith">hello@theformer.faith</a>
				</li>
				<li>
					<strong>Twitter:</strong> <a href="https://twitter.com/theformerfaith">@theformerfaith</a>
				</li>
			</ul>
		</div>
		<div class="license">
			<a class="license-logos" href="https://creativecommons.org/licenses/by-sa/4.0/">
				<Cc />
				<CcAttribution />
				<CcShareAlike />
			</a>
			<p>Except where otherwise noted, content on this site is licensed under a <a href="https://creativecommons.org/licenses/by-sa/4.0/">Creative Commons Attribution-ShareAlike 4.0 International license</a>.</p>
		</div>
	</div>
</footer>
