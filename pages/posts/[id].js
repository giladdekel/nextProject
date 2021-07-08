import Layout from '../../components/layout'
import Head from 'next/head'
import Date from '../../components/date'
import utilStyles from '../../styles/utils.module.css'
import { getAllPostIds, getPostData } from '../../lib/posts'


import React from 'react';
// import { Button } from '@material-ui/core';
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';




export async function getStaticProps({ params }) {
  console.log("params",params);
  const postData = await getPostData(params.id)
  console.log("postData:", postData);
  return {
    props: {
      postData
    }
  }
}

export async function getStaticPaths() {
  const paths = getAllPostIds()
  console.log("paths:",paths);
  return {
    paths,
    fallback: false
  }
}



export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      
      <article>
      <Button variant="contained" color="primary">Hello World</Button>
      <meta
    name="viewport"
    content="minimum-scale=1, initial-scale=1, width=device-width"
      />
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  )
}