<script context="module">
  import client from "../../../sanityClient";
  import BlockContent from "@movingbrands/svelte-portable-text";
  import serializers from "../../../components/serializers";
  export async function preload({ params }) {
    const { slug } = params;
    const query = `*[_type == "post" && slug.en.current == $slug]{
          _id,
          title,
          theme,
          "sections": sections[]->{
            _id,
            heading,
            content {
              "en": en[]{
                ...,
                _type == "blockQuoteObject" => {
                  ...,
                  "source": source {
                    ...,
                    "author": author->
                  }
                },
                markDefs[]{
                  ...,
                  _type == "internalLink" => {
                    "slug": @.reference->slug.en.current,
                    "lang": en
                  }
                }
              }
            }
          }
        }[0]`;

    const post = await client
      .fetch(query, { slug })
      .catch(err => this.error(500, err));
    return { post };
  }
</script>

<script>
	export let post;
	console.log(post)
</script>

<svelte:head>
	<title>{post.title.en}</title>
	<link rel="stylesheet" href={post.css} >
</svelte:head>

<article>
	<h1>{post.title.en}</h1>

	{#each post.sections as section}
		<section>
			<h2>{section.heading.en}</h2>
			<BlockContent blocks={section.content.en} {serializers} />
		</section>
	{/each}
</article>
