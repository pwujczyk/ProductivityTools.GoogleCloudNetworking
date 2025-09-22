# Andromeda

https://www.usenix.org/system/files/conference/nsdi18/nsdi18-dalton.pdf

Hoverboard - long tail of mostly idle flow 
On-host dataplane - firewall is 

## Hoverboard

We have 3 major models of program software defined networks:
- Preprogrammed model - Each VM has route to another VM. It scales quadritically with the nework size
- On demand model - first packet is sent to the controller that programs the forwarding rule. The first packet is significantly slower. This model is sensitive to control plane outages.
- Gateway model - all trafic goes to the gateway

Andromeda uses the mixed model. The packets initially are send throug the gateway, but when amount of packets reach certain treshold Gateway push the route to the on host.

