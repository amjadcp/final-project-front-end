<script lang="ts">
	import heroImage from '$lib/assets/illustrations/communication-1.svg?raw';
	import { ContentCard, ContentCardsSection, ContentCardsTemplate, HeroBanner } from '$lib/components';
</script>

<ContentCardsTemplate pageTitle="Community" pageDescription="Blog, Discord and discussion">
	<HeroBanner
		slot="hero"
		image={heroImage}
		title="Community"
		subtitle="Join our community of expert teachers and students.<br /> Learn more about the our department."
	/>

	<ContentCardsSection cols={3} title="Discuss & develop">
		<ContentCard
			ctaLabel="Join our server"
			icon="discord"
			title="Discord chat"
			href="https://discord.gg/en8tW6MDtw"
			description="Join our expert community of teachers and students."
		/>
		<ContentCard
			ctaLabel="Browse code"
			icon="github"
			title="GitHub"
			href="https://github.com/tradingstrategy-ai/"
			description="Explore our deprtment open-source code on our GitHub repository."
		/>
		<ContentCard
			ctaLabel="Start tutorials"
			icon="read-glasses"
			title="Learn algorithmic trading"
			href="https://tradingstrategy.ai/docs/learn/index.html"
			description="Learn our course."
		/>
	</ContentCardsSection>

	<ContentCardsSection cols={3} title="Follow us">
		<ContentCard
			ctaLabel="Read blog"
			icon="reading"
			title="Blog"
			href="/blog"
			description="Join our expert community ."
		/>
		<ContentCard
			ctaLabel="Follow us"
			icon="twitter"
			title="Twitter"
			href="https://twitter.com/TradingProtocol"
			description="Follow us on Twitter ."
		/>
		<ContentCard
			ctaLabel="Subscribe to our channel"
			icon="youtube"
			title="YouTube"
			href="https://youtu.be/ZcLYuARq49k"
			description="Subscribe to our Youtube channel ."
		/>
		<ContentCard
			ctaLabel="Follow our company"
			icon="linkedin"
			title="LinkedIn"
			href="https://www.linkedin.com/company/trading-strategy/"
			description="Follow us on LinkedIn and join our community ."
		/>
		<ContentCard
			ctaLabel="Join our group"
			icon="telegram"
			title="Telegram"
			href="https://t.me/trading_protocol"
			description="Subscribe to our Telegram channel ."
		/>
		<div style:display="contents" style:cursor="pointer">
			<ContentCard
				ctaLabel="Subscribe to newsletter"
				icon="newspaper"
				title="Newsletter"
				href="/newsletter"
				description="Subscribe."
			/>
		</div>
	</ContentCardsSection>
</ContentCardsTemplate>
