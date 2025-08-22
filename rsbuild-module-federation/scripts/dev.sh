#!/bin/bash

# Micro-Frontend Development Script
set -e

echo "🚀 Starting Micro-Frontend Development Environment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to check if port is in use
check_port() {
    if lsof -Pi :$1 -sTCP:LISTEN -t >/dev/null ; then
        echo -e "${YELLOW}Warning: Port $1 is already in use${NC}"
        return 1
    fi
    return 0
}

# Function to wait for service to be ready
wait_for_service() {
    local url=$1
    local name=$2
    local timeout=30
    local count=0
    
    echo -e "${BLUE}Waiting for $name to be ready at $url...${NC}"
    
    while [ $count -lt $timeout ]; do
        if curl -s $url > /dev/null 2>&1; then
            echo -e "${GREEN}✅ $name is ready!${NC}"
            return 0
        fi
        sleep 1
        count=$((count + 1))
        echo -n "."
    done
    
    echo -e "${RED}❌ $name failed to start within $timeout seconds${NC}"
    return 1
}

# Check if required tools are installed
check_dependencies() {
    echo -e "${BLUE}Checking dependencies...${NC}"
    
    if ! command -v node &> /dev/null; then
        echo -e "${RED}❌ Node.js is not installed${NC}"
        exit 1
    fi
    
    if ! command -v npm &> /dev/null; then
        echo -e "${RED}❌ npm is not installed${NC}"
        exit 1
    fi
    
    echo -e "${GREEN}✅ Dependencies check passed${NC}"
}

# Install dependencies
install_deps() {
    echo -e "${BLUE}Installing dependencies...${NC}"
    npm install
    echo -e "${GREEN}✅ Dependencies installed${NC}"
}

# Check ports
check_ports() {
    echo -e "${BLUE}Checking ports...${NC}"
    
    check_port 3000 || echo -e "${YELLOW}Host app port 3000 is in use${NC}"
    check_port 3001 || echo -e "${YELLOW}Remote app port 3001 is in use${NC}"
    check_port 3002 || echo -e "${YELLOW}BFF port 3002 is in use${NC}"
}

# Start services
start_services() {
    echo -e "${BLUE}Starting services...${NC}"
    
    # Start BFF first
    echo -e "${BLUE}Starting BFF server...${NC}"
    npm run dev:bff &
    BFF_PID=$!
    
    # Wait a bit for BFF to start
    sleep 2
    
    # Start Remote app
    echo -e "${BLUE}Starting Remote micro-frontend...${NC}"
    npm run dev:remote &
    REMOTE_PID=$!
    
    # Wait a bit for Remote to start
    sleep 2
    
    # Start Host app
    echo -e "${BLUE}Starting Host application...${NC}"
    npm run dev:host &
    HOST_PID=$!
    
    # Store PIDs for cleanup
    echo $BFF_PID > .bff.pid
    echo $REMOTE_PID > .remote.pid
    echo $HOST_PID > .host.pid
}

# Wait for all services
wait_for_services() {
    wait_for_service "http://localhost:3002/health" "BFF API"
    wait_for_service "http://localhost:3001" "Remote App"
    wait_for_service "http://localhost:3000" "Host App"
}

# Cleanup function
cleanup() {
    echo -e "\n${YELLOW}Shutting down services...${NC}"
    
    if [ -f .host.pid ]; then
        kill $(cat .host.pid) 2>/dev/null || true
        rm -f .host.pid
    fi
    
    if [ -f .remote.pid ]; then
        kill $(cat .remote.pid) 2>/dev/null || true
        rm -f .remote.pid
    fi
    
    if [ -f .bff.pid ]; then
        kill $(cat .bff.pid) 2>/dev/null || true
        rm -f .bff.pid
    fi
    
    echo -e "${GREEN}✅ Services stopped${NC}"
    exit 0
}

# Set up signal handlers
trap cleanup SIGINT SIGTERM

# Main execution
main() {
    check_dependencies
    install_deps
    check_ports
    start_services
    wait_for_services
    
    echo -e "\n${GREEN}🎉 All services are running!${NC}"
    echo -e "${BLUE}📱 Host App: http://localhost:3000${NC}"
    echo -e "${BLUE}🧩 Remote App: http://localhost:3001${NC}"
    echo -e "${BLUE}🔧 BFF API: http://localhost:3002${NC}"
    echo -e "\n${YELLOW}Press Ctrl+C to stop all services${NC}\n"
    
    # Keep script running
    wait
}

# Run main function
main