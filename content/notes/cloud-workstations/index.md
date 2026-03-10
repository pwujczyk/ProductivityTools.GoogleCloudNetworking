# Cloud workstations


[Cloud workstations service](https://console.google.com/workstations/list?project=cn-fe-playground) allows to code in the cloud. 

To work with github configuration is very simple after creating the Workstation we can open repository from the github.

## Frontend development

Coding in the cloud is as in the local machine. When github repository is open we can start application

```
npm install
npm run dev
```

The following screen shows workstation in the browser with page running.



![workstation-with-localhost.png](./images/workstation-with-localhost.png)

We see that it listen on localhost:3000 but in reality if we click it proxy page will open proxy page.

![proxy-page](./images/proxy-page.png)



## Antigravity

```
git clone https://github.com/GoogleCloudPlatform/cloud-workstations-custom-image-examples.git
cd cloud-workstations-custom-image-examples/examples/images/gnome/noVnc/
``` 

Replace Docker file content with
```
# syntax=docker/dockerfile:1
FROM us-central1-docker.pkg.dev/cloud-workstations-images/predefined/base as novnc-builder

ARG NOVNC_BRANCH=v1.5.0
ARG WEBSOCKIFY_BRANCH=v0.12.0

WORKDIR /out

RUN git clone --quiet --depth 1 --branch $NOVNC_BRANCH https://github.com/novnc/noVNC.git && \
  cd noVNC/utils && \
  git clone  --quiet --depth 1 --branch $WEBSOCKIFY_BRANCH https://github.com/novnc/websockify.git

#######################################################
# End NoVNC Builder Container
#######################################################

# Main container build
FROM us-central1-docker.pkg.dev/cloud-workstations-images/predefined/base

# Use ARG to avoid apt-get warnings
ARG DEBIAN_FRONTEND=noninteractive

# Install and configure systemd.
RUN apt-get update && apt-get install -y \
  systemd && \
  apt-get clean && \
  rm -rf /var/lib/apt/lists/* &&\
  ln -s /dev/null /etc/systemd/system/apache2.service && \
  ln -s /dev/null /etc/systemd/system/getty@tty1.service && \
  ln -s /dev/null /etc/systemd/system/ldconfig.service && \
  /sbin/ldconfig -Xv && \
  ln -s /dev/null /etc/systemd/system/systemd-modules-load.service && \
  ln -s /dev/null /etc/systemd/system/ssh.socket && \
  ln -s /dev/null /etc/systemd/system/ssh.service && \
  echo "d /run/sshd 0755 root root" > /usr/lib/tmpfiles.d/sshd.conf && \
  echo -e "x /run/docker.socket - - - - -\nx /var/run/docker.socket - - - - -" > /usr/lib/tmpfiles.d/docker.conf

# Install GNOME
RUN apt-get update && apt-get install -y \
    gnome-software \
    gnome-software-common \
    gnome-software-plugin-snap \
    libappstream-glib8 \
    libgd3 \
    colord \
    gnome-control-center \
    gvfs-backends \
    hplip \
    libgphoto2-6 \
    libsane1 \
    sane-utils \
    ubuntu-desktop-minimal && \
  apt-get remove -y gnome-initial-setup && \
  apt-get remove -y --purge cloud-init && \
  apt-get clean && \
  rm -rf /var/lib/apt/lists/* && \
  chmod -x /usr/lib/ubuntu-release-upgrader/check-new-release-gtk

# Install Antigravity
RUN mkdir -p /etc/apt/keyrings && \
    curl -fsSL https://us-central1-apt.pkg.dev/doc/repo-signing-key.gpg | gpg --dearmor -o /etc/apt/keyrings/antigravity-repo-key.gpg && \
    echo "deb [signed-by=/etc/apt/keyrings/antigravity-repo-key.gpg] https://us-central1-apt.pkg.dev/projects/antigravity-auto-updater-dev/ antigravity-debian main" | tee /etc/apt/sources.list.d/antigravity.list > /dev/null && \
    apt-get update && \
    apt-get install -y antigravity

# Install Google Chrome
RUN wget -q -O - https://dl.google.com/linux/linux_signing_key.pub | gpg --dearmor -o /usr/share/keyrings/google-chrome-keyring.gpg && \
    echo "deb [arch=amd64 signed-by=/usr/share/keyrings/google-chrome-keyring.gpg] http://dl.google.com/linux/chrome/deb/ stable main" | tee /etc/apt/sources.list.d/google-chrome.list > /dev/null && \
    apt-get update && \
    apt-get install -y google-chrome-stable

# Divert the original Chrome executable to a new location and create a wrapper script.
# This ensures the fix persists even when the Chrome package is updated.
RUN dpkg-divert --add --rename --divert /usr/bin/google-chrome-stable.real /usr/bin/google-chrome-stable && \
    echo '#!/bin/bash' > /usr/bin/google-chrome-stable && \
    echo 'exec /usr/bin/google-chrome-stable.real --no-sandbox --no-zygote --disable-gpu --disable-dev-shm-usage "$@"' >> /usr/bin/google-chrome-stable && \
    chmod +x /usr/bin/google-chrome-stable


# Install TigerVNC and noVNC
COPY --from=novnc-builder /out/noVNC /opt/noVNC
RUN apt-get update && apt-get install -y \
    dbus-x11 \
    tigervnc-common \
    tigervnc-scraping-server \
    tigervnc-standalone-server \
    tigervnc-xorg-extension \
    python3-numpy  && \
  apt-get clean && \
  rm -rf /var/lib/apt/lists/*

# Merge assets into the container.
COPY assets/opt /opt
COPY assets/. /

# Run TigerVNC and noVNC as services.
RUN ln -s /etc/systemd/system/tigervnc.service /etc/systemd/system/multi-user.target.wants/ && \
  ln -s /etc/systemd/system/novnc.service /etc/systemd/system/multi-user.target.wants/ && \
  systemctl enable tigervnc && \
  systemctl enable novnc

# This is implicit when extending workstations predefined images, however we are
# including it in the sample to explicitly call-out we are overriding the
# default entrypoint when merging assets.
ENTRYPOINT ["/google/scripts/entrypoint.sh"]
```
Build and push image

```
 gcloud artifacts repositories create cloud-workstations-images --repository-format=docker --location=us-central1 --project=pwujczyk-net-1
```

Configure docker
```
gcloud auth configure-docker us-central1-docker.pkg.dev
```

If you do not have docker do it in cloud shell, and upload the whole directory or use git to push and clone
```
docker build -t us-central1-docker.pkg.dev/pwujczyk-net-1/cloud-workstations-images/antigravity-workstation:latest .

## docker tag antigravity-workstation us-central1-docker.pkg.dev/pwujczyk-net-1/cloud-workstations-images/antigravity-workstation:latest

docker push us-central1-docker.pkg.dev/pwujczyk-net-1/cloud-workstations-images/antigravity-workstation:latest
```

Create configuration and use Custom container image and Container image url when requested.

Important step is to use container image that we previously craeted

![workstation-configuration](./images/workstation-configuration.png)


Errors:

I added the **Artifact Registry Reader** role to account from the bug that was thrown at me 

![error](.\images\error.png)

I added  **Artifact Registry Reader** role the to the account service-1034282302531@gcp-sa-workstations.iam.gserviceaccount.com as gemini said that this is special workstation account.

I recreated the configuration after it.


## Create new workstation
