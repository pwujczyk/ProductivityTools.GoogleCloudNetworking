# VPC Network

TL;DR; VPC is virtual version of a physical network (cables). 

VPC without the subnet is useless (similar to your ethernet cable that is not connected to anything)


## Options during creation


- ```--subnet-mode=custom ``` adding this will not create defautl subnets. Missing this switch will result in creating 23 subnets in each GCP region


### MTU - Maximum Transmission Unit
- The Ethernet standard for MTU is 1500 bytes
- 1500 was defined back in the past, as a compromise between limited memory of the computers and large enough bytes to transmit the data
- We can create a VPC with a higher MTU, but if a packet is transferred through a network (like the Internet) that does not support that larger value, then the packet will either be fragmented or dropped
- In GCP the default MTU is 1460, to accommodate the overhead from its network virtualization encapsulation protocol. 

#### Jumbo frames
- Jumbo frames have around 9000 bytes. The 9000 value is not a standard, but rather a common convention
- They are used to increase performance in the networks, we know support Jumbo Frames

### Configure network profile
TBD

### Subnet creation mode

### Private IPv6 address settings

### Subnets

### Firewall rules
