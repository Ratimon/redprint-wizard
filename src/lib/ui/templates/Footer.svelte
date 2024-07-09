<script lang="ts">
  import type {Link } from '$lib/model/Link';
  import {appName, appDescription} from 'web-config';

  //  to do add support email
  // import {supportEmail} from 'mailgun-config';

  import {url} from '$lib/utils/path';

  import Background from '$lib/ui/background/Background.svelte';
  import ScrollLink from '$lib/ui/header/ScrollLink.svelte';
  import PageLink from '$lib/ui/header/PageLink.svelte';

  export let links : Link[];

</script>

<Background color="bg-base-200">
  <footer class="border-t border-base-content/10">
    <div class="max-w-7xl mx-auto px-8 py-24">
      <div class=" flex lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
        <div class="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
        <a
            href="/#"
            aria-current="page"
            class="flex gap-2 justify-center md:justify-start items-center"
          >
            <img
              src={url('/icon.svg')}
              alt={`${appName} logo`}
              class="w-6 h-6"
              width={24}
              height={24}
            />
            <strong class="font-extrabold tracking-tight text-base md:text-lg">
              {appName}
            </strong>
        </a>
  
          <p class="mt-3 text-sm text-base-content/80">
            {appDescription}
          </p>
          <p class="mt-3 text-sm text-base-content/60">
            Copyright © {new Date().getFullYear()} - All rights reserved
          </p>
        </div>
        <div class="flex-grow flex flex-wrap justify-center -mb-10 md:mt-0 mt-10 text-center">
          <div class="lg:w-1/3 md:w-1/2 w-full px-4">
            <div class="footer-title font-semibold text-base-content tracking-widest text-sm md:text-left mb-3">
              LINKS
            </div>
  
            <div class="flex flex-col justify-center items-center md:items-start gap-2 mb-10 text-sm">
  
              <!-- to do remove -->

              <!-- {#if supportEmail}
                <PageLink
                  class="link link-hover"
                  whenUnselected="tab tab-sm tab-lifted flex-1"
                  whenSelected="tab-active font-black !bg-base-100"
                  href={`mailto:${supportEmail}`}
                >
                    Support
                </PageLink>
              {/if} -->

              {#each links as link}
                {#if link.navType == 'scroll'}
                    <svelte:component this={ScrollLink} class="link link-hover" whenUnselected="tab tab-sm tab-lifted flex-1" whenSelected="tab-active font-black !bg-base-100" href={link.pathname}>
                        {link.title}
                    </svelte:component>
                {:else}
                    <svelte:component this={PageLink} class="link link-hover" whenUnselected="tab tab-sm tab-lifted flex-1" whenSelected="tab-active font-black !bg-base-100" href={link.pathname}>
                        {link.title}
                    </svelte:component>
                {/if}
              {/each}
  
            </div>
          </div>
  
          <div class="lg:w-1/3 md:w-1/2 w-full px-4">
            <div class="footer-title font-semibold text-base-content tracking-widest text-sm md:text-left mb-3">
              LEGAL
            </div>
  
            <div class="flex flex-col justify-center items-center md:items-start gap-2 mb-10 text-sm">
              <a href="/tos" class="link link-hover">
                Terms of services
              </a>
              <a href="/privacy-policy" class="link link-hover">
                Privacy policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</Background>