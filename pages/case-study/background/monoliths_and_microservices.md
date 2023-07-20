## What is a monolith?

In a **monolithic** architecture, all of the application's business logic is deployed together as a single unit. Typically this means that the code responsible for different business domains is stored in the same repository, and is run as a single operating system process. When one piece of domain logic needs to access the functionality of another, it imports the programming construct for that domain (namespace, class, etc.), and interacts with it through in-memory method calls. 


### Advantages of monoliths

A monolithic architecture is a great choice for many applications. It offers numerous advantages that make it especially well-suited for small to medium sized applications managed by a single team.

A key benefit of monoliths is that they enable a high degree of **evolvability** for modestly sized applications. Evolvaliblity refers to the ease with which the application can be updated to address new use cases as business requirements change. (DDIA pg. 47) Well-designed monoliths can be high evolvability because the business domains are represented by programming constructs (functions, classes, and modules) rather than pieces of infrastructure. As the shape of a business changes, is much easier to re-architect programming constructs than compute and network infrastructure. 

Becuase a monolith consists of a single unit of deployment, the deployment topology and infrastructure is much simpler than in more complex application architectures. This means that more energy can be directed towards developing the application's business logic. 

A side effect of the application running as a single process is that the engineering team only needs to be fluent in a single tech stack. This reduces the cognitive load on engineers and gives them more bandwidth for the logic they are implementing.

Another side effect of having the logic for each domain in the same process is that it is easier to build features that cut across business domains. The functionality for each domain is available in-memory to be accessed and invoked.


### Challenges with monoliths

Monoliths become more challenging to work with as the codebase and number of engineers grows in size. Working on a large monolith requires an engineer to be knowledgable about a large amount of code, and to keep this knowledge in their head as they make changes. The ease with which disparate programming constructs can be accessed and changed is a double-edged sword. It is easy to change something that unintentionally breaks other parts of the codebase. 

If there are many teams responsible for different parts of the codebase, making changes can require a lot of cross-team coordination. If one team makes a change that affects another team's code, or two teams need to update the same code in different ways, teams must work together to get the application back to a fully-functional state before deployment.

A consequence of the application consisting of a single unit of deployment is that deployment becomes a high-risk activity. Anytime an update needs to be made, no matter how small it is, the entire application must be torn down and redeployed. While there are a number of strategies mitigate the risks associated with this and reduce or eliminate downtime, there still remains a chance that a critical bug is introduced which affects the entire application.

Although there are many examples of large organizations who have a monolithic architecture, other architecture exist which offer a different set of trade-offs that are specifically tailored to operationg at a large scale.


## What are microservices?

In a microservice architecture, the business logic is split up into independently deployable **services**, each of which represents a seperate business domain. A service can be thought of as a miniature application which encapsulates its own business logic and data, and exposes an interface so that other services can consume its functionality over the network. 


### Advantages to microservices

The fact that each microservice models an individual business domain has numerous advantages for large applications. 

First, it neatly limits the scope that each engineering team is responsible for. Each team only needs to concern themselves with the implementation details of their own service(s). They can use the functionality provided by other services' APIs without worring about how those services are implemented.

Since each service is its own set of processes which merely exposes a network interface for other services to use, each service can be built in a way that best addresses the specific business needs of that domain. For instance, if the business functionality of a service is best implemented with a particular tech stack, the service can use that stack regardless of how other services in the application are built. In addition, if a given service has drastically different requirements for performance than other services, that service can be scaled independently of other services. 

**Independed deployability** is arguably the most important benefit of a microservices architecture. When one part of a business needs a new feature, the team responsible for that domain should be able to built the feature, and deploy a new version of their service without coordinating with any other teams. As long as a service does not change its external interface in a backwards-incompatible way, it can be built and deployed independently. This allows an organization to ship new features quickly even as the size of the application grows.


### Challenges with microservices

Microservies are intended to address the needs of applications that need to scale quickly and to a large size. They are less suitable for small applications, especially when a business is new and does not have an established shape.

For a single team whose scope of responsiblity is the entire application, microservices add unnecessary complixity. Having multiple units of deployment requires additional infrastructure, and more coordination to release broadly-scoped features. In addition, requiring different domains of business logic to interact through network calls instead of in-memory method calls introduces a new category of unreliability and latency.

For smaller applications, microservices decrease the potential evolvability of the app when compared to a monolithic architecture. It has hard to know with confidence what the business domains will be before the business is well established.

Microservices can also be challenging for newer businesses where the long term business domains are not know with confidence. Microservices provide significant evolvability for individual business domains, but re-architecting the entire application can be much more difficult compared to a monolith.


## Testing microservices

The benefits which are possible through microservices lend themselves well to large applications with a lot of engineers, or medium applications which require high scalability and evolvability. Just having this architecture does not guarentee these benefits however. Careful consideration must be given to the operations side of developement to ensure that independent deployability and isolated ownership are maintained. Testing is an area that can be especially troublesome, and requires adaptation from the traditional strategies for testing monoliths. 