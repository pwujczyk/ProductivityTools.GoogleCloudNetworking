# GKE ambient

## Basics

In kubernetes we have 
- containers - it is an application with all depdenencies, it is like an Docker image with your webpage
- pod - a bag for containers, usually in one pod we have one container
- nodes - GCE instances, bag for the pods. One node contains hundrets of pods. Each node has kubelet deployed. kubelet is responsible for communication with the cluster
- cluster - set of nodes

## Service mesh

When application get bigger we need more functionalities connected with the services communication. 
- Authorization - Service A can talk t Service B
- mTLS - between services
- Tracing - trace all requests, how they traverse through the servics
- Metrics 
- Circuit breaking - when one service stop responding the service mesh could stop sending data to it.

**First implementation of the service mesh in Kubernetes was adding sidecar proxy (envoy) to each pod.** Proxy server was deployed together with the base container. That was not ideal as additional container (envoy) used a lot of resourources

Service mesh based on the sidecars have following disadvantages: 
- uses a lot of CPU
- update to service mesh required restart all pods (to replace sidecar)

## GKE ambient

In the GKE ambient, we still can implement the Service mesh, but this solution manage the netwrok on the node level. On each node ztunnel agent is deployed that is responsible for autorizatoin and telemetry.

### L4 metrics

GCP introduces rist L4 metrics as gathering them is pretty easy, ztunnel just sees the data that flow through it. The amount of bytes, received send, tcp duration, destination ip and source ip is easy to log.

### L7 metrics
To gather them Waypoint proxy need to be configured it is full Envoy that will look into the packet and check what data was send (http esponse code, paths)

### L4 and L7 metrics
Moving to GKE ambient significantly improves pefomace as pevious implementation always did the L7 metrics, but not always user need the L7 metrics. 