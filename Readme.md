[Tutorial](https://nextjs.org/learn/pages-router/create-nextjs-app-setup)
```
npm install gray-matter
```


```
npm run dev
```

http://localhost:3000/



Hosting site

```
sudo apt update
sudo apt upgrade -y

# Verify installation
node -v
npm -v
git clone https://github.com/your-username/your-nextjs-app.git . # The '.' clones into the current directory
cd /var/www/your-nextjs-app # Make sure you are in your app's root directory

# Install npm dependencies
npm install # or yarn install if you use yarn

# Build the Next.js application for production
npm run build # or yarn build


# Install PM2 globally
sudo npm install -g pm2

# Start your Next.js application with PM2
# The 'npm -- start' command tells PM2 to run the 'start' script defined in your package.json
# Next.js's 'start' script typically runs the production build on port 3000 by default.
pm2 start npm --name "your-nextjs-app-name" -- start

# Save the PM2 process list to ensure it persists across reboots
pm2 save

# Generate and enable the PM2 startup script
# Follow the instructions provided by PM2 to copy and paste the command it gives you
# (it usually starts with `sudo env PATH=...`)
pm2 startup systemd
```


```
sudo groupadd jenkins_page_group
sudo usermod -aG jenkins_page_group jenkins
sudo usermod -aG jenkins_page_group pawel
sudo chgrp jenkins_page_group /srv/jenkins/
sudo chmod g+wrx /srv/jenkins/
 sudo chmod -R  g+wr /srv/jenkins/



