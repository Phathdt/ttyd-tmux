FROM alpine:3.20

RUN apk add --no-cache ttyd tmux nginx curl && \
    mkdir -p /var/www/fonts /run/nginx

# Download Nerd Font
RUN curl -sL -o /var/www/fonts/JetBrainsMonoNerdFont-Regular.ttf \
    "https://github.com/ryanoasis/nerd-fonts/raw/v3.1.1/patched-fonts/JetBrainsMono/Ligatures/Regular/JetBrainsMonoNerdFont-Regular.ttf"

COPY nginx.conf /etc/nginx/http.d/default.conf
COPY ttyd-custom.js /var/www/ttyd-custom.js
COPY start.sh /start.sh
RUN chmod +x /start.sh && chmod 644 /var/www/ttyd-custom.js

EXPOSE 80

CMD ["/start.sh"]
