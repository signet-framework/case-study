# Central Document Repository

## Single Source of Truth

A crucial characteristic of Deploy Guard is its **global consistency**, ensuring that running Deploy Guard for the consumer team yields the same results as if the provider team were running it.
Without global consistency, teams must face the challenge of resolving conflicts in Deploy Guard results.
Deploy Guard's results depend on the definitions of both the consumer contract and the provider specification.
Consequently, global consistency can only be achieved if Deploy Guard reads the documents from a **central repository**.
Reading documents from individual repositories of the consumer and provider teams introduces the risk of unsynchronized documents, leading to conflicting results in Deploy Guard.
While Github can serve as a central repository, we decided that developing a dedicated broker would be a more suitable approach as it allows us to provide features specific to contract testing. We'll discuss the tradeoffs of this decision in the following sections.

## The Positives

### Encapsulating Logic

With a dedicated broker, Signet's functionality is no longer confined within the Signet CLI.
Instead, the broker handles various tasks, including the logic for Deploy Guard.
This enables automatic fetching of data for documents and deployment states of consumer and provider versions.
If Github were the central repository, implementing automatic fetching would be challenging, and developers would have to manually provide Deploy Guard with data about documents and deployment states.

### Automatic Comparison

The Signet broker performs automatic comparisons between contracts and specifications as soon as they are published.
Each new contract undergoes comparison with all other specifications in the same integration, providing immediate feedback on backward compatibility.
In contrast, without a dedicated broker, developers must manually compare documents or write custom scripts for automation.

### Webhooks

The Signet broker offers webhooks that integrate into the CI/CD pipeline. For instance, developers can use Signet webhooks to trigger a provider build whenever a new specification is published.
While Github also provides webhooks, setting them up for these events requires more involvement and effort.

### Data Visualization and Querying

The Signet Broker provides both graph and table representations for data visualization and filtering.
This enables developers to swiftly identify service dependencies and find comparison results or documents for specific consumer or provider versions.
In contrast, using Github alone would necessitate relying on third-party software to achieve the same level of functionality.

## The Negatives

### Lack of Version Control Collaboration

One drawback of using the Signet broker is the absence of version control collaboration.
With Github, teams can leverage Github's pull request system to collaboratively manage changes on contracts and specifications.
By treating documents as code, teams can enforce collaboration by requiring approval from other teams for pull requests.

### Management and Maintenance

Many teams are already utilizing Github or some form of version control in their existing workflows.
Integrating the Signet broker introduces an additional component to their infrastructure, which requires maintenance.

### Cost

Using the Signet broker introduces additional costs as teams would have to pay for hosting the Signet broker.

### Vendor Lock-in

Using the Signet broker may introduce the risk of vendor lock-in.
If teams decide to transition to a different contract testing platform in the future, they would need to extract their data from the Signet broker, which could be time-consuming.
