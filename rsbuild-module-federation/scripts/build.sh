#!/bin/bash

# Micro-Frontend Build Script
set -e

echo "🏗️  Building Micro-Frontend Applications..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Build configuration
BUILD_ENV=${BUILD_ENV:-production}
BUILD_ANALYZE=${BUILD_ANALYZE:-false}

echo -e "${BLUE}Build Environment: $BUILD_ENV${NC}"
echo -e "${BLUE}Build Analysis: $BUILD_ANALYZE${NC}"

# Function to build a package
build_package() {
    local package_path=$1
    local package_name=$2
    
    echo -e "\n${BLUE}Building $package_name...${NC}"
    
    if [ -d "$package_path" ]; then
        cd "$package_path"
        
        if [ -f "package.json" ]; then
            echo -e "${YELLOW}Installing dependencies for $package_name...${NC}"
            npm ci --only=production
            
            echo -e "${YELLOW}Building $package_name...${NC}"
            npm run build
            
            echo -e "${GREEN}✅ $package_name built successfully${NC}"
            cd - > /dev/null
        else
            echo -e "${RED}❌ No package.json found in $package_path${NC}"
            return 1
        fi
    else
        echo -e "${RED}❌ Directory $package_path not found${NC}"
        return 1
    fi
}

# Function to clean build artifacts
clean_build() {
    echo -e "${BLUE}Cleaning previous build artifacts...${NC}"
    
    # Clean host app
    [ -d "apps/host/dist" ] && rm -rf apps/host/dist
    
    # Clean remote app
    [ -d "apps/remote/dist" ] && rm -rf apps/remote/dist
    
    # Clean BFF
    [ -d "apps/bff/dist" ] && rm -rf apps/bff/dist
    
    # Clean shared packages
    [ -d "packages/shared-types/dist" ] && rm -rf packages/shared-types/dist
    [ -d "packages/ui-components/dist" ] && rm -rf packages/ui-components/dist
    [ -d "packages/utils/dist" ] && rm -rf packages/utils/dist
    
    echo -e "${GREEN}✅ Build artifacts cleaned${NC}"
}

# Function to install root dependencies
install_root_deps() {
    echo -e "${BLUE}Installing root dependencies...${NC}"
    npm ci
    echo -e "${GREEN}✅ Root dependencies installed${NC}"
}

# Function to type-check all packages
type_check() {
    echo -e "\n${BLUE}Running type checks...${NC}"
    
    echo -e "${YELLOW}Type checking shared packages...${NC}"
    npm run type-check --workspaces --if-present
    
    echo -e "${GREEN}✅ Type checks passed${NC}"
}

# Function to run tests
run_tests() {
    echo -e "\n${BLUE}Running tests...${NC}"
    
    if [ "$BUILD_ENV" = "production" ]; then
        echo -e "${YELLOW}Running unit tests...${NC}"
        npm run test --workspace=@mf/host -- --run
        
        # Add tests for other packages when available
        # npm run test --workspace=@mf/remote -- --run
        # npm run test --workspace=@mf/bff -- --run
        
        echo -e "${GREEN}✅ Tests passed${NC}"
    else
        echo -e "${YELLOW}Skipping tests in development mode${NC}"
    fi
}

# Function to build Docker images
build_docker() {
    if [ "$BUILD_ENV" = "production" ]; then
        echo -e "\n${BLUE}Building Docker images...${NC}"
        
        echo -e "${YELLOW}Building host image...${NC}"
        docker build -f apps/host/Dockerfile -t mf-host:latest .
        
        echo -e "${YELLOW}Building remote image...${NC}"
        docker build -f apps/remote/Dockerfile -t mf-remote:latest .
        
        echo -e "${YELLOW}Building BFF image...${NC}"
        docker build -f apps/bff/Dockerfile -t mf-bff:latest .
        
        echo -e "${GREEN}✅ Docker images built successfully${NC}"
    else
        echo -e "${YELLOW}Skipping Docker build in development mode${NC}"
    fi
}

# Function to generate build report
generate_report() {
    echo -e "\n${BLUE}Generating build report...${NC}"
    
    # Create build info
    cat > build-info.json << EOF
{
  "buildTime": "$(date -u +"%Y-%m-%dT%H:%M:%SZ")",
  "buildEnvironment": "$BUILD_ENV",
  "nodeVersion": "$(node --version)",
  "npmVersion": "$(npm --version)",
  "gitCommit": "$(git rev-parse HEAD 2>/dev/null || echo 'unknown')",
  "gitBranch": "$(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo 'unknown')"
}
EOF
    
    echo -e "${GREEN}✅ Build report generated${NC}"
}

# Main build function
main() {
    local start_time=$(date +%s)
    
    echo -e "${GREEN}🚀 Starting build process...${NC}\n"
    
    # Clean previous builds
    clean_build
    
    # Install dependencies
    install_root_deps
    
    # Build shared packages first
    echo -e "\n${BLUE}Building shared packages...${NC}"
    build_package "packages/shared-types" "Shared Types"
    build_package "packages/utils" "Utilities"
    build_package "packages/ui-components" "UI Components"
    
    # Type check
    type_check
    
    # Run tests
    run_tests
    
    # Build applications
    echo -e "\n${BLUE}Building applications...${NC}"
    build_package "apps/bff" "BFF API"
    build_package "apps/remote" "Remote App"
    build_package "apps/host" "Host App"
    
    # Build Docker images
    build_docker
    
    # Generate build report
    generate_report
    
    local end_time=$(date +%s)
    local duration=$((end_time - start_time))
    
    echo -e "\n${GREEN}🎉 Build completed successfully in ${duration}s!${NC}"
    
    # Show build artifacts
    echo -e "\n${BLUE}Build artifacts:${NC}"
    [ -d "apps/host/dist" ] && echo -e "${GREEN}📱 Host app: apps/host/dist${NC}"
    [ -d "apps/remote/dist" ] && echo -e "${GREEN}🧩 Remote app: apps/remote/dist${NC}"
    [ -d "apps/bff/dist" ] && echo -e "${GREEN}🔧 BFF API: apps/bff/dist${NC}"
    
    if [ "$BUILD_ENV" = "production" ]; then
        echo -e "\n${BLUE}Docker images:${NC}"
        echo -e "${GREEN}🐳 mf-host:latest${NC}"
        echo -e "${GREEN}🐳 mf-remote:latest${NC}"
        echo -e "${GREEN}🐳 mf-bff:latest${NC}"
        
        echo -e "\n${YELLOW}To run with Docker Compose:${NC}"
        echo -e "${BLUE}docker-compose up${NC}"
    fi
}

# Error handling
handle_error() {
    echo -e "\n${RED}❌ Build failed!${NC}"
    echo -e "${RED}Error occurred in: ${BASH_SOURCE[1]##*/}:${BASH_LINENO[0]}${NC}"
    exit 1
}

trap handle_error ERR

# Run main function
main "$@"