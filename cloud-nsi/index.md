# Cloud Network Security Integration

[Cloud documentation](https://cloud.google.com/network-security-integration/docs/nsi-overview)

Firewall in GCP allows to filter traffic based on the technical properites like IP, port etc. It does not allow to do  the request content analysis

Network Security Integration gives an option to put a software between VMs that do the analysis. It allows to be put as a decision software (in-band/intercept) or as a monitoring software (mirroring/out-band)

Examples:

- Company would like to validate if employees does not send any confidential information to their private emails. They setup in-band software that scanns the attachements send and block the reuqests if needed
- Company noticed that for big emails this strategy is not working as the analysis takes too much time. They implemnt out-band (mirroring) integration. They allow all the traffic, but in the background they analyze the attachments. If requred they send email to the proper employee. 

## Solution
GCP does not offer packet analysis tools. GCP allows to deploy custom software on the VM and redirect/mirror traffic to this software. 

## Additional terms

- Prevension system - the term is used in the context of interecpt/in-band of the packets. It increases the time of the request but protects in the real time
- Intrudion detection system the term is use din the context of mirroring/out-band of the packets. It analyses packets in the background and performs actions afterwards.
- Geneve protocol - To mirror or to redirect data to the 3rd party solution geneve protocol is used, The most important to know that geneve allows to redirect packet in its orignal state, with all headers, source and destination ip.


 ```
 - A service producer network contains a set of scalable third-party network appliances that are deployed as backends to an internal load balancer.
- A service consumer uses a firewall policy to select specific traffic and redirect the selected traffic to a group of endpoints.
- The endpoint group in a consumer network sends the selected traffic to a service producer, where the internal load balancer distributes the traffic to the third-party appliances for inspection.
 ```
 My interpretation:
 - service producer is 3rd party software that will be used to analyze the packets
 - service consumer is a GCP resource, for example VM
 - The endpoint group is a GCP resource that is used as a proxy to send traffic from the VM to the external service (for packet inspection)

TL;DR;

- **Service producer** third-party entity (person, company) that manages solution. Solution should offer packet inspection. Service producer deploys VM in Intercept deploymnet group
- **Intercept deployment group** group of VMs used to analyze packets
- **VM** - GCE with software that allows to analyze packets it couuld be for example a firewall or intrusion detection system
- **In-band** and **Out-of-band** integration - 


What does 'For each zone, producers register their VMs as backends to an internal passthrough Network Load Balancer in their VPC network.' mean. What kind of load balancer is mentioned here?

## Producer and consumer confusion

- The design of the functionality defines **Producer** role aas a person who deploys the intercept solution and the **Consumer** that uses the solution. That make sense if we look at the wohle solution as service that is offered to others
- From the request-response point of view the roles should be different. The producer should be the part that sends the packets, and consumer the one who receives them and make decision based on them. 



Questions
- who is responsible for deploying internal load balancers
