# Outline

## Very brief intro

One small paragraph.

## Background (very much like proposal)

1. Automated testing
2. Intro Microservices
    1. In general
    2. In context: problems more acute for microservices
    3. Why unit tests are insufficient
3. E2E Integration Testing
    1. Challenges that lead to wanting something like contract testing

## Contract Testing

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

## Signet

1. Use case / who is this for
2. Comparison with other solutions
3. Broker
4. Database
5. Web UI
6. CLI
7. Consumer Stuff
   1. Contract generation
8. Provider Stuff
   1. Verification
9. Deployment
   1. AWS architecture

## Design Decisions / Considerations

Tie back to other alternatives too

1. Provider verification through test
2. Consumer contract generation through proxy
3. First class support for automated CI/CD integration (webhooks)
4. Broker vs Brokerless
5. Both consumer contract and provider spec
6. Schema based vs Semantic
7. Using Pact Spec vs OpenAPI for consumer contract
8. Compatibility with other frameworks

## Challenges / Engineering Choices / Tradeoffs

### Architectural Decisions

1. Managed vs Self-hosted
2. Data model
   1. Deploy guard was a pain
   2. Relationship between contract and participant version
   3. Not having contract version
3. Database type
   1. Why SQL?
4. API Access

## How we built it

1. Mountebank, swagger-mock-validator, Dredd

## Future Work

1. Roadmap
2. Limitations
   1. gRPC
   2. Event-driven
