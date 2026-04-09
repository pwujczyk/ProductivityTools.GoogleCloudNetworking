# Private Service Connect

When managed services are created in GCP  (Cloud SQL) they are created in a separate VPC network. That network we call Tenant VPC. 
If customer wants to access this service from his VPC network he needs to create a connection between his VPC and Tenant VPC. 
To do that we use PSC (Private Service Connect).