// import { Home } from "tabler-icons-react";
import { Bleed } from 'nextra-theme-docs';
import dynamic from 'next/dynamic'
import Link from 'next/link'
import Section, { darkColor, lightColor } from './Section';
import { PlayerPlay } from 'tabler-icons-react';

// const NetworkGraph = dynamic(() => import('../components/NetworkGraph'), { ssr: false })

const linkStyle = {
  display: 'block',
  margin: '1rem',
  border: '1px solid #0CBAFF',
  // borderColor: theme.color,
  width: 'fit-content',
  padding: '1rem',
  borderRadius: '1.5rem',
  fontWeight: 'bold',
};

const sectionStyle = {
  // margin: "1rem 0",
  // background: "linear-gradient(90deg, #64009E 0%, #0CBAFF 100%)",
  // background: "rgb(48, 52, 58)",
  // background: "-webkit-linear-gradient(#64009E, #0CBAFF)",
  textAlign: 'center',
  // height: '20rem',
  color: lightColor,
  paddingTop: "1rem",
  paddingBottom: "1rem",
  background: darkColor,
};

const bannerStyle = {
  padding: '2rem',
  height: '100%',
  fontSize: "2rem",
  fontWeight: "bold",
  maxWidth: "50rem",
  margin: "auto",
};

const content = [
  {
    title: "Self-hosted",
    description: "A visual representation of your microservice architecture.",
    image: '/2023-08-15-13-17-49.png',
  },
  {
    title: "Lorem Ipsum",
    description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    image: '/2023-08-15-13-17-49.png',
    // children: (
    //   <Link href="/case-study" style={linkStyle} >
    //     Read Case Study
    //   </Link>
    // )
  },
  {
    title: "Foo Bar",
    description: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    image: '/2023-08-15-13-17-49.png',
  },
  {
    title: "Lorem Ipsum",
    description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    image: '/2023-08-15-13-17-49.png',
  },
  {
    title: "Bar Foo Bar",
    description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex esse cillum dolore eu fugiat nulla pariatur.",
    image: '/2023-08-15-13-17-49.png',
  },
]


const HomePage = () => {
  return (
    <div>
      {/* <img style={{ margin: "auto" }} */}
      {/* src={"/transparent-logo-horizontal-mn.svg"} alt="logo" /> */}
      <section style={sectionStyle}>
        <div style={bannerStyle} >
          <span style={{
            // WebkitTextFillColor: "transparent",
            // WebkitBackgroundClip: "text",
            // background: "-webkit-linear-gradient(#64009E, #0CBAFF)"
            color: "#0CBAFF",
            // fontSize: "3rem",
            // color: 'white',
          }}>Signet</span> is an open-source, self-hosted framework for spec-driven contract testing of microservices.
        </div>
        <div style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "1rem",
        }}>
          <Link href="/case-study" style={linkStyle} >
            <PlayerPlay style={{ display: "inline" }} /> Watch Tech Talk
          </Link>
          <Link href="/case-study" style={linkStyle} >
            Read Case Study
          </Link>
        </div>
      </section>

      {/* <section style={{
        ...sectionStyle,
        background: "rgb(243 244 246)",
        color: "rgb(28, 30, 33)",
      }}> */}
      {/* <div style={bannerStyle} >
          A visual representation of your microservice architecture.
        </div> */}
      {/* </section> */}

      {/* <div
        style={{ border: "1px solid black", width: "50%", marginLeft: "1rem", }}
      >
        <NetworkGraph />
      </div> */}
      {/* <Section
        title="Self-hosted"
        description="A visual representation of your microservice architecture."
        image={'/2023-08-15-13-17-49.png'}
        index={0}
      />
      <Section
        title="Lorem Ipsum"
        description="Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. "
        image={'/2023-08-15-13-17-49.png'}
        index={1}
      /> */}

      {content.map((item, index) => (
        <Section
          key={index}
          title={item.title}
          description={item.description}
          image={item.image}
          index={index}
        >
          {item.children}
        </Section>
      ))}
      <Section
        key={content.length + 1}
      >
        Created by
        <span>
          {" Foo"}
        </span>
      </Section>
    </div >
  )
}

export default HomePage;
