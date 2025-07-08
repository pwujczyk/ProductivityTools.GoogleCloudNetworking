Link

Let us go through example

I see that I have one button disabled and when I hover it I see that I miss permissions
![permission-issue](./images/permission-issue.png)



Clicking View details I see that the resource that I need permission is the productivitytools.top organization

![resource](./images/resource.png)


Let us go to the policy troubleshooter IAM and Admin > Policy Troubleshooter

I provided the email that I am logged in and the permission that was listed in the tooltip.

![policy-troubleshooter](./images/policy-troubleshooter.png)



For the resource I chose Browse and look for the resource that was listed in the side panel - productivitytools.top

![resource-selection](./images/resource-selection.png)

We can add multiple permissions

![multiple-permissions](./images/multiple-permissions.png)

In the next screen in the drop down we have results for all evaluations

![multiple-results](./images/multiple-results.png)

Check the details for the permission

![permission-details](./images/permission-details.png)



## Find the correct role based on the permission
Go to IAM Roles and search for permission it will return the roles where permission is used.

![roles](./images/roles.png)