# Deployment Guide - Kentucky War Website

## Quick Deploy Options

### GitHub Pages

1. Go to repository Settings
2. Navigate to Pages section
3. Select main branch as source
4. Save and wait for deployment
5. Site will be available at: `https://20xmas24.github.io/kentucky-war-website/`

### Netlify

1. Sign in to [Netlify](https://netlify.com)
2. Click "New site from Git"
3. Connect your GitHub account
4. Select this repository
5. Build settings:
   - Build command: (leave empty)
   - Publish directory: `/`
6. Deploy site

### Vercel

1. Sign in to [Vercel](https://vercel.com)
2. Click "Import Project"
3. Import from GitHub
4. Select this repository
5. Framework Preset: Other
6. Deploy

### Custom Server

#### Using Nginx

```nginx
server {
    listen 80;
    server_name kentuckywar.com;
    root /var/www/kentucky-war-website;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Enable gzip compression
    gzip on;
    gzip_types text/css application/javascript image/svg+xml;
}
```

#### Using Apache

```apache
<VirtualHost *:80>
    ServerName kentuckywar.com
    DocumentRoot /var/www/kentucky-war-website

    <Directory /var/www/kentucky-war-website>
        Options -Indexes +FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>

    # Enable compression
    <IfModule mod_deflate.c>
        AddOutputFilterByType DEFLATE text/html text/css application/javascript
    </IfModule>
</VirtualHost>
```

## Domain Configuration

### DNS Settings

Add these DNS records:

```
Type    Name    Value
A       @       [Server IP]
A       www     [Server IP]
CNAME   www     @
```

### SSL Certificate (Let's Encrypt)

```bash
# Install certbot
sudo apt install certbot python3-certbot-nginx

# Get certificate
sudo certbot --nginx -d kentuckywar.com -d www.kentuckywar.com

# Auto-renewal
sudo certbot renew --dry-run
```

## Performance Optimization

### Image Optimization

- Compress all images using tools like TinyPNG
- Use WebP format where supported
- Recommended sizes:
  - Logo: 200x200px
  - Hero background: 1920x1080px
  - Thumbnails: 800x600px

### Caching Headers

```nginx
location ~* \.(css|js|jpg|jpeg|png|gif|ico|svg|woff|woff2)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

### CDN Integration

Consider using:
- Cloudflare (Free tier available)
- BunnyCDN
- KeyCDN

## Monitoring

### Uptime Monitoring
- UptimeRobot (free)
- Pingdom
- StatusCake

### Analytics
- Google Analytics
- Plausible (privacy-focused)
- Fathom

## Backup

### Automated Backup Script

```bash
#!/bin/bash
DATE=$(date +%Y-%m-%d)
BACKUP_DIR="/backups/kentucky-war"
mkdir -p $BACKUP_DIR
tar -czf $BACKUP_DIR/backup-$DATE.tar.gz /var/www/kentucky-war-website
find $BACKUP_DIR -mtime +30 -delete
```

## Troubleshooting

### Common Issues

1. **CSS/JS not loading**
   - Check file paths are correct
   - Verify MIME types in server config
   - Clear browser cache

2. **Images not displaying**
   - Ensure images are in assets/ folder
   - Check file permissions (644 for files, 755 for directories)
   - Verify image paths in HTML

3. **Slow loading**
   - Enable gzip compression
   - Optimize images
   - Use CDN for static assets

## Security

### Headers

```nginx
add_header X-Frame-Options "SAMEORIGIN";
add_header X-Content-Type-Options "nosniff";
add_header X-XSS-Protection "1; mode=block";
add_header Referrer-Policy "no-referrer-when-downgrade";
```

### Rate Limiting

```nginx
limit_req_zone $binary_remote_addr zone=general:10m rate=10r/s;

location / {
    limit_req zone=general burst=20 nodelay;
}
```