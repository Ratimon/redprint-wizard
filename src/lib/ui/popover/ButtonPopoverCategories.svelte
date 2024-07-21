<script lang="ts">
    import type {Link } from '$lib/model/Link';

    import { Popover, PopoverContent, PopoverTrigger } from '$lib/ui/popover'

    import Background from '$lib/ui/background/Background.svelte';
    import Nav from '$lib/ui/header/Nav.svelte';

    export let menuTitle: string = "Try Our toolkit!!";
    export let dropDownLinks: Link[];

</script>

    <Popover>
      <PopoverTrigger class="link no-underline flex flex-nowrap items-center gap-1 text-base-content/80 hover:text-base-content active:text-base-content focus:text-base-content duration-100">
        {menuTitle}
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            class={`w-5 h-5 duration-200}`}
        >
            <path 
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
            />
        </svg>
      </PopoverTrigger>

      <PopoverContent >

        <Background color="bg-base-100">
            <div class="overflow-hidden rounded-box shadow-lg ring-1 ring-base-content ring-opacity-5">
                
                    <div class="relative grid gap-2 p-2 overflow-hidden">
                        <Nav
                            pages={dropDownLinks}
                            class=""
                            tabClass="block text-left p-3 -m-1 cursor-pointer hover:bg-base-200 rounded-box duration-200"
                        />
                    </div>
                
            </div>
        </Background>

      </PopoverContent>
    </Popover>