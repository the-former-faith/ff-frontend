import React, { useState, useEffect } from 'react'
import BlockContent from '@sanity/block-content-to-react'
import Layout from '../../../components/Layout'
import sanity from '../../../config/sanity'
import sanityClient from '../../../config/sanity'
import Serializers from '../../../components/Serializers'
import localize from '../../../utils/localize'

function Post(props) {
  const {unfilteredPost} = props
  const post = localize(unfilteredPost, [props.lang, 'en'])
  return (
    <Layout>
      <article>
        <h1>{post.title}</h1>
        {post.imageUrl && <Image imgUrl={post.imageUrl} />}
        {post.sections.map(section => {
          return (
            <section key={section._id}>
              <h2>{section.heading}</h2>
              <BlockContent blocks={section.content} serializers={Serializers(props)} />
            </section>
          )
        })} 
      </article>
    </Layout>
  )
}

Post.getInitialProps = async (req) => {
  return {
      unfilteredPost: await sanity.fetch(
        `*[_type == "post" && slug[$lang].current == $slug] {
          _id,
          title,
          "sections": sections[]->{
            _id,
            heading,
            "content": content {
              ...,
              $lang: ${req.query.lang}[]{
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
        {lang: req.query.lang, slug: req.query.slug}
      )
    }
}

export default Post