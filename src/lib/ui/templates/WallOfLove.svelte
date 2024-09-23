<script lang="ts">
    import Background from '$lib/ui/background/Background.svelte';
    import LandingSection from '$lib/ui/layouts/LandingSection.svelte';
    import Testimonials1 from "$lib/ui/testinomials/Testimonial1.svelte";

    export let keyToNav: string = '#testimonial';

    export let landingTitle: string = "Our growing wall of love ❤️"
    export let landingSubtitle: string = "TESTINOMIALS"
    export let landingDescription: string = "Join 30+ builders who use Redprint"

    export let testimonials : {
        quoteHighlighted: string;
        quoteDetail1: string;
        quoteDetail2: string;
        name: string;
        bio: string;
        companyName: string;
        companyLink: string;
        socialPlatform: string;
        socialAccount: string;
        socialLink: string;
        bioImgPath: string;
        companyImgPath: string;
    }[] = [
        {
            quoteHighlighted: `I was really looking for a way to avoid spending countless hours poring over OP Stack's documentation and analyzing audit reports.`,
            quoteDetail1:`That’s when I discovered Redprint, and it has truly transformed my experience.`,
            quoteDetail2:`As a developer, I appreciate how its visualization is not only simple but also intuitive,
            making complex concepts easy to understand at a glance. Redprint has streamlined my workflow, allowing me to focus on building rather than getting lost in documentation. It’s been a game-changer for me!`,
            name: `Billy191`,
            bio: `CEO/Software Engineer`,
            companyName: `catalyzt.tech`,
            companyLink: `https://catalyzt.tech/`,

            socialPlatform: `𝕏`,
            socialAccount: `@billy191`,
            socialLink: `https://x.com/billy191`,

            bioImgPath: `/testimonials/1_bio.png`,
            companyImgPath: `/testimonials/1_company.png`
        },
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
        },
  	];

  
</script>
  
<Background color="bg-base-100">

    <LandingSection
        title={landingTitle}
        subtitle={landingSubtitle}
        description={landingDescription}
        yPadding="py-8"
    >
        <section
            class="relative isolate overflow-hidden bg-base-100 px-8 py-4 sm:py-8"
            id={keyToNav}
        >
        <Testimonials1
            quoteHighlighted={testimonials[0].quoteHighlighted}
            quoteDetail1={testimonials[0].quoteDetail1}
            quoteDetail2={testimonials[0].quoteDetail2}
            name={testimonials[0].name}
            bio={testimonials[0].bio}
            companyName={testimonials[0].companyName}
            companyLink={testimonials[0].companyLink}
            socialPlatform={testimonials[0].socialPlatform}
            socialAccount={testimonials[0].socialAccount}
            socialLink={testimonials[0].socialLink}
            bioImgPath={testimonials[0].bioImgPath}
            companyImgPath={testimonials[0].companyImgPath}
        ></Testimonials1>
        <Testimonials1
            quoteHighlighted={testimonials[1].quoteHighlighted}
            quoteDetail1={testimonials[1].quoteDetail1}
            quoteDetail2={testimonials[1].quoteDetail2}
            name={testimonials[1].name}
            bio={testimonials[1].bio}
            companyName={testimonials[1].companyName}
            companyLink={testimonials[1].companyLink}
            socialPlatform={testimonials[1].socialPlatform}
            socialAccount={testimonials[1].socialAccount}
            socialLink={testimonials[1].socialLink}
            bioImgPath={testimonials[1].bioImgPath}
            companyImgPath={testimonials[1].companyImgPath}
        >

        </Testimonials1>
        
        </section>


    </LandingSection>
</Background>