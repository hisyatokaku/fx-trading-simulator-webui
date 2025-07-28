# Development Container Setup

This project includes a complete development container configuration that provides a consistent development environment across different machines.

## What's Included

### Base Image
- **Node.js 20** with TypeScript support
- **Ubuntu Bullseye** base system
- Pre-installed development tools

### VS Code Extensions
- **TypeScript/JavaScript**: Enhanced TypeScript support
- **Tailwind CSS**: IntelliSense for Tailwind classes
- **Prettier**: Code formatting
- **ESLint**: Code linting and error detection
- **Live Server**: Local development server
- **Auto Rename Tag**: Automatically rename paired HTML/JSX tags
- **Path IntelliSense**: Autocomplete for file paths
- **Error Lens**: Inline error highlighting
- **Code Spell Checker**: Spell checking for code comments

### Development Tools
- **Git** with GitHub CLI
- **Docker-in-Docker** support
- **Global npm packages**: prettier, eslint, typescript, @vitejs/create-vite, serve

### Port Forwarding
- **5173**: Vite development server
- **4173**: Vite preview server  
- **3000**: Alternative development server

## Getting Started

1. **Prerequisites**:
   - VS Code with the "Dev Containers" extension
   - Docker Desktop running on your machine

2. **Open in Container**:
   - Open the project in VS Code
   - When prompted, click "Reopen in Container"
   - Or use Command Palette: `Dev Containers: Reopen in Container`

3. **First Time Setup**:
   - The container will automatically run `npm install`
   - Wait for the setup to complete

4. **Start Development**:
   ```bash
   npm run dev
   ```

## Container Features

### Automatic Setup
- Dependencies are installed automatically on container creation
- Git configuration is set up for safe directory access
- Development tools are pre-installed globally

### VS Code Integration
- Format on save enabled
- ESLint auto-fix on save
- Tailwind CSS IntelliSense configured
- TypeScript settings optimized for React development

### Development Workflow
- All npm scripts work as expected
- Hot reload enabled for Vite development
- Port forwarding configured for easy access to development servers

## Customization

### Adding Extensions
Edit `.devcontainer/devcontainer.json` and add extension IDs to the `extensions` array.

### Modifying Container
Edit `.devcontainer/Dockerfile` to add additional tools or modify the base image.

### Changing Settings
Update the `settings` section in `.devcontainer/devcontainer.json` for VS Code configuration changes.

## Troubleshooting

### Container Won't Start
- Ensure Docker Desktop is running
- Check that you have the "Dev Containers" VS Code extension installed
- Try rebuilding the container: Command Palette → `Dev Containers: Rebuild Container`

### Port Issues
- Ensure ports 5173, 4173, and 3000 are not in use on your host machine
- Check the "Ports" tab in VS Code terminal panel for forwarded ports

### Permission Issues
- The container runs as the `node` user (UID 1000)
- If you encounter permission issues, try rebuilding the container
