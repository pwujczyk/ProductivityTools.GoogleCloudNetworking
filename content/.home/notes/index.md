# Notes

## Envoy 

It is a sidecar proxy. It could helps with
- observability
- security - force TLS communicaton
- Reliability - it can manage retries, enforce timeout
- Routing 

This is not designed to be reverse proxy (nginx) it rather helps with the service-to-service communication. 

## Istio
Is a implementation of the Envoy for the Kubernetes. It allows to spread the Kubernetes cluster across on-prem and multiple clouds