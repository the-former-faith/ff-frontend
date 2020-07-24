import React, { useState, useEffect } from 'react'
import BlockContent from '@sanity/block-content-to-react'
import Layout from '../../../components/Layout'
import ThemeWrapper from '../../../components/ThemeWrapper'
import sanity from '../../../config/sanity'
import localize from '../../../utils/localize'
import FootnotesContext from '../../../context/FootnotesContext'

function Post(props) {
  const [serializers, setSerializers] = useState({})
  const [footnotes, setFootnotes] = useState([])
  const theme = props.unfilteredPost.theme
  const {unfilteredPost} = props
  const post = localize(unfilteredPost, [props.lang, 'en'])

  return (
    <FootnotesContext.Provider value={[footnotes, setFootnotes]}>
      <ThemeWrapper theme={theme} setSerializers={setSerializers}>
        <Layout>
          <article>
            <h1>{post.title}</h1>
            {post.imageUrl && <Image imgUrl={post.imageUrl} />}
            {post.sections.map(section => {
              return (
                <section key={section._id}>
                  <h2>{section.heading}</h2>
                  <BlockContent 
                    blocks={section.content} 
                    serializers={serializers}
                  />
                </section>
              )
            })} 
          </article>
        </Layout>
      </ThemeWrapper>
    </FootnotesContext.Provider>
  )
}


export async function getStaticProps({ params, preview = false }) {
  return {
    props: {
      unfilteredPost: await sanity.fetch(
        `*[_type == "post" && slug[$lang].current == $slug] {
          _id,
          title,
          theme,
          "sections": sections[]->{
            _id,
            heading,
            "content": content {
              ...,
              $lang: ${params.lang}[]{
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
                    "slug": @.reference->slug[$lang].current,
                    "lang": $lang
                  }
                }
              }
            }
          }
        }[0]`, 
        {lang: params.lang, slug: params.slug}
      )
    }
  }
}

export async function getStaticPaths() {
  const allPosts = await sanity.fetch(`*[_type == "post"]{slug[]}`)
  console.log(allPosts)
  return { 
    paths:
      allPosts?.map((post) => ({
        params: {
          slug: post.slug.en.current,
          lang: 'en'
        },
      })) || [],
    fallback: true,
  }
}

/*
export async function getStaticPaths() {
  const allPosts = await sanity.fetch(`*[_type == "post"]{slug[]}`)
  console.log(allPosts[0].slug.en.current)
  return { 
    paths: [
      {params: {lang: 'en', slug: 'faith'}}
    ],
    fallback: true,
  }
}*/

export default Post