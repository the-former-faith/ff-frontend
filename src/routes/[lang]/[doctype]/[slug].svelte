<script context="module">
  import client from '$lib/scripts/sanityClient'
  import DocumentLayout from '$lib/components/layout/DocumentLayout.svelte'
  import groq from 'groq'
  import { footnotes } from '$lib/scripts/stores'
  import { convertToCamelCase } from '$lib/scripts/utilities'

  export async function load({ page }) {
    const { slug, doctype } = page.params

    const doctypeCamelCase = convertToCamelCase(doctype)

    const query = groq`*[_type == $doctypeCamelCase && slug.en.current == $slug]{
      _id,
      title,
      theme,
      "authors": authors[]->,
      mainImage->,
      file->,
      narrations[]{
        ...,
        file {
          asset->
        }
      },
      parent->,
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
            _type == "personLink" => {
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

    const res = await client.fetch(query, { slug, doctypeCamelCase }).catch((err) => this.error(404, err))

    if (res) return { props: { doc: await res, slug: slug } }
  }
</script>

<script>
  export let doc
</script>

<DocumentLayout {doc}>
  <!--<p>Read the full post <a href={doc.source}>here</a>.</p>-->
</DocumentLayout>
