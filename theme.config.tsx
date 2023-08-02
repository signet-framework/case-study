import React from 'react'
import { DocsThemeConfig } from 'nextra-theme-docs'
import { useRouter } from 'next/router'

const config: DocsThemeConfig = {
  logo: (<>
    <img src={"/transparent-logo-horizontal-mn.svg"} style={{ maxHeight: "5rem" }} alt="logo" />
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
    </>
  ),
  // sidebar: {
  //   defaultMenuCollapseLevel: Infinity,
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
  }
}

export default config
