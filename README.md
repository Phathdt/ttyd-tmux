# ttyd-tmux

A Docker image for ttyd web terminal with tmux support, custom fonts, and mobile-friendly control bar.

## Features

- **ttyd** - Share terminal over HTTP/WebSocket
- **tmux** - Attach to existing tmux sessions on host
- **JetBrainsMono Nerd Font** - Custom font for terminal
- **Mobile control bar** - ESC, TAB, Ctrl+S, arrows, and common Ctrl keys (mobile only)
- **Material Palenight theme** - Beautiful dark color scheme
- **Nginx proxy** - Custom JS injection for enhanced functionality

## Usage

### Docker Compose

```yaml
services:
  ttyd:
    image: phathdt379/ttyd-tmux:latest
    container_name: ttyd
    restart: unless-stopped
    environment:
      - TZ=UTC
      - TERM=xterm-256color
    volumes:
      - /tmp/tmux-1000:/tmp/tmux-1000:rw  # tmux socket
      - /home/youruser:/home/youruser:rw  # home directory
    ports:
      - "8080:80"
```

### With Traefik

```yaml
services:
  ttyd:
    image: phathdt379/ttyd-tmux:latest
    container_name: ttyd
    restart: unless-stopped
    environment:
      - TZ=UTC
      - TERM=xterm-256color
    volumes:
      - /tmp/tmux-1000:/tmp/tmux-1000:rw
      - /home/youruser:/home/youruser:rw
    networks:
      - traefik
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.ttyd.rule=Host(`terminal.example.com`)"
      - "traefik.http.routers.ttyd.entrypoints=web"
      - "traefik.http.services.ttyd.loadbalancer.server.port=80"
```

## Configuration

### Changing tmux session

Edit `start.sh` to attach to a different session:

```bash
tmux -S /tmp/tmux-1000/default attach-session -t your-session-name
```

### tmux socket path

The default socket path is `/tmp/tmux-1000/default`. Adjust the volume mount if your tmux uses a different path.

Find your tmux socket:
```bash
echo $TMUX
# or
ls /tmp/tmux-*/
```

## Mobile Controls

On mobile devices, a control bar appears with:

| Button | Action |
|--------|--------|
| ESC | Escape key |
| TAB | Tab key |
| ^S | Ctrl+S (tmux prefix) |
| ↑ | Arrow Up |
| ↓ | Arrow Down |
| ^A | Ctrl+A (start of line) |
| ^C | Ctrl+C (interrupt) |
| ^D | Ctrl+D (EOF) |
| ^E | Ctrl+E (end of line) |
| ^L | Ctrl+L (clear) |
| ^W | Ctrl+W (delete word) |
| ^Z | Ctrl+Z (suspend) |

## Building

```bash
docker build -t ttyd-tmux .
```

## License

MIT
