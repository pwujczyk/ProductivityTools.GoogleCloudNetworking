# Carating 2 VMs VPC
This tutorial shows how to create 2 VMs in VPC 

## Creating resources

```
# variables
export PROJECT="pwujczyklearning"
export PROJECT="firewallorder"
export REGION="us-central1"
export ZONE="us-central1-a"

export VM0_NAME='vm1-empty'
export VM1_NAME='vm1-webserver-with-external-ip'
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
# Create VM1 - empty
gcloud compute instances create $VM0_NAME \
    --image-project=debian-cloud \
    --image-family=debian-11 \
    --machine-type=e2-micro \
    --zone=$ZONE \
    --network-interface="subnet=$SUB_NETWORK_NAME,no-address" \
    --project=$PROJECT 
```

# Create SSH to be able to connect to VM
```
gcloud compute firewall-rules create ssh-allow \
--direction=INGRESS \
--priority=1000 \
--network=$NETWORK_NAME \
--action=ALLOW \
--rules=tcp:22 \
--project=$PROJECT 
```

# Create VM1 - web-server
```
gcloud compute instances create VM1_NAME \
    --image-project=debian-cloud \
    --image-family=debian-11 \
    --machine-type=e2-micro \
    --zone=$ZONE \
    --network-interface="network-tier=PREMIUM,stack-type=IPV4_ONLY,subnet=$SUB_NETWORK_NAME" \
    --project=$PROJECT \
    --metadata=startup-script='#! /bin/bash
        sudo apt-get update
        sudo apt-get install -y apache2
        sudo systemctl start apache2
        sudo systemctl enable apache2
        echo "<h1>Welcome to your new Apache server on GCP!</h1><h3>Machine: '$VM_NAME'</h3>" | sudo tee /var/www/html/index.html'


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
# Delete VM0 
gcloud compute instances delete $VM0_NAME \
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