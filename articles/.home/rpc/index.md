# RPC 

Google internally uses proto files for the services defninition. 

Example

## Proto
```
rpc GetEffectiveFirewalls(NetworksGetEffectiveFirewallsRequest)
      returns (NetworksGetEffectiveFirewallsResponse) 
```

The rpc has also option that define web api:

```
option (api.method) = {
      kind: CUSTOM
      rest_path: "projects/{project}/global/networks/{network}/getEffectiveFirewalls"
      name: "getEffectiveFirewalls"
      http_method: GET
      authorizations: { permissions: "compute.networks.getEffectiveFirewalls" }
    };
```

## Web api

The same definition we can find in the google rest documentation [https://cloud.google.com/compute/docs/reference/rest/v1](https://cloud.google.com/compute/docs/reference/rest/v1)

The method defined in the above rpc is https://cloud.google.com/**compute**/docs/reference/rest/v1/**networks**/getEffectiveFirewalls

In the example above we are in the **compute** documentation in the **network** area. 

## gcloud

The same method is availiable in the [gcloud](https://cloud.google.com/sdk/gcloud/reference/compute/networks/get-effective-firewalls) the command has structure

gcloud **product** **area** **method** 

gcloud compute networks get-effective-firewalls NAME [NAME …] [--regexp=REGEXP, -r REGEXP] [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,…]] [--uri] [GCLOUD_WIDE_FLAG …]

