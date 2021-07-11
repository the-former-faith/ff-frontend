<script context="module">
  import client from '$lib/scripts/sanityClient'
  //import { clientWithToken } from '../../../sanityClient'
  import DocumentLayout from '$lib/components/layout/DocumentLayout.svelte'
  import groq from 'groq'
  import { footnotes } from '$lib/scripts/stores'


  export async function load({ page }) {
    const { slug } = page.params
    const query = groq`*[_type == "post" && slug.en.current == $slug]{
      _id,
      title,
      theme,
      "authors": authors[]->,
      mainImage->,
      ...,
      content {
        "en": en[]{
          ...,
          _type == "audioObject" => {
            ...,
            embed -> {
              ...,
              cover {
                asset->
              },
              "files": files[] {
                asset->,
                ...
              },
              "transcriptions": transcriptions[] {
                transcription {
                  asset->,
                  ...
                }
              }
            }
          },
          _type == "videoObject" => {
            ...,
            embed -> {
              ...,
              cover {
                asset->
              },
              "files": files[] {
                asset->,
                ...
              },
              "transcriptions": transcriptions[] {
                transcription {
                  asset->,
                  ...
                }
              }
            }
          },
          _type == "blockQuoteObject" => {
            ...,
            "source": source {
              ...,
              "author": author->
            }
          },
          _type == "imageObject" => {
            ...,
            embed -> {
              file {
                ...,
                asset->
              }
            }
          },
          _type == "newspaperArticleObject" => {
            ...,
            embed -> {
              ...,
              parent->,
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

    const res = await client.fetch(query, { slug }).catch((err) => this.error(404, err))
    //const post = await clientWithToken.fetch(query, { slug }).catch((err) => this.error(404, err))

    if (res) return { props: { post: await res, slug: slug } }

    return {
      status: res.status,
      error: new Error()
    }
  }
</script>

<script>
  export let post
</script>

<DocumentLayout {post} />
