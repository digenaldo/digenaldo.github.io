#!/bin/zsh

# Function to display usage information
usage() {
    echo "Usage: ./run.sh [option]"
    echo "Options:"
    echo "  start      - Start Jekyll server with development and default configs"
    echo "  push       - Commit and push changes to the main branch with a default message"
    exit 1
}

# Function to start the Jekyll server
start_server() {
    echo "Starting Jekyll server with development and default configs..."
    bundle exec jekyll serve --config _config.dev.yml
}

# Function to commit and push changes
push_changes() {
    echo "Checking for changes in the repository..."
    git status

    echo "Adding all changes..."
    git add .

    DEFAULT_MESSAGE="Updated content via run.sh script"
    echo "Committing changes with message: \"$DEFAULT_MESSAGE\""
    git commit -m "$DEFAULT_MESSAGE"

    echo "Pushing changes to the main branch..."
    git push origin main
}

# Main logic
if [ "$#" -ne 1 ]; then
    usage
fi

case $1 in
    start)
        start_server
        ;;
    push)
        push_changes
        ;;
    *)
        usage
        ;;
esac