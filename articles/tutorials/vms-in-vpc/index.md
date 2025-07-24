# Carating 2 VMs in one VPC
This tutorial shows how to create 2 VMs in VPC 

## Creating resources

```
# variables
export PROJECT="pwujczyklearning"
export PROJECT="firewallorder"
export REGION="us-central1"
export ZONE="us-central1-a"
export $Ne

export VM1_NAME='vm1-webserver'
export VM2_NAME='vm2-client'

export NETWORK_NAME="$USER-2vm-test"
export SUB_NETWORK_NAME="$USER-2vm-test-subnetwork"
```


```
# Create network
gcloud compute networks create $NETWORK_NAME \
    --subnet-mode=custom \
    --mtu=1460 \
    --project=$PROJECT
```
```
# Create subnetwork

gcloud compute networks subnets create $SUB_NETWORK_NAME \
    --region=$REGION \
    --network=$NETWORK_NAME \
    --range=10.0.0.0/27 \
    --enable-private-ip-google-access \
    --project=$PROJECT
```
```
# Create VM1 - server

gcloud compute instances create $VM1_NAME \
    --image-project=debian-cloud \
    --image-family=debian-11 \
    --machine-type=e2-micro \
    --zone=$ZONE \
    --network-interface="subnet=$SUB_NETWORK_NAME,no-address" \
    --project=$PROJECT 
```
```
# Create VM2 - client

gcloud compute instances create $VM2_NAME \
    --image-project=debian-cloud \
    --image-family=debian-11 \
    --machine-type=e2-micro \
    --zone=$ZONE \
    --network-interface="subnet=$SUB_NETWORK_NAME,no-address" \
    --project=$PROJECT 
```
## Removing resources


```
# Delete VM2 - Server
gcloud compute instances delete $VM2_NAME \
    --zone=$ZONE \
    --project=$PROJECT \
    --quiet
```
```
# Delete VM1 - Client
gcloud compute instances delete $VM1_NAME \
    --zone=$ZONE \
    --project=$PROJECT \
    --quiet
```
```
# Delete subnet
gcloud compute networks subnets delete $SUB_NETWORK_NAME \
    --region=$REGION \
    --project=$PROJECT \
    --quiet
```
```
# Delete network

gcloud compute networks delete $NETWORK_NAME \
    --project=$PROJECT \
    --quiet
```