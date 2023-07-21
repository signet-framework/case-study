import React from 'react'
import { DocsThemeConfig } from 'nextra-theme-docs'

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
  }
}

export default config
