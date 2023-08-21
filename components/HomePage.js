// import { Home } from "tabler-icons-react";
import { Bleed } from "nextra-theme-docs";
// import dynamic from "next/dynamic";
import Link from "next/link";
import Section, { darkColor, lightColor } from "./Section";
import { PlayerPlay } from "tabler-icons-react";
import Team from "./Team";

// const NetworkGraph = dynamic(() => import('../components/NetworkGraph'), { ssr: false })

const linkStyle = {
  display: "block",
  margin: "1rem",
  border: "1px solid #0CBAFF",
  // borderColor: theme.color,
  width: "fit-content",
  padding: "1rem",
  borderRadius: "1.5rem",
  fontWeight: "bold",
};

const sectionStyle = {
  // margin: "1rem 0",
  // background: "rgb(48, 52, 58)",
  // background: darkColor,
  background: "linear-gradient(143deg, #64009E 40%, #0CBAFF 100%)",
  // background: "-webkit-linear-gradient(#64009E, #0CBAFF)",
  textAlign: "center",
  // height: '20rem',
  color: lightColor,
  paddingTop: "1rem",
  paddingBottom: "1rem",
};

const bannerStyle = {
  padding: "2rem",
  height: "100%",
  fontSize: "2rem",
  fontWeight: "bold",
  maxWidth: "50rem",
  margin: "auto",
  minHeight: "15rem",
  marginTop: "3rem",
};

const content = [
  {
    tag: "Contract Broker",
    title: "Central Hub for Contract Management",
    description:
      "The Signet Broker manages your contracts and presents a user-friendly interface to explore test results.",
    image: "/web_gui.png",
    image: (
      // <iframe
      //   id="inlineFrameExample"
      //   title="Inline Frame Example"
      //   width="560"
      //   height="464"
      //   src="https://signet-broker-wfq99.ondigitalocean.app/"
      // ></iframe>
      <video
        src="/broker_demo.mp4"
        autoPlay
        playsInline
        // pre="auto"
        // controls="false"
        loop
        style={{
          // objectFit: "scale-down",
          maxWidth: "min(100%, 35rem)",

          maxHeight: "20rem",
          marginTop: "auto",
          marginBottom: "auto",
          borderRadius: "0.5rem",
          // margin: "auto auto",
          // maxWidth: "35rem",
        }}
      ></video>
    ),
  },
  {
    tag: "Spec-driven",
    title: "Painless Integration Testing",
    description:
      "Signet naturally aligns with spec-first API design. Develop in parallel, test in isolation.",
    image: "/contract_testing.png",
    // image: "/spec-driven.png",
  },
  {
    tag: "Per-Environment Safety Check",
    title: "Deploy with Confidence",
    description: `Signet's Deploy Guard keeps track of deployments and notifies you when a deployment will break something.`,
    // image: "/deploy_guard_logo.png",
    // imgStyle: {
    //   maxHeight: "5rem",
    // },
    image: (
      <img
        style={{
          objectFit: "scale-down",
          maxWidth: "min(100%, 35rem)",
          maxHeight: "20rem",
          // maxWidth: "35rem",
          marginTop: "auto",
          marginBottom: "auto",
          borderRadius: "0.5rem",
          flex: "1 1 auto",
        }}
        src={"/deploy_guard_logo.png"}
      />
    ),
  },
  {
    tag: "Self-hosted",
    title: "Automated Deployment to AWS",
    description:
      "Deploy the Signet broker to your AWS cloud with a single command.",
    image: "/aws.png",
  },
  {
    tag: "CI/CD integration",
    title: "Fully Automated Testing",
    description: `Give your CI/CD pipeline complete control of contract testing through the Signet CLI and webhooks from the Broker.`,
    // image: "/ci_cd.png",
    image: (
      <img
        style={{
          objectFit: "scale-down",
          maxWidth: "min(100%, 35rem)",
          maxHeight: "20rem",
          // maxWidth: "35rem",
          marginTop: "auto",
          marginBottom: "auto",
          borderRadius: "0.5rem",
          flex: "1 1 auto",
        }}
        src={"/ci_cd.png"}
      />
    ),
    layout: "vertical",
  },
  {
    tag: "Easy to Adopt",
    title: "No Need to Write New Tests", // was "hands-off approach before"
    description: `Signet tests API clients by recording the network calls they make during service testing.`,
    image: "/signet_proxy.png",
  },
  // {
  //   tag: "API Verification",
  //   title: "Automatically Generate API Tests",
  //   description:
  //     "Signet parses OpenAPI specifications and generates tests to run against service APIs.",
  //   image: "/provider_verification.png",
  // },
];

const HomePage = () => {
  return (
    <div>
      {/* <img style={{ margin: "auto" }} */}
      {/* src={"/transparent-logo-horizontal-mn.svg"} alt="logo" /> */}
      <section style={sectionStyle}>
        <div style={bannerStyle}>
          <h1 style={{ marginBottom: "3rem", fontSize: "2.8rem" }}>
            Deploy with Confidence
          </h1>
          <span
            style={{
              // WebkitTextFillColor: "transparent",
              // WebkitBackgroundClip: "text",
              // background: "-webkit-linear-gradient(#64009E, #0CBAFF)"
              color: "#0CBAFF",
              // fontSize: "3rem",
              // color: 'white',
            }}
          >
            Signet
          </span>{" "}
          is an easy to use{" "}
          {/* <span
            style={{
              // WebkitTextFillColor: "transparent",
              // WebkitBackgroundClip: "text",
              // background: "-webkit-linear-gradient(#64009E, #0CBAFF)"
              color: "#0CBAFF",
              // fontSize: "3rem",
              // color: 'white',
            }}
          > */}
          spec-driven
          {/* </span> */} framework for contract testing of microservices.
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "1rem",
          }}
        >
          <Link
            href="https://youtu.be/ZEplW02w22A"
            target="_blank"
            style={linkStyle}
          >
            <PlayerPlay style={{ display: "inline" }} /> Watch Tech Talk
          </Link>
          <Link href="/case-study" style={linkStyle}>
            Read the Case Study
          </Link>
        </div>
      </section>

      {content.map((item, index) => (
        <Section
          key={index}
          title={item.title}
          description={item.description}
          image={item.image}
          index={index}
          tag={item.tag}
          imgStyle={item.imgStyle}
          layout={item.layout}
        >
          {item.children}
        </Section>
      ))}
      <section
        // style={{ ...sectionStyle, background: "rgb(48, 52, 58)" }}
        style={{ ...sectionStyle, background: "rgb(223, 223, 223)" }}
        key={content.length + 1}
        index={content.length}
      >
        <Team theme={content.length % 2 === 0 ? "light" : "dark"} />
      </section>
    </div>
  );
};

export default HomePage;
