<script lang="ts">
  import type {Link } from '$lib/model/Link';

  import Icon from '@iconify/svelte';
  
  import Background from '$lib/ui/background/Background.svelte';
  import ButtonPopoverCategories from  '$lib/ui/popover/ButtonPopoverCategories.svelte';

  import ButtonGradient from '$lib/ui/buttons/ButtonGradient.svelte';

  import Nav from '$lib/ui/header/Nav.svelte';

  import {appName} from 'web-config';
  import {url} from '$lib/utils/path';

  let className = 'bg-base-200';
	export {className as class};

  export let links : Link[];
  export let menuTitle :string;
  export let dropDownLinks : Link[];

  export let actionLink :Link;


  let isOpen: boolean = false;
  const setIsOpen = (open : boolean) :void => {
      isOpen = open;
  }

</script>

<Background color={className}>
  <header>
    <nav class="container flex items-center justify-between px-8 py-4 mx-8" aria-label="Global" >
  
      <div class="flex lg:flex-1">
        <a class="flex items-center gap-2 shrink-0"
          href="/"
          title={`${appName} homepage`}
        >
          <img
            class="w-8"
            alt={appName}
            placeholder="blur"
            src={url('/icon.svg')}
            width="32"
            height="32"
          />
          <span class="font-extrabold text-lg">{appName}</span>
        </a>
      </div>
  
      <div class="hidden lg:flex lg:justify-center lg:gap-12 lg:items-center" >

        <Nav
          pages={links}
          class="link link-info"
          tabClass="tab tab-sm tab-lifted flex-1"
          whenSelected="tab-active font-black !bg-base-100"
        />

        {#if dropDownLinks}
          <ButtonPopoverCategories {dropDownLinks} {menuTitle} />
        {/if}

        
      </div>
  
      <!-- CTA / Launch / Lead on big screens  -->
      <div class="hidden justify-end lg:flex lg:justify-end lg:flex-1">
        <a href={actionLink.pathname}>
          <ButtonGradient title={actionLink.title} />
        </a>
      </div>
  
      <!-- Burger button to open menu on mobile  -->
      <div class="flex lg:hidden">
        <button
          type="button"
          class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5"
          on:click|preventDefault={() => setIsOpen(true)}
        >
          <span class="sr-only">Open main menu</span>
          <Icon icon="clarity:menu-line" />
        </button>
      </div>
  
      <!-- Mobile menu, show/hide based on menu state. -->
      <div class={`relative z-50 ${isOpen ? "" : "hidden"}`}>
        <div
          class={`fixed inset-y-0 right-0 z-10 w-full px-8 py-4 overflow-y-auto bg-base-200 sm:max-w-sm sm:ring-1 sm:ring-neutral/10 transform origin-right transition ease-in-out duration-300`}
        >
          <!-- logo/name on small screens -->
          <div class="flex items-center justify-between">
            <!-- add link -->
            <img
              class="w-8"
              alt={appName}
              placeholder="blur"
              src={url('/icon.svg')}
              width="32"
              height="32"
            />
            <span class="font-extrabold text-lg">{appName}</span>
            <button
              type="button"
              class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5"
              on:click|preventDefault={() => setIsOpen(false)}
            >
              <span class="sr-only">Close menu</span>
              <Icon icon="clarity:menu-line" />
            </button>
          </div>
  
          <!-- links on small screens -->
          <div class="flow-root mt-6">
            <div class="py-4">

              <Nav
                pages={links}
                class="flex flex-col gap-y-4 items-start"
        
                tabClass="tab tab-sm tab-lifted flex-1"
                whenSelected="tab-active font-black !bg-base-100"
              />
  
            </div>
            <div class="divider"></div>
            <!-- CTA / Launch / Lead on small screens  -->
            <div class="flex flex-col">
              <a href={actionLink.pathname}>
                <ButtonGradient title={actionLink.title} />
              </a>
            </div>
          </div>
  
        </div>
      </div>
    </nav>
  </header>
</Background>