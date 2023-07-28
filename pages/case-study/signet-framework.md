# Introducing Signet

As small companies experience growth, maintaining a scalable and reliable microservices architecture becomes crucial.
Development teams working on interdependent microservices need a robust contract testing framework to ensure API compatibility and effective collaboration.

Signet is an open-source, self-hosted framework for spec-driven contract testing that addresses these challenges.

## Contract Testing, Simplified

Signet is designed for small startups looking to scale their operations with microservices.
As a self-hosted option, it helps companies save on managed service costs.
It also eliminates the need for complex DIY solutions, making setting up contract testing much simpler.

With its spec-driven design, Signet provides an efficient and standardized testing approach for development teams.
It promotes seamless collaboration, early issue detection, and reliability, making it ideal for fostering growth and dependability in microservices.

## Key Advantages and Core Features

Signet offers several key advantages compared to other solutions.
Being open-source and self-hosted, developers can directly review and contribute to its source code, providing customization and flexibility for small companies.
By self-hosting Signet, companies gain complete ownership of their testing environment and data, ensuring full control and easy integration with their existing infrastructure.

Moreover, one of Signet's key strengths lies in its ease of adoption.
With automatic consumer contract generation, there's no need to write new unit tests, saving on time and resources.
Further, organizations can deploy the Signet broker to their existing AWS cloud with a single command.
The Signet CLI provisions an ECS Fargate cluster along with all of the necessary supporting infrastructure.
This deployment strategy makes it easy for teams to scale Signet as needed.

**(maybe) TODO: AWS diagram here?**

Signet makes it easy to adopt contract testing, empowering teams to focus more on delivering features and improvements.

### Accelerating Development with Spec-Driven Contract Testing

Adopting a spec-driven approach offers significant advantages.
Spec-driven contract testing promotes **parallel development**, allowing multiple teams to work independently on different microservices.
By ensuring that each service aligns with the expected specifications, this approach accelerates the overall development process, enabling companies to rapidly deliver new features and updates.

### Core Features

At its core, Signet offers five powerful features that streamline contract testing and enable smooth deployments.

#### Broker in Charge

Signet's dedicated broker simplifies the testing process by providing essential logic and features, eliminating the need to build them from scratch.
The Signet broker ensures a reliable and efficient environment for contract testing by automatically testing consumer and provider services for compatibility.

#### Boosted Development with Automated Contract Generation

The manual creation of consumer contracts can be a time-consuming and error-prone process.
Signet's automated consumer contract generation saves developers time and effort by generating contracts from existing unit tests.
This non-code invasive approach enables effortless integration into existing systems.

#### Streamlined CI/CD Integration

Signet easily integrates with automated CI/CD pipelines through its user-friendly command line interface (CLI).
The Signet broker also provides event-based webhooks, allowing two-way communication throughout the release cycle.
Together, these features make Signet a straightforward choice for adding contract testing to automated workflows.

#### Enhanced Confidence through Provider Verification

In addition to testing that consumer services are compatible with provider specifications, Signet goes one step further and automatically tests whether provider services properly implement their API specifications.
This provider verification process gives teams greater confidence that their services will work together as expected when deployed.

#### Deploy Smarter with Deploy Guard

Ensuring a smooth transition when rolling out a new service requires careful consideration of **compatibility with other services** within the same environment.

Enter Signet's **Deploy Guard**, boasting an intuitive interface that makes it easy to check whether it is safe to deploy a service.
Deploy Guard checks that all of the service's external dependencies are present in the environment, and that they are compatible.
It also ensures that the new service won't break any services that rely on it.

The best part is that Deploy Guard is also available through the CLI, enabling the CI/CD pipeline to proactively prevent the introduction of any breaking changes.
