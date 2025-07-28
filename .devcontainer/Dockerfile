# Use the official Node.js image with TypeScript support
FROM mcr.microsoft.com/devcontainers/typescript-node:1-20-bullseye

# Install additional useful tools
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get install -y --no-install-recommends \
        curl \
        wget \
        git \
        openssh-client \
        less \
        iproute2 \
        procps \
        lsb-release \
        ca-certificates \
        apt-transport-https \
        gnupg \
        gpg \
    && apt-get clean -y && rm -rf /var/lib/apt/lists/*

# Create a non-root user
ARG USERNAME=node
ARG USER_UID=1000
ARG USER_GID=$USER_UID

# Configure git for the container
RUN git config --global --add safe.directory /workspace

# Install global npm packages for development
RUN npm install -g \
    prettier \
    eslint \
    typescript \
    create-vite \
    serve

# Set the default user
USER $USERNAME

# Set up the working directory
WORKDIR /workspace

CMD ["/bin/bash"]