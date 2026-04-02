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

**First implementation of the service mesh in Kubernetes was adding sidecar proxy (envoy) to each pod.** Proxy server was deployed together with the base container 