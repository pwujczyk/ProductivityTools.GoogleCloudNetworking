# Cloud Network Security Integration

[Cloud documentation](https://cloud.google.com/network-security-integration/docs/nsi-overview)

Throw of thougs:
 - Packet inspection in the external tool
    - It could be firewall
    - Intrusion detection system
    - Prevention system
 - producer consumer model
 - configuration is placed in the firewall. Policy defines what should be forwarded
 - Uses geneve protocol to preserve destination and source IP
 - it is described:

 ```
 - A service producer network contains a set of scalable third-party network appliances that are deployed as backends to an internal load balancer.
- A service consumer uses a firewall policy to select specific traffic and redirect the selected traffic to a group of endpoints.
- The endpoint group in a consumer network sends the selected traffic to a service producer, where the internal load balancer distributes the traffic to the third-party appliances for inspection.
 ```
 My interpretation:
 - service producer is 3rd party software that will be used to analyze the packets
 - service consumer is a GCP resource, for example VM
 - The endpoint group is a GCP resource that is used as a proxy to send traffic from the VM to the external service (for packet inspection)


## Producer and consumer confusion

- The design of the functionality defines **Producer** role aas a person who deploys the intercept solution and the **Consumer** that uses the solution. That make sense if we look at the wohle solution as service that is offered to others
- From the request-response point of view the roles should be different. The producer should be the part that sends the packets, and consumer the one who receives them and make decision based on them. 

Questions
- who is responsible for deploying internal load balancers

 ### Sub-pages

- Deploymnet groups
- Endpoint groups
