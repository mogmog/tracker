#!/bin/sh
tmux new-session -s tracker -n 'trackerWindow' -d

tmux send-keys -t tracker:trackerWindow.0 'npm start ' C-j

# split the window *vertically*
tmux split-window -v

#proxy
tmux send-keys -t 1 'node proxy.js' C-j

tmux split-window -h

# python api
tmux select-window -t tracker:trackerWindow.2
tmux send-keys -t tracker:trackerWindow.2 'cd api' C-j
tmux send-keys -t tracker:trackerWindow.2 'source venv/bin/activate' C-j
tmux send-keys -t tracker:trackerWindow.2 'export APP_SETTINGS="development"' C-j
tmux send-keys -t tracker:trackerWindow.2 'export DATABASE_URL="postgresql://postgres:postgres@localhost/thing"' C-j
tmux send-keys -t tracker:trackerWindow.2 'python run.py' C-j

# finally attach to the session
tmux attach -t tracker
