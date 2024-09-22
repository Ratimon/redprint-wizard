<script lang="ts">
    const avatars: {
        alt: string;
        src: string;
    }[] = [
    {
        alt: "User",
        // Ideally, load from a statically generated image for better SEO performance 
        src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3276&q=80",
    },
    {
        alt: "User",
        src: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    },
    {
        alt: "User",
        src: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    },
    {
        alt: "User",
        src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    },
    {
        alt: "User",
        src: "https://images.unsplash.com/photo-1488161628813-04466f872be2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3376&q=80",
    },
    ];
</script>

<div class="flex flex-col md:flex-row justify-center items-center md:items-start gap-3">

    <!-- AVATARS -->

    <div class={`-space-x-5 avatar-group justy-start`}>
        {#each avatars as { alt, src }, i}
            <div class="avatar w-12 h-12">
                <img
                    class="w-8"
                    alt={alt}
                    src={src}
                    width={50}
                    height={50}
                />
            </div>
        {/each}
    </div>

    <!-- RATING -->
    <div class="flex flex-col justify-center items-center md:items-start gap-1">

      <div class="rating">
        {#each [...Array(5)] as _, i}
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                class="w-5 h-5 text-yellow-500"
            >
                <path
                d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                />
            </svg>
        {/each}

      </div>

      <div class="text-base text-base-content/80">
        <span class="font-semibold text-base-content">39</span> Developers
        <p>use our toolkit</p>
      </div>
    </div>
  </div>
