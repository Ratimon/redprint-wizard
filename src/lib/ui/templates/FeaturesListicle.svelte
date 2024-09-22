<script lang="ts">
    import type {FeatureListItem } from '$lib/model/Feature';

    import CopyBlock from '$lib/ui/components/CopyBlock.svelte';
    import Background from '$lib/ui/background/Background.svelte';
    import Icon from '@iconify/svelte';

    export let keyToNav: string = '#solution';

    const featureLists  = [
    {
        title: "1: Governance",
        descriptions:
        [
            "Safe's Multi-sig",
            "OpenZeppelin's Governor",
        ],
        script: 'DeploySafeProxyScript',
        highlight : "Governance Layer",
        iconName: "material-symbols:how-to-vote",
    },
    {
        title: "2: Super Chain",
        descriptions:
        [
            "ERC20's Bridge",
            "ER721's Bridge",
        ],
        script: 'SetupSuperchain',
        highlight : "L1 's Smart Contract Layer",
        iconName: "formkit:ethereum",
    },
    {
        title: "3: Plasma Chain",
        descriptions:
        [
            "Super Low Fees",
            "Independent of blob demand"
        ],
        script: 'SetupPlasmachain',
        highlight : "Plasma data availability",
        iconName: "hugeicons:blockchain-06", 
    },
    {
        title: "4: OP Chain",
        descriptions:
        [
            "Low-cost data availability",
            "DA challange on L1",
            "Custom Gas Token"
        ],
        script: 'SetupOPchain',
        highlight : "L2 's Smart Contract Layer",
        iconName: "simple-icons:optimism",
    },
    ] as FeatureListItem[];

    export let featureSelected: string = '1: Governance';

    $: featureToDisplay = featureLists.find((feature) => feature.title === featureSelected);

    let hasClicked: boolean = false;
    
    const handleClick = (name: string) :void => {
        if (!hasClicked) setHasClicked(true);
        setFeatureSelected(name);
    }

    function setHasClicked(open : boolean) :void  {
        hasClicked = open;
    }
  
    function setFeatureSelected(name: string) :void {
        featureSelected = name;
    }


  $: deployCommand1 = `forge script -vvv scripts/deploy/Deploy.s.sol:Deploy`
  $: deployCommand2 = `forge script script/100_${featureToDisplay?.script}.s.sol`

</script>

<section id={keyToNav} class="py-24">
    <div class="max-w-3xl mx-auto">
        <Background color="bg-base-100">
            <div class="max-md:px-8 max-w-3xl">
                <div class="text-center text-sm font-bold text-primary-500">
                    SOLUTIONS
                </div>
                <h2 class="font-extrabold text-3xl lg:text-5xl tracking-tight mb-8">
                  Abstract your app chain, visualize logic, and supercharge your development power
                </h2>
                
                <div class="text-base-content/80 leading-relaxed mb-8 lg:text-lg">
                  The simplest tool to build <b>experimental</b> and <b>innovational</b> features 
                  which aren't yet available on the production at all by composing different <b>OPStack</b> components TOGETHER.
                  This empowers developer to push the boundaries of what's possible beyond Optimism or Ethereum 's roadmaps.
                </div>
        
                <div class="pt-0.5 pb-4 justify-center">
                    <h3 class="m-2 text-accent font-medium text-sm font-mono mb-3">Original: we have:</h3>
                    <CopyBlock
                      boxClass="p-2 rounded-box font-black text-primary max-w-full mx-auto text-center"
                      class="mb-5"
                      background="bg-primary-content"
                      copiedBackground="bg-success"
                      copiedColor="text-success-content"
                      text={deployCommand1}
                    />
                </div>

               <div class="pt-0.5 pb-4 justify-center">
                    <h3 class="m-2 text-accent font-medium text-sm font-mono mb-3">Then: it can be broken into modular components::</h3>
                    <CopyBlock
                        boxClass="p-2 rounded-box font-black text-primary max-w-full mx-auto text-center"
                        class="mb-5"
                        background="bg-primary-content"
                        copiedBackground="bg-success"
                        copiedColor="text-success-content"
                        text={deployCommand2}
                    />
                </div>
        
            </div>
        </Background>

    </div>

    <div>
        <div class="grid grid-cols-4 md:flex justify-start gap-4 md:gap-12 max-md:px-8 max-w-3xl mx-auto mb-8">

            {#each featureLists as feature, i}
                <button
                    on:click={() => handleClick(feature.title)}
                    class={`flex flex-col items-center justify-center gap-3 select-none cursor-pointer p-2 duration-200 group`}
                >
                    <span
                        class={`duration-100 ${
                        featureSelected === feature.title
                            ? "text-primary"
                            : "text-base-content/30 group-hover:text-base-content/50"
                        }`}
                    >
                        {#if feature.iconName}
                            <Icon icon={feature.iconName} />
                        {/if}   
                    </span>
                    <span
                        class={`font-semibold text-sm ${
                        featureSelected === feature.title
                            ? "text-primary"
                            : "text-base-content/50"
                        }`}
                    >
                        {feature.title}
                    </span>
                </button>
            {/each}
        </div>

        <Background color="bg-base-200">
            <div class="max-w-3xl mx-auto flex flex-col md:flex-row justify-center md:justify-start md:items-center gap-12">
                <div class="text-base-content/80 leading-relaxed space-y-4 px-12 md:px-0 py-12 max-w-xl animate-opacity">
                    <h3 class="font-semibold text-base-content text-lg">
                        {featureToDisplay?.title}
                    </h3>

                    {#if featureToDisplay}
                        <ul class="space-y-1">
                            {#each featureToDisplay.descriptions as description, i}
                                <li  class="flex items-center gap-3">
                                    {description}
                                </li>
                            {/each}
                            <li class="flex items-center gap-3 text-accent font-medium">
                                {featureToDisplay.highlight}
                            </li>
                        </ul>
                    {/if}

                </div>


            </div>
        </Background>


    </div>

    <div class="max-w-3xl mx-auto py-8">
        <Background color="bg-base-100">
            <div class="max-md:px-8 max-w-3xl">
                <div class="text-center text-sm font-bold text-primary-500">
                    <a href="/1-governance" class= "btn btn-primary btn-block">
                        Set up {featureToDisplay?.highlight}
                    </a>
                </div>

            </div>
        </Background>
    </div>


</section>

<!-- {/if} -->