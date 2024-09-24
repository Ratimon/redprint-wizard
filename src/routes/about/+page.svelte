<script lang="ts">
	import CopyBlock from '$lib/ui/components/CopyBlock.svelte';
	import Testimonial1Small from "$lib/ui/testinomials/Testimonial1Small.svelte";

	import {appName} from 'web-config';

	export let testimonial : {
        quoteHighlighted: string;
        quoteDetail1: string;
        quoteDetail2: string;
        name: string;
        bio: string;
        companyName: string;
        companyLink?: string;
        socialPlatform?: string;
        socialAccount?: string;
        socialLink?: string;
        bioImgPath: string;
        companyImgPath?: string;
    } = 
        {
            quoteHighlighted: `Redprint accelerates the way I build on OPStack.`,
            quoteDetail1:`With an innovative interactive UI,`,
            quoteDetail2:`I can easily setup and deploy contracts on OP.`,
            name: `wit03.eth`,
            bio: `Co-founder`,
            companyName: `RetroPGF Hub`,
            companyLink: `https://retropgfhub.com/`,

            socialPlatform: `𝕏`,
            socialAccount: `@witjarukit`,
            socialLink: `https://x.com/witjarukit`,

            bioImgPath: `/testimonials/2_bio.png`,
            companyImgPath: `/testimonials/2_company.png`
        };


</script>

<section class="py-2 px-4 text-center">

	<div class="max-w-auto md:max-w-lg mx-auto">

		<p class="!text-2xl flex justify-center space-x-2 font-black my-8">
			About {appName}
		</p>

		<p class="!text-xl flex justify-center space-x-2 my-8">
			We are engineering and product focused team with regenerative midset, pushing the envelope of either Ethereum or Optimism ecosystems.
		</p>

        <p class="!text-xl flex justify-center space-x-2 my-8">
			We are the team behind Redprint Wizard, an open-source code generator to develop OPStack ’s contracts
		</p>

		<div class="pt-3 pb-4">
			<h1 class="m-4 font-semibold">Use it:</h1>
			<CopyBlock
				boxClass="p-2 rounded-box font-black text-primary max-w-xl mx-auto"
				class="mb-5"
				background="bg-primary-content"
				copiedBackground="bg-success"
				copiedColor="text-success-content"
				text={`npm add -D redprint-wizard`}
			/>
			<p class="mt-6 text-base-300">
				Find out more on
				<a class="underline" href="https://github.com/Ratimon/redprint-wizard" target="_blank" rel="noreferrer"
					>github</a
				>
			</p>
		</div>

        <p class="!text-xl flex justify-center space-x-2 my-8">
            We are also building redprint-forge, a developer-friendly framework/library in solidity to modify & deploy OPStack ’s contracts in a modular style
		</p>

		<div class="pt-3 pb-4">
			<h1 class="m-4 font-semibold">Use it:</h1>
			<CopyBlock
				boxClass="p-2 rounded-box font-black text-primary max-w-xl mx-auto"
				class="mb-5"
				background="bg-primary-content"
				copiedBackground="bg-success"
				copiedColor="text-success-content"
				text={`npm add -D redprint-forge`}
			/>
			<p class="mt-6 text-base-300">
				Find out more on
				<a class="underline" href="https://github.com/Ratimon/redprint-forge" target="_blank" rel="noreferrer"
					>github</a
				>
			</p>
		</div>
		
		<Testimonial1Small
			quoteHighlighted={testimonial.quoteHighlighted}
			quoteDetail1={testimonial.quoteDetail1}
			quoteDetail2={testimonial.quoteDetail2}
			name={testimonial.name}
			bio={testimonial.bio}
			companyName={testimonial.companyName}
			companyLink={testimonial.companyLink}
			socialPlatform={testimonial.socialPlatform}
			socialAccount={testimonial.socialAccount}
			socialLink={testimonial.socialLink}
			bioImgPath={testimonial.bioImgPath}
			companyImgPath={testimonial.companyImgPath}
		>
		</Testimonial1Small>
       
	</div>

</section>