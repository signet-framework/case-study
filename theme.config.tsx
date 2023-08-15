import React from 'react'
import { DocsThemeConfig } from 'nextra-theme-docs'
import { useRouter } from 'next/router'

const config: DocsThemeConfig = {
  logo: (<>
    <img src={"/signet-logo-only.svg"} style={{ maxHeight: "5rem" }} alt="logo" />
    <span style={{
      fontSize: "2rem",
      // color: "linear-gradient(90deg, #64009E 0%, #0CBAFF 100%)"
      color: "#0CBAFF"
    }}>
      Signet
    </span>
  </>),
  project: {
    link: 'https://github.com/signet-framework/',
  },
  docsRepositoryBase: 'https://github.com/signet-framework/case-study',
  footer: {
    text: '',
  },
  editLink: {
    text: null,
  },
  feedback: {
    content: null
  },
  head: (
    <>
      <link rel="icon" type="image/ico" href={"/signet-favicon-transparent.ico"} />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet" />
    </>
  ),
  sidebar: {
    defaultMenuCollapseLevel: Infinity,
  },
  // banner: {
  //   dismissible: true,
  //   text: (
  //     <a href="https://github.com/signet-framework/signet-broker" target="_blank">
  //       🎉 Signet 1.0 is released. Read more →
  //     </a>
  //   )
  // },
  useNextSeoProps() {
    const { asPath } = useRouter()
    if (asPath !== '/') {
      return {
        titleTemplate: '%s - Signet'
      }
    } else {
      return {
        title: 'Signet Framework'
      }
    }
  },
  darkMode: false,
  nextThemes: {
    defaultTheme: 'dark',
  }
}

export default config
