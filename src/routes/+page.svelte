<script  lang="ts">

    import Header from './Header.svelte';

    const headLinks = [
      {pathname: '#about', title: 'ABOUT US'},
      {pathname: '#source', title: 'SOURCECODE'},
      {pathname: '#redprimt-forge', title: 'redprint-forge'},
  	];

</script>

<Header links={headLinks} class="bg-base-200 "></Header>