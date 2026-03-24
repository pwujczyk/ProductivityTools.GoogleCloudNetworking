# Threats

Crate secure profile:
```
gcloud network-security security-profiles threat-prevention create pw-profile-threats --organization=255493826784 --project=cn-fe-playground --location=global
```

![create-security-profile](./images/create-security-profile.png)

List secure profile:
```
gcloud network-security security-profiles threat-prevention list     --organization=255493826784 --location=global  --project=cn-fe-playground
```

Create security profile group
```
gcloud beta network-security security-profile-groups create pw-spg-threats --organization=255493826784 --project=cn-fe-playground --location=global --threat-prevention-profile=organizations/255493826784/locations/global/securityProfiles/pw-profile-threats
```


UI
![security-profile-group](./images/security-profile-group.png)