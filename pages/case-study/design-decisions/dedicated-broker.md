# Dedicated Broker

## Single Source of Truth

A crucial characteristic of Deploy Guard is its **global consistency**, the assurance that running Deploy Guard yields consistent results, independent of the context from which it is executed.
Without global consistency, teams face the challenge of resolving conflicting and unreliable Deploy Guard results.

### Central Document Repository

In addition to having an up-to-date awareness of deployment states, Deploy Guard's results depend on the definitions of both the consumer contract and the provider specification.
As a consequence, if Deploy Guard were to read documents separately from the individual repositories of the consumer and provider teams, the risk of having unsynchronized documents between these repositories could lead to conflicting results in Deploy Guard.

To ensure global consistency, it is imperative for Deploy Guard to access the documents from a **central repository**. While an online version control system such as Github[^1] could serve as a central repository, we made the decision to develop a dedicated broker. This choice allows us to provide features that are specifically tailored to contract testing.

We will discuss the trade-offs of this decision in the following sections.

## The Positives

### Encapsulating Logic

With a dedicated broker, Signet's functionality is no longer confined within the Signet CLI.
Instead, the broker takes on various tasks, including handling the logic for Deploy Guard.
This advancement enables automatic fetching of data for documents, and deployment states, of consumer and provider versions.

If Github were used as the central repository, developers would be required to manually provide Deploy Guard with data about documents and deployment states. Although the fetching of this data could potentially be automated, the burden of figuring out how to do so would fall on the developer.

### Automatic Comparison

The Signet broker performs automatic comparisons between contracts and specifications as soon as they are published, providing immediate feedback on compatibility.
In contrast, without a dedicated broker, developers must manually compare documents or write custom scripts for automation.

### Webhooks

The Signet broker offers webhooks, for contract testing events, that integrate into the CI/CD pipeline.
While Github also provides webhooks, configuring them for events specific to contract testing demands more involvement and effort from developers.

## The Negatives

### Lack of Version Control Collaboration

One drawback of using the Signet broker is the absence of version control collaboration.
With Github, teams can leverage Github's pull request system to manage changes on contracts and specifications.
By treating documents as code, teams can enforce collaboration by requiring approval from other teams for pull requests.

### Maintenance and Cost

Many teams are already utilizing Github or some form of version control in their existing workflows.
Integrating the Signet broker introduces an additional component to their infrastructure, necessitating maintenance and management.
Moreover, adopting the Signet broker incurs additional costs, as teams would be required to cover the expenses of hosting the broker.

### Vendor Lock-in

Using the Signet broker may introduce the risk of vendor lock-in.
While Signet is open-source and self-hosted, if teams decide to transition to a different contract testing platform in the future, they would need to extract their data from the Signet broker, which could be time-consuming.

## Built to Scale

Throughout the analysis of various trade-offs, a recurring theme emerges: a dedicated broker offers smoother integration of contract testing-specific features, albeit at the expense of managing an additional component in the existing infrastructure.
Ultimately, we decided that while an online version control system like Github may be preferable as a short-term solution, a dedicated broker becomes increasingly advantageous as Signet expands its feature set.

[^1]: Other contract testing frameworks (*Karate* and *Specmatic*) have implemented this approach and use Github as their central contract repository.
