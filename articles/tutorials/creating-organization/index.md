# Creating organization 

This page lists only drop steps that are not ordered. When second organizatio will be created I needs to be improved.

The starting point for the organization is [this](https://cloud.google.com/resource-manager/docs/creating-managing-organization) page

- [Chose Cloud identity](https://cloud.google.com/resource-manager/docs/creating-managing-organization)
- Domain is required
- During the process remember your username (they will ask you to create one)
- After craeting account sign in to the [admin platform](http://admin.google.com/) Tricky think is that sign in with the user in your domain (crated in the previous tutorial)
- Later Billing get more services cloud itentity

```
You do not have the required "resourcemanager.projects.create" permission to create projects in this location.s
```

- The organization did not show up but after 30 minutes of doing I am not sure what it showed. 

![add-admin-to-admin](./images/add-admin-to-admin.png)
![roles-required](./images/roles-required.png)



Organization is managed under a link https://admin.google.com/

In the GCP permissions issue could occur than make sure that user that you are logged in is a super admin.

Go to the admin.google.com to the Admin roles

![admin-roles](./images/admin-roles.png)


Assign user to the super admin role.

![super-admin](./images/super-admin.png)