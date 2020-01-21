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

Post.getInitialProps = async (req) => {
  return {
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