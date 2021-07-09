<script context="module">
  import client from '../../../sanityClient'
  //import { clientWithToken } from '../../../sanityClient'
  import DocumentLayout from '../../../components/DocumentLayout.svelte'
  import groq from 'groq'
  import { footnotes } from '../../../stores'

  export async function load({ page }) {
    const { slug } = page.params
    const query = groq`*[_type == "newspaperArticle" && slug.en.current == $slug]{
      _id,
      title,
      theme,
      "authors": authors[]->,
      file->,
      parent->,
      ...,
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
          _type == "imageObject" => {
            ...,
            imageDoc-> {
              ...
            }
          },
          _type == "newspaperArticleObject" => {
            ...,
            embed -> {
              file {
                ...,
                asset->
              }
            }
          },
          _type == "mapObject" => {
            ...,
            embed -> {
              ...,
              points[]-> {
                ...,
                mainImage-> {
                  file
                },
                "coordinates": location-> {
                  ...coordinates
                }
              }
            }
          },
          markDefs[]{
            ...,
            _type == "internalLink" => {
              "slug": @.reference->slug.en.current,
              "lang": en,
              "type": @.reference->_type,
            },
            _type == "footnote" => {
              ...,
              "citations": citations[]{
                ...,
                "source": source-> {
                  ...,
                  parent-> {
                    title
                  },
                  "authors": authors[]-> {
                    title
                  }
                }
              }
            }
          }
        }
      },
      ...
    }[0]`

    footnotes.update(() => [])

    const post = await client.fetch(query, { slug }).catch((err) => this.error(404, err))
    //const post = await clientWithToken.fetch(query, { slug }).catch((err) => this.error(404, err))

    return { post, slug }
  }
</script>

<script>
  export let post
</script>

<DocumentLayout {post} />
