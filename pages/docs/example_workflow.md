# Key Concepts
- **provider spec** - (a.k.a. API spec) a provider's OpenAPI specification. This is the authoritative contract in the Signet ecosystem.
- **consumer contract** - a document describing the HTTP requests the consumer makes to the provider, and the responses the consumer is expecting. Signet uses the Pact specification for consumer contracts.
- **integration** - a pair of services (one consumer and one provider) which interact with each other.
- **comparison** - a test that determines if a consumer contract is compatible with a provider spec. This is the consumer's side of the contract test.
- **provider verification** - a test that determines if a provider's actual implementation conforms to the provider API spec. This is the provider's side of the contract test.

&nbsp;

# Example Workflow with Signet

Signet broker provides a web interface for inspecting contracts, viewing test results, managing webhooks, and visualizing deployments. This section walks through an example of contract testing with Signet when two services want to update the way they integrate.

1. Suppose the organization has the following microservices:
![service_graph](https://github.com/signet-framework/signet-broker/blob/main/readme_assets/service_graph.png)
Signet's service graph makes it easy to see that advertising_service depends on shopping_cart_service, and shopping_cart_service depends on inventory_service and payments_service.

1. What happens if shopping_cart_service needs a new feature that requires a new API endpoint from inventory_service? The shopping_cart_service team and the inventory_service team first agree on the new API endpoint: `GET /api/gadgets/:gadgetId`. Then they publish an updated API spec for inventory_service using the `signet publish` CLI command, and both teams get to work updating their respective services.

2. The shopping_cart_service team finishes their implementation first. After updating their test double of inventory_service, they use service tests to validate the new functionality of shopping_cart_service. They use the `signet proxy` CLI command to record the API calls that shopping_cart_service makes to the inventory_service test double.
![signet_proxy](https://github.com/signet-framework/signet-broker/blob/main/readme_assets/signet_proxy.png)

1. `signet proxy` generates a consumer contract. The shopping_cart_service team publishes the new consumer contract to the broker with `signet publish`, and the broker confirms that the new version of the shopping_cart_service service conforms to the API spec.
![shopping_cart_new_version](https://github.com/signet-framework/signet-broker/blob/main/readme_assets/shopping_cart_new_version.png)

1. Before deploying the new version of shopping_cart_service, the team uses Signet's Deploy Guard feature to make sure the new shopping_cart_service service is compatible with all of the other services in production.
![shopping_cart_deploy_guard_fail](https://github.com/signet-framework/signet-broker/blob/main/readme_assets/shopping_cart_deploy_guard_fail.png)

1. Since the inventory_service team has not finished adding the new API endpoint to their service, Deploy Guard reports that the new shopping_cart_service service will break if it is deployed to production. The shopping_cart_service team postpones the deployment until the new inventory_service service is finished. In the meantime, they subscribe their CI/CD pipeline to receive a webhook from the Signet broker when the new inventory_service service is completed.
![webhook_subscription](https://github.com/signet-framework/signet-broker/blob/main/readme_assets/webhook_subscription.png)

1. Eventually, the inventory_service team finishes adding the new endpoint to their service. Unlike the shopping_cart_service team, the inventory_service team has fully integrated Signet into their CI/CD pipeline, so contract testing is completely automated for them. When the new build of inventory_service service is complete, the CI/CD pipeline uses the `signet test` CLI command to verify that it correctly implements the API spec. Since it does, the CLI reports back to the broker that inventory_service service has been successfully tested.
![inventory_verification](https://github.com/signet-framework/signet-broker/blob/main/readme_assets/inventory_verification.png)
![inventory_version_published](https://github.com/signet-framework/signet-broker/blob/main/readme_assets/inventory_version_published.png)

1. After successful provider verification, inventory_service's CI/CD pipeline invokes `signet deploy-guard` to check whether it is safe to deploy the new version of inventory_service service. Since the new service has no external dependencies, and it is still compatible with the old version of shopping_cart_service (which is currently deployed in production), `signet deploy-guard` reports that all is well. The CI/CD pipeline proceeds to deploy the new version of inventory_service.
![inventory_deploy_guard_pass](https://github.com/signet-framework/signet-broker/blob/main/readme_assets/inventory_deploy_guard_pass.png)

1. When the updated inventory_service was successfully tested against the API spec, the shopping_cart_service team received a webhook from the Signet broker to report the news. Now the team checks Deploy Guard again to see if they can deploy the new version of shopping_cart_service. Because all of shopping_cart_service's external dependencies in production are compatible, and shopping_cart_service is compatible with the advertising_service that depends on it, Deploy Guard says it is safe to deploy. The shopping_cart_service team can now deploy the new version with confidence that no breaking changes will be introduced into production.
![shopping_cart_deploy_guard_pass](https://github.com/signet-framework/signet-broker/blob/main/readme_assets/shopping_cart_deploy_guard_pass.png)

1. At any time, either team can use the matrix view to explore the state of each pair of consumer and provider service versions:
![matrix](https://github.com/signet-framework/signet-broker/blob/main/readme_assets/comparison_matrix.png)

1. The timeline view records the history of events:
![timeline](https://github.com/signet-framework/signet-broker/blob/main/readme_assets/timeline.png)

1. Teams can view the requirements listed in the consumer contract:
![consumer_contract_interactions](https://github.com/signet-framework/signet-broker/blob/main/readme_assets/consumer_contract_interactions.png)

1. They can also view the provider OpenAPI spec:
![api_spec_details](https://github.com/signet-framework/signet-broker/blob/main/readme_assets/api_spec_details.png)
