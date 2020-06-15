import React from "react"
import Helmet from 'react-helmet';
import { graphql } from 'gatsby'
import Layout from "../components/layout"
import PostLink from "../components/post-link"
import HeroHeader from "../components/heroHeader"
import "./index.css"

const IndexPage = ({
  data: {
    site,
    allMarkdownRemark: { edges },
  },
}) => {

  const [repos, setRepos] = React.useState([]);

  const Posts = edges
    .filter(edge => !!edge.node.frontmatter.date) // You can filter your posts based on some criteria
    .map(edge => <PostLink key={edge.node.id} post={edge.node} />)

  React.useEffect(() => {
    fetch(`https://api.github.com/users/ogbiyoyosky/repos`,{
      method: "GET",
      headers: {
        Accept: "application/vnd.github.cloak.preview"
      }
    })
    .then(res=> res.json())
    .then((data)=>{
      setRepos(data)
      console.log(repos)
    }).catch(error => console.log(error))
  })
  const slicedRepo = repos
  return (
    <Layout>
      <Helmet>
        <title>{site.siteMetadata.title}</title>
        <meta name="description" content={site.siteMetadata.description} />
      </Helmet>
      <HeroHeader/>
      <h2>Blog Posts &darr;</h2>
      <div className="grids">
        {Posts}
      </div>
      <h2 className="mt-4">Featured Projects &darr;</h2>



  <section class="github-repos">
    <div class="github-repo_grid grids">
      { slicedRepo.map((repo, index) => (
   <article class="github-repo">
   <a href={repo.html_url} target="_blank" rel="noopener" class="d-block p-40">
     <p class="text-xs font-bold tracking-widest uppercase text-zenith">{repo.language}</p>
     <h3 class="mt-8 text-lg font-semibold leading-tight text-zenith">{repo.name}</h3>
      <p class="mt-8 text-dawn text-base">{repo.description}</p>
     <div class="flex items-center mt-16">
       <div class="w-16 h-16 p-2 mr-4"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 46.4 46.4"
           aria-hidden="true" class="w-full h-full -mt-px fill-current">
           <title>Star icon</title>
           <path
             d="M21.6 2c.3-.6.9-1 1.6-1 .7 0 1.3.4 1.6 1l5.8 11.7c.3.5.8.9 1.4 1l12.8 1.9c.7.1 1.2.6 1.4 1.2.2.6 0 1.4-.5 1.8l-9.3 9.1c-.4.4-.6 1-.5 1.6l2.2 12.9c.1.7-.2 1.4-.7 1.8-.6.4-1.3.5-1.9.1L24 39c-.5-.3-1.1-.3-1.7 0l-11.5 6.1c-.6.3-1.3.3-1.9-.1-.6-.4-.8-1.1-.7-1.8l2.2-12.9c.1-.6-.1-1.2-.5-1.6l-9.4-9c-.5-.5-.7-1.2-.5-1.8.2-.6.8-1.1 1.4-1.2l12.9-1.9c.6-.1 1.1-.5 1.4-1L21.6 2z">
           </path>
         </svg>
       </div>
      <span class="mt-2 text-xs font-semibold leading-none tracking-wider">{repo.stargazers_count}</span>
     </div>
   </a>
 </article>
  ))}
   
      
    </div>
  </section>
     
    </Layout>
  )
}

export default IndexPage
export const pageQuery = graphql`
  query indexPageQuery {
    site {
      siteMetadata {
        title
        description
      }
    }
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          id
          excerpt(pruneLength: 250)
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            path
            title
            thumbnail
          }
        }
      }
    }
  }
`
