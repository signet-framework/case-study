We built the Signet framework to address a specific set of challenges with testing applications composed of microservices. Before exploring those challenges, it may be helpful to set some context for what a microservice architecture is, so that we can more clearly explore why they are challenging to test. Understanding the characteristics of microservices, especially when compared to monolithic applications is key to understanding the trade-offs that Signet has made.

## What is a monolith?

In a **monolithic** architecture, all of the application's business logic is deployed together as a single unit. Typically this means that the code responsible for different business domains is stored in the same repository, and is run as a single operating system process. When one piece of domain logic needs to access the functionality of another, it imports the programming construct for that domain (namespace, class, etc.), and interacts with it through in-memory method calls.


### Advantages of monoliths

A monolithic architecture is a great choice for many applications. Its characteristics make it especially well-suited for small to medium sized applications managed by a single team.

A key benefit of monoliths is that they enable a high degree of **evolvability** for modestly sized applications. Evolvaliblity refers to how easy it is to update the application to address new use cases as business requirements change. (DDIA pg. 47) Well-designed monoliths can be highly evolvable because each business domain is modelled by a programming construct (function, class, or module) rather than a distinct piece of infrastructure. As the needs of a business change, is easier to re-architect programming constructs than it is to re-design infrastructure.

Running all of the business logic in the same process also makes it easier to develop features that cut accress business domains. The functionality (or programming construct?) for each domain is available in memory, and can be easily imported and invoked as needed. This also means that engineers only need to work with a single tech stack, which can reduce the cognitive load involved in development.

Deploying a monolith requires less operational overhead than deploying applications with multiple deployable units. This frees up engineers to focus more effort on developing business logic instead of managing complex deployments.


### Challenges with monoliths

Monoliths become more challenging to work with as the codebase and number of engineers grows in size. Working on a large monolith requires an engineer to be knowledgable about a large amount of code, and to keep this knowledge in their head as they make changes. It is easy to change something that unintentionally breaks other parts of the codebase.

If there are many engineers working on the same codebase, making changes can require a significant amount of coordination. If one person makes a change that affects another person's code, or two people update the same code in different ways, they must work together to resolve the conflicts before their changes can be integrated and deployed.

When the application consists of a single deployable unit, even deploying small changes becomes a high-risk activity. This incentivises teams to batch together multiple updates in every new deployment--decreasing the rate at which features can be shipped, and increasing the risk that critical bugs are released into production. 

Although there are many examples of large organizations who have a monolithic architecture, other architecture exist which offer a different set of trade-offs that are specifically tailored to operationg at a large scale.

Even though there are many examples of large, successful applications which are monolithic, the characteristics of monoliths lend themselves well to smaller applications managed by a single team. Microservices are another popular architecture which are specifically designed to meet the needs of large and/or highly scalable applications.


## What are microservices?

In a microservice architecture, the business logic is split up into independently deployable **services**, each of which represents a seperate business domain. A service can be thought of as a miniature application which encapsulates its own business logic and data. A service exposes an interface so that other services can consume its functionality through messages sent over the network.


### Advantages to microservices

The fact that each microservice models an individual business domain has numerous advantages for large or fast-scaling applications.

Microservices make it easy for teams to clearly identify the parts of the application they are responsible for. Each team only needs to concern themselves with the implementation details of their own service(s). In many cases, this allows a team to own the full life-cycle of their service(s), from development, to testing and deployment, to post-deployment observability (monitoring?).

Since each service can be deployed on its own infrastructure with its own runtime environment, services can be implemented in whatever way is most suitable for their business requirements. 
Services can use different tech stacks according to the trade-offs they offer, and can be scaled independently according to load and performance requirements of their role. (maybe cut this para for signet specificity?)

**Independed deployability** may be the most important benefit of a microservices architecture. When one part of a business needs a new feature, the team responsible for that domain should be able to built the feature, and deploy a new version of their service without coordinating with any other teams. As long as a service does not change its external interface in a backwards-incompatible way, it can be built and deployed independently. This allows an organization to ship new features quickly even as the size of the application grows.


### Challenges with microservices

Microservies are intended to address the needs of applications that need to scale quickly and to a large size. They are less suitable for small applications, especially when a business is new and requirements are not known with a high degree of confidence.

For a single team that is responsible for managing the entire application, microservices add unnecessary complixity. Having multiple units of deployment requires additional infrastructure, and more coordination to release broadly-scoped features. In addition, requiring different domains of business logic to interact through network calls instead of in-memory method calls introduces more unreliability and latency.

For newer businesses with unstable requirements, microservices decrease the potential evolvability of the app when compared to a monolithic architecture. It has hard to know with confidence what the business domains will be before the business is well established. Microservices provide significant evolvability for individual business domains, but re-architecting the entire application can be much more difficult compared to a monolith.


-----
## Testing microservices


The benefits of microservices are taylored to large applications with many engineers, or medium sized applications which require high scalability and evolvability. Just having this architecture does not guarentee these benefits however. Care must be taken to ensure that independent deployability and clear ownership are maintained through the development life cycle. Testing is an area that can be especially troublesome, and requires adaptation from the traditional strategies for testing monoliths.