<script lang="ts">
	import CopyBlock from '$lib/ui/components/CopyBlock.svelte';

	import {appName} from 'web-config';
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

        <p class="!text-xl flex justify-center space-x-2 my-8">
            We are also building redprint-forge, a developer-friendly framework/library in solidity to modify & deploy OPStack ’s contracts in a modular style
		</p>
       

	</div>

	<div class="pt-3 pb-4">
		<h1 class="m-4 font-semibold">Use it:</h1>
		<CopyBlock
			boxClass="p-2 rounded-box font-black text-primary max-w-xl mx-auto"
			class="mb-5"
			background="bg-reverse-primary"
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
</section>