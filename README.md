# case-study

## Outline

1. Very brief intro (one small paragraph)
2. Background (very much like proposal)
    1. Automated testing
    2. Intro Microservices
        1. In general
        2. In context: problems more acute for microservices
        3. Why unit tests are insufficient
    3. E2E Integration Testing
        1. Challenges that lead to wanting something like contract testing
3. Contract Testing
    1. Define terms
    2. Concepts
        1. Consumer-driven
        2. Provider-driven
        3. Spec-driven
    3. Connect it to the problem
    4. Existing Alternatives (where should this go?)
        1. Pactflow
        2. Specmatic
        3. Others (SCC, Karate)
4. Design Decisions / Considerations
    1. (Tie back to other alternatives too)
    2. Provider verification through test
    3. Consumer contract generation through proxy
    4. First class support for automated CI/CD integration (webhooks)
    5. Broker vs Brokerless
    6. Both consumer contract and provider spec
    7. Schema based vs Semantic
    8. Using Pact Spec vs OpenAPI for consumer contract
    9. Compatibility with other frameworks
5. Signet Framework
    1. Use case / who is this for
    2. Comparison with other solutions
    3. Broker
    4. Database
    5. Web UI
    6. CLI
        1. Consumer Stuff
            1. Contract generation
        2. Provider Stuff
            1. Verification
    7. Deployment
        1. AWS architecture
6. Challenges / Engineering Choices / Tradeoffs
    1. Architectural Decisions
        1. Managed vs Self-hosted
        2. Data model
            1. Deploy guard was a pain
            2. Relationship between contract and participant version
            3. Not having contract version
        3. Database type
            1. Why SQL?
        4. API Access
7. How we built it
    1. Mountebank, swagger-mock-validator, Dredd
8. Future Work
    1. Roadmap
    2. Limitations
        1. gRPC
        2. Event-driven
