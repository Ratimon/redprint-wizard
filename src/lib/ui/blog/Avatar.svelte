<script lang="ts">
  import type { PostPresenter} from '../../../routes/blog/Blog.presenter';
  export let post: PostPresenter;

</script>

{#if post.author.avatarSrc}
  <a href={`/blog/author/${post.author.slug}`}
    class="link link-hover hover:link-primary"
    title={`Posts by ${post.author.name}`}
  >
    <span itemProp="author">
      <img
        src={post.author.avatarSrc}
        alt={`Avatar of ${post.author.name}`}
        class="w-7 h-7 rounded-full object-cover object-center"
        width={28}
        height={28}
      />
    </span>

    <span class="group-hover:underline">{post.author.name}</span>
  </a>
{/if}


