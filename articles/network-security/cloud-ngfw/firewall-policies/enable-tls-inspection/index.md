# Enable TLS inspection

## Proceeed to L7 inspection

NGFW has option **Proceed to L7 inspection** let us summarize what it does?

![proceed-to-l7-inspection](./images/proceed-to-l7-inspection.png)

**Proceed to L7 inspection** requires providing the **Security profile group**. **Security profile group** has currently 3 options:
- URL filtering
- Threat prevention
    - Packet Mirroring
    - Packet Intercept

The option basically turns on Enterprise feature of the Firewall.

## Enable TLS inspection

Below this option we have checkbox Enable TLS inspection. This enable feature similar to the man-in-the-middle attack. Firewall behaves as a client and decrypt the TLS traffic, it analyze it and sent with the new certificate. 

### Exercies
Let us test it. 

I have **flow-logs-vm1** (from different tests). This VM has apache installed. 

![vm](./images/vm.png)


I need SSL so couple steps needs to be performed before

I registered A record for the domain

![img](./images/a-record.png)

change apache port
```
sudo nano /etc/apache2/ports.conf
sudo nano /etc/apache2/sites-available/000-default.conf
sudo apache2ctl configtest
sudo systemctl restart apache2


```

And deployed ssl
```
sudo apt update
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d proceedtol7.productivitytools.top

