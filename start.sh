#!/bin/sh

# Start ttyd in background
ttyd -W \
    -t 'unicodeVersion=11' \
    -t 'fontFamily=JetBrainsMono Nerd Font,monospace' \
    -t 'fontSize=14' \
    -t 'titleFixed=Terminal' \
    -t 'enableSixel=true' \
    -t 'enableTrzsz=true' \
    -t 'disableResizeOverlay=true' \
    -t 'uiShowOpenNewWindowButton=true' \
    -t 'theme={"background":"#292d3e","foreground":"#959dcb","cursor":"#959dcb","cursorAccent":"#292d3e","selectionBackground":"#444267","black":"#292d3e","red":"#f07178","green":"#c3e88d","yellow":"#ffcb6b","blue":"#82aaff","magenta":"#c792ea","cyan":"#89ddff","white":"#959dcb","brightBlack":"#676e95","brightRed":"#f07178","brightGreen":"#c3e88d","brightYellow":"#ffcb6b","brightBlue":"#82aaff","brightMagenta":"#c792ea","brightCyan":"#89ddff","brightWhite":"#ffffff"}' \
    tmux -S /tmp/tmux-1000/default attach-session -t hobby &

# Wait for ttyd to start
sleep 1

# Start nginx in foreground
nginx -g "daemon off;"
