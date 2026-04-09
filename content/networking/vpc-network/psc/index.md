# Private Service Connect

PSC allow resources in one network A acess resources in another network (B) by using one of the IP addresses from the subnet in network A. PSC gives convinent way to join networks together without need to peer them.

## PSC for managed services

When managed services are created in GCP  (Cloud SQL) they are created in a separate VPC network. That network we call Tenant VPC. 
If customer wants to access this service from his VPC network he needs to create a connection between his VPC and Tenant VPC. 
To do that we use PSC (Private Service Connect).

In this scenario one of the IP addresses from the  consumer VPC subnet is used as an endpoint for the managed service.

## PSC between two VPC networks

PSC can be used to connect two VPC networks together. It has advantage over VPC peering as both network can have overlapping IP address ranges.

Tutorial:

Connect two VPC networks using PSC
Project1: pwujczyk-service-connect1 - prod project
Project2: pwujczyk-service-connect2 - consumer project

```
gcloud compute networks create gke-producer-l4-vpc --project=pwujczyk-service-connect1 --subnet-mode=custom 
gcloud compute networks subnets create node-subnet1 --project=pwujczyk-service-connect1 --range=192.168.10.0/24 --network=gke-producer-l4-vpc --region=us-central1 --secondary-range="pod=10.10.10.0/24,service=10.10.20.0/24" --enable-private-ip-google-access


```

