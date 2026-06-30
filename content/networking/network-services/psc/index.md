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
Project1: pwujczyk-l-serviceconnect1 - producer project
Project2: pwujczyk-l-serviceconnect2 - consumer project

```
gcloud compute networks create vpc-1 --project=pwujczyk-l-serviceconnect1 --subnet-mode=custom 
gcloud compute networks subnets create subnet-1 --project=pwujczyk-l-serviceconnect1 --range=192.168.10.0/24 --network=vpc-1 --region=us-central1 --enable-private-ip-google-access


gcloud compute networks create vpc-2 --project=pwujczyk-service-connect2 --subnet-mode=custom 
gcloud compute networks subnets create subnet-2 --project=pwujczyk-service-connect2 --range=192.168.10.0/24 --network=vpc-2 --region=us-central1 --enable-private-ip-google-access
```

```

```

```
gcloud compute instances create vm-1 \
    --image-project=debian-cloud \
    --image-family=debian-11 \
    --machine-type=e2-micro \
    --zone=us-central1-a \
    --network-interface="network-tier=PREMIUM,stack-type=IPV4_ONLY,subnet=subnet-1" \
    --project=pwujczyk-service-connect1 \
    --metadata=startup-script='#! /bin/bash
        sudo apt-get update
        sudo apt-get install -y apache2
        sudo systemctl start apache2
        sudo systemctl enable apache2
        echo "<h1>Welcome to your new Apache server on GCP!</h1><h3>Machine: 'vm1'</h3>" | sudo tee /var/www/html/index.html'


```
