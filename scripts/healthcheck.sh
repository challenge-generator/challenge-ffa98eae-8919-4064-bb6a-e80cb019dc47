#!/bin/bash

set -euo pipefail

SERVICES_URL="${SERVICES_URL:-http://localhost:3000}"
HEALTH_ENDPOINT="${HEALTH_ENDPOINT:-/api/health}"
MAX_RETRIES="${MAX_RETRIES:-5}"
RETRY_INTERVAL="${RETRY_INTERVAL:-5}"
TIMEOUT="${TIMEOUT:-5}"

echo "=========================================="
echo "  Container Platform Service Healthcheck"
echo "=========================================="
echo "Target URL: ${SERVICES_URL}${HEALTH_ENDPOINT}"
echo "Max Retries: ${MAX_RETRIES}"
echo "Retry Interval: ${RETRY_INTERVAL}s"
echo "Timeout: ${TIMEOUT}s"
echo "=========================================="

check_health() {
    local url="$1"
    local timeout="$2"
    
    response=$(curl -sf \
        --max-time "$timeout" \
        -w "\n%{http_code}" \
        -o /dev/null \
        "$url" 2>/dev/null) || return 1
    
    http_code=$(echo "$response" | tail -n1)
    
    if [ "$http_code" = "200" ]; then
        return 0
    else
        echo "[WARN] Health check returned HTTP $http_code"
        return 1
    fi
}

check_service_dependencies() {
    echo "[INFO] Checking service dependencies..."
    
    if command -v curl &> /dev/null; then
        echo "[OK] curl is available"
    else
        echo "[ERROR] curl is not installed"
        return 1
    fi
    
    if command -v jq &> /dev/null; then
        echo "[OK] jq is available"
    else
        echo "[WARN] jq is not installed - some checks may be limited"
    fi
    
    return 0
}

check_docker_service() {
    echo "[INFO] Checking Docker service availability..."
    
    if docker info &> /dev/null; then
        echo "[OK] Docker daemon is accessible"
        return 0
    else
        echo "[WARN] Docker daemon is not accessible (may be expected in Kubernetes)"
        return 0
    fi
}

check_kubernetes_context() {
    echo "[INFO] Checking Kubernetes context..."
    
    if command -v kubectl &> /dev/null && kubectl cluster-info &> /dev/null; then
        echo "[OK] Kubernetes cluster is accessible"
        return 0
    else
        echo "[WARN] Kubernetes cluster is not accessible (may be expected locally)"
        return 0
    fi
}

log_success() {
    echo "[SUCCESS] Service is healthy and responding"
    echo "=========================================="
    exit 0
}

log_failure() {
    echo "[FAILURE] Service health check failed after ${MAX_RETRIES} attempts"
    echo "[FAILURE] URL: ${SERVICES_URL}${HEALTH_ENDPOINT}"
    echo "=========================================="
    exit 1
}

main() {
    local attempt=1
    local full_url="${SERVICES_URL}${HEALTH_ENDPOINT}"
    
    echo "[INFO] Starting health check for Container Platform Service"
    echo "[INFO] Full health check URL: $full_url"
    
    if ! check_service_dependencies; then
        echo "[ERROR] Service dependencies check failed"
        exit 1
    fi
    
    check_docker_service || true
    check_kubernetes_context || true
    
    echo "[INFO] Beginning health check loop..."
    
    while [ $attempt -le $MAX_RETRIES ]; do
        echo "[INFO] Attempt $attempt of $MAX_RETRIES..."
        
        if check_health "$full_url" "$TIMEOUT"; then
            log_success
        else
            echo "[INFO] Health check failed, retrying in ${RETRY_INTERVAL}s..."
            sleep "$RETRY_INTERVAL"
        fi
        
        attempt=$((attempt + 1))
    done
    
    log_failure
}

main "$@"