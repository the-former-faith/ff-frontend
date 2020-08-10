<script>
	import Cc from './Icons/Cc.svelte'
	import CcShareAlike from './Icons/CcShareAlike.svelte'
	import CcAttribution from './Icons/CcAttribution.svelte'
	import LogoLarge from './LogoLarge.svelte'
</script>

<footer class="site-footer">
	<div class="site-footer-wrapper">
		<div class="logo">
			<LogoLarge />
		</div>
		<div>
			<ul class="bar-list">
				<li>
					<strong>Email:</strong> <a href="mailto:hello@theforemer.faith">hello@theforemer.faith</a>
				</li>
				<li>
					<strong>Twitter:</strong> <a href="https://twitter.com/theformerfaith">@theforemerfaith</a>
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
