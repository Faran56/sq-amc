# 💧 RO AMC Manager — Deployment Guide

Complete RO Plant Annual Maintenance Contract management system.
Mobile-first, works on Android and iOS as an installable web app.

## ⚡ Quick Start

### Windows
Double-click **BUILD-AND-DEPLOY.bat** — done.

### Mac / Linux
```bash
chmod +x build-and-deploy.sh && ./build-and-deploy.sh
```

## 📋 First Time Setup
```bash
npm run setup        # saves your NAS IP/credentials once
npm run deploy:nas   # build + copy to NAS via SSH
npm run deploy:local # build + copy to USB or mapped drive
```

## 👥 Logins
| Username | Password  | Role        |
|----------|-----------|-------------|
| admin    | admin123  | Full access |
| tech1    | tech123   | Field only  |
| tech2    | tech456   | Field only  |

See README full version for complete NAS setup, remote access, and phone install instructions.
