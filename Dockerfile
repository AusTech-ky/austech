FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY index.html /usr/share/nginx/html/index.html
COPY Austech.png /usr/share/nginx/html/Austech.png
COPY icon.png /usr/share/nginx/html/icon.png

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s CMD wget -q --spider http://127.0.0.1/ || exit 1
