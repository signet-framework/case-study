# Introducing Signet

As small companies experience growth, maintaining a scalable and reliable microservices architecture becomes crucial.
Development teams working on interdependent microservices need a robust contract testing framework to ensure API compatibility and effective collaboration.

Signet is an open-source, self-hosted framework for spec-driven contract testing that addresses these challenges.

## Contract Testing, Simplified

Signet is designed for small startups looking to scale their operations with microservices.
As a self-hosted option, it helps companies save on managed service costs.
It also eliminates the need for complex DIY solutions, making setting up contract testing much simpler.

With its spec-driven design, Signet ensures an efficient and standardized testing approach for development teams.
It promotes seamless collaboration, early issue detection, and reliability, making it ideal for fostering growth and dependability in microservices.

## Key Advantages and Core Features

Signet offers several key advantages compared to other solutions.
Being open-source and self-hosted, developers can directly review and contribute to its source code, providing customization and flexibility for small companies.
By self-hosting Signet, companies gain complete ownership of their testing environment and data, ensuring full control and easy integration with their existing infrastructure.

Moreover, one of Signet's key strengths lies in its ease of adoption.
With automatic consumer contract generation, there's no need to write new unit tests, saving on time and resources.
Further, Signet automatically deploys to AWS with a single command.

This simplified onboarding process empowers teams to focus more on delivering features and improvements, streamlining their development workflow.

### Accelerating Development with Spec-Driven Contract Testing

Adopting a spec-driven approach offers significant advantages.
Spec-driven contract testing promotes **parallel development**, allowing multiple teams to work independently on different microservices.
By ensuring that each service aligns with the expected specifications, this approach accelerates the overall development process, enabling companies to rapidly deliver new features and updates.

### Core Features

At its core, Signet offers five powerful features that streamline contract testing, ensure smooth deployments, and provide an optimal testing environment for development teams working with microservices.

#### Broker in Charge

Signet's feature-rich dedicated broker simplifies the testing process by providing essential logic and features, eliminating the need to build them from scratch.
The Signet broker automatically compares contracts and specifications upon publication, quickly identifying and addressing any discrepancies.
This ensures a reliable and efficient environment for contract testing.

#### Boosted Development with Automated Contract Generation

The manual creation of consumer contracts can be a time-consuming and error-prone process.
Signet's automated consumer contract generation saves developers time and effort by generating contracts from existing unit tests.
This non-code invasive approach enables seamless integration into existing systems.

#### Streamlined CI/CD Integration

Signet easily integrates with automated CI/CD pipelines through its user-friendly command line interface (CLI).
The Signet broker also provides event-based webhooks, allowing real-time communication throughout the release cycle.
Together, these features make Signet a straightforward choice for adding contract testing to automated workflows.

#### Enhanced Confidence through Provider Verification

In addition to testing the compatibility of consumer contracts and provider specifications, Signet goes one step further and automatically tests whether provider services properly implement their API specifications.
This provider verification process gives teams greater confidence that their services will work together as expected when deployed.

#### Deploy Smarter with Deploy Guard

Ensuring a smooth transition when rolling out a new service requires careful consideration of **compatibility with other services** within the same environment.

Enter Signet's **Deploy Guard**, boasting an intuitive interface that simplifies the process of verifying two critical aspects.
First, it checks for the presence of compatible versions of your dependencies, ensuring seamless functionality of your service.
Second, it assesses the potential impact on other services that rely on it, avoiding any disruptive consequences.

The best part is that this capability is also available through the CLI, allowing you to integrate these checks into your CI/CD pipeline and proactively prevent the introduction of any breaking changes.