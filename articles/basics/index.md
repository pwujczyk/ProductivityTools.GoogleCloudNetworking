# Basics

## MTU - Maximum Transmission Unit
- The Ethernet standard for MTU is 1500 bytes
- 1500 was defined back in the past, as a compromise between limited memory of the computers and large enough bytes to transmit the data
- We can create a VPC with a higher MTU, but if a packet is transferred through a network (like the Internet) that does not support that larger value, then the packet will either be fragmented or dropped
- In GCP the default MTU is 1460, to accommodate the overhead from its network virtualization encapsulation protocol. 

### Jumbo frames
- Jumbo frames have around 9000 bytes. The 9000 value is not a standard, but rather a common convention
- They are used to increase performance in the networks, we know support Jumbo Frames