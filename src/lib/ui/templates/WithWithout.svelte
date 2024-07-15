<script lang="ts">

    import Background from '$lib/ui/background/Background.svelte';

    export let points : {pain: string; feature: string}[] = [
    {pain: "Pay at least $3000 per month", feature: `lower Cost by paying only gas to Eth`},
    {pain: "Waste hours in developer support", feature: "No more external support"},
    {pain: "Can’t update sourcecode (new features, bug fix)", feature: "Complete control by your team (eg. it contains a set of best practises for Rollup Development)"},
    {pain: "Same old code/features", feature: "Innovation beyond your competitors (eg. quickly get a idea for hackathon or quick prototypes)"},
  	];

</script>

<Background color="bg-base-100">
    <section>
        <div class="max-w-5xl mx-auto px-8 py-16 md:py-32 ">

            <div class="text-center text-sm font-bold text-primary-500">
                COMPARISONS
            </div>

            <h2 class="text-center font-extrabold text-3xl md:text-5xl tracking-tight mb-12 md:mb-20">
                Paying for RaaS or Building Your Own?
            </h2>
    
            <div class="flex flex-col md:flex-row justify-center items-center md:items-start gap-8 md:gap-12">
              <div class="bg-error/20 text-error p-8 md:p-12 rounded-lg w-full ">
                <h3 class="font-bold text-lg mb-4">
                  Using RaaS
                </h3>

                <ul class="list-disc list-inside space-y-1.5 ">
                    {#each points as point}
                        <li class="flex gap-2 items-center">
                            <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            class="w-4 h-4 shrink-0 opacity-75"
                            >
                            <path d="M5.28 4.22a.75.75 0 0 0-1.06 1.06L6.94 8l-2.72 2.72a.75.75 0 1 0 1.06 1.06L8 9.06l2.72 2.72a.75.75 0 1 0 1.06-1.06L9.06 8l2.72-2.72a.75.75 0 0 0-1.06-1.06L8 6.94 5.28 4.22Z" />
                            </svg>
                            {point.pain}
                        </li>
                    {/each}                    
                </ul>
    
              </div>
    
              <div class="bg-success/20 text-success p-8 md:p-12 rounded-lg w-full">
                <h3 class="font-bold text-lg mb-4">
                  Building your own with Redprint
                </h3>
    
                <ul class="list-disc list-inside space-y-1.5 ">
                    {#each points as point}
                        <li class="flex gap-2 items-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                                class="w-4 h-4 shrink-0 opacity-75"
                            >
                                <path
                                d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z"
                                />
                            </svg>
                            {point.feature}
                        </li>
                    {/each}
                </ul>
              </div>
            </div>
        </div>
    </section>
</Background>

