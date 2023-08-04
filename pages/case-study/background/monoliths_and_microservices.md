# Of Monoliths and Microservices

Signet addresses specific challenges with testing applications composed of microservices.
In order to add color to these challenges, we will begin by discussing relevant trade-offs associated with microservices, especially compared with a more common *monolithic* architecture.

## What is a Monolith?

In a **monolithic architecture**, all of an application's server-side business logic is deployed together as a single unit.
Typically, this means that each business domain is modeled by one or more programming constructs (such as a class, namespace, module, or package) that are stored in a shared repository.
When deployed, the server-side logic runs as a single process.
Each business domain can consume the functionality of other domains through in-memory method calls.

![](../../../assets/monolith.png)

Monoliths are a sensible default architecture, and they are especially suitable for small applications at an early stage of business development.
Such companies tend to be unstable in terms of their business requirements -- many adapting significantly before finding their long-term market niche.
Monoliths cater to this instability because modeling business domains through programming constructs makes them easy to re-architect.
More precisely, they are easier to re-architect than if they were modeled by compute and network infrastructure components, as they are in some other architectural patterns.

Monoliths also allow for a simpler deployment strategy, since the server-side logic usually runs in a single process. Each instance of the application can be hosted on a single node, and execute all of its business logic in-process, making it simpler to handle requests quickly and reliably.

Monoliths become more challenging to work with as the codebase and number of engineers grows in size.
Working on a large codebase requires an engineer to familiar with a lot of code, and to keep that knowledge in their head as they make changes.
With so much to keep track of, it is easy to change something that unintentionally breaks another part of the codebase.
Engineers also need to coordinate their changes with everyone else who is working on the codebase. If multiple features are being developed simultaneously, they may not work properly when integrated together.

A consequence of the application consisting of a single unit of deployment is that deployment can become a high-risk activity.
Anytime an update needs to be made, no matter how small it is, the entire application must be torn down and redeployed.
While there are a number of strategies to mitigate the risks associated with this and reduce or eliminate downtime, there still remains a chance that the entire application is affected by a bug that is introduced in the process.

Although there are many examples of large organizations that have a monolith, other architectures exist which offer a different set of trade-offs that are specifically tailored to operating at a large scale.

## What are Microservices?

In a **microservice architecture**, the application is split up into *independently deployable services*. Each service typically represents a single business domain.

A **service** can be thought of as a standalone unit of software that encapsulates its own logic.
A service exposes an interface so that other services or applications can consume its functionality through messages sent over the network.

<!-- ![](../../../assets/robots.svg) -->
![](../../../assets/microservices.png)

### Benefits of Microservices

Well-designed microservices enable high scalability, while also allowing teams to ship new features quickly.

A key characteristic of a well-designed microservice architecture is the *independent deployability* of its services.
**Independent deployability** means that each service can be updated and re-deployed independently of other services.
Changing one service should not require other services to change in lock-step, and each team should be able to re-deploy their services without coordinating with other teams.
Services can thus evolve independently as long as their API’s remain backwards-compatible.
This allows an organization to ship new features quickly even as the size of the application grows.

Microservices also promote **clear boundaries of ownership**.
Each team of engineers is responsible for one or more microservices and only need to know how their own services are implemented.
This gives teams a narrow scope, allowing them to own the full life-cycle of their services, from development, to testing and deployment, to post-deployment monitoring.

## Testing Microservices

In order to realize the benefits of microservices, care must be taken to ensure that independent deployability and clear boundaries of ownership are maintained throughout the development life cycle. In the next section we will examine why it is difficult to protect these benefits when testing the integration of multiple services.
