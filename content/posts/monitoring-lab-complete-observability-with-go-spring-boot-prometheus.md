+++
title = "Monitoring Lab: A Complete Observability Lab with Go, Spring Boot and Prometheus"
date = "2025-12-12"
description = "Learn how to build a complete observability lab that compares performance between Go and Spring Boot applications, collecting metrics with Prometheus and visualizing everything in Grafana."
tags = ["observability", "go", "spring-boot", "prometheus", "grafana", "monitoring", "devops"]
readingTime = 15
draft = false
+++

# Monitoring Lab: A Complete Observability Lab with Go, Spring Boot and Prometheus

**GitHub Repository:** https://github.com/digenaldo/monitoring-lab

## Introduction

Observability is one of the most important parts of modern applications in production. Having visibility into how your systems behave, perform, and stay healthy is essential to make sure they are reliable and you can respond quickly to problems.

In this article, I will share how I created a complete Monitoring Lab - an observability lab that compares performance between Go and Spring Boot applications, collecting metrics through Prometheus and visualizing everything in Grafana.

## What is the Monitoring Lab?

The Monitoring Lab is a complete observability project that includes:

- Two backend applications (Go and Spring Boot) that run operations on MongoDB
- Prometheus for collecting and storing metrics
- Grafana for visualization and dashboards
- Exporters for MongoDB and system metrics
- Everything organized with Docker Compose

The goal is to create a realistic environment where we can observe and compare performance between different technologies, understand how to implement custom metrics, and learn about the observability ecosystem.

## Project Architecture

The architecture is simple but complete:

The Go App (Port 8080) and Spring App (Port 8081) connect to MongoDB (Port 27017). Prometheus (Port 9090) collects metrics from both applications, plus the MongoDB Exporter and Node Exporter. Grafana (Port 3001) uses the metrics from Prometheus for visualization.

## Application Implementation

### Go Application

The Go application was built with a focus on simplicity and performance. It uses:

- Official MongoDB Driver for Go
- Prometheus Client Library to expose metrics
- Goroutines for asynchronous operations

The application runs an infinite loop that, every 5 seconds:
1. Pings MongoDB
2. Inserts a document into the events collection
3. Records latency metrics and counters

Metrics are exposed at the `/metrics` endpoint in Prometheus format.

### Spring Boot Application

The Spring Boot application uses:

- Spring Data MongoDB for database access
- Micrometer for metrics (natively integrated with Spring Boot)
- @Scheduled for periodic tasks

Similar to the Go application, it runs operations every 5 seconds:
1. Counts documents in the events collection
2. Inserts a new document
3. Records metrics through Micrometer

Metrics are automatically exposed at the `/actuator/prometheus` endpoint.

## Prometheus Configuration

Prometheus is configured to collect metrics from multiple sources:

- Go App (`/metrics`)
- Spring App (`/actuator/prometheus`)
- MongoDB Exporter (database metrics)
- Node Exporter (operating system metrics)

The scrape interval is set to 5 seconds, allowing near real-time visualization of metrics.

## Grafana Dashboards

One of the most interesting parts of the project is the pre-configured comparative dashboard. It shows:

- Go application metrics: CPU, memory, MongoDB operation latency
- Spring Boot application metrics: CPU, memory, MongoDB operation latency
- Side-by-side comparisons: allowing you to see performance differences between the two technologies

The dashboard is automatically set up through JSON files, so you don't need to configure it manually after starting the containers.

## Custom Metrics

Both applications expose relevant custom metrics:

**Go App:**
- `mongodb_operations_total` - Total operations performed
- `mongodb_operation_duration_seconds` - Latency histogram

**Spring App:**
- `mongodb_total_operations` - Total operations
- `mongodb_count_velocity` - Count operation velocity
- `mongodb_operation_latency_seconds` - Operation latency

These metrics help you understand not just if the applications are working, but also how they are performing.

## Docker Compose and Orchestration

The entire environment is organized through a single `docker-compose.yml` file. This makes it easy to:

- Start quickly: `podman compose up -d --build`
- Isolate services: each service in its own container
- Share network: communication between services
- Persistent volumes: MongoDB and Grafana data are kept

An important decision was to remove the `service_healthy` conditions from dependencies, as they were causing freezes in podman compose. The services still have health checks, but they don't block other services from starting.

## Challenges and Solutions

During development, I found some challenges:

1. **Port conflict:** Grafana was configured for port 3000, which was already in use. Solution: change to port 3001.

2. **Freezes in podman compose:** The `service_healthy` conditions were causing indefinite waits. Solution: remove these conditions and rely only on basic dependencies.

3. **Different metrics between Go and Spring:** Each technology exposes metrics differently. Solution: create specific Prometheus queries for each application in the dashboard.

## Results and Insights

The project allows you to observe some interesting differences:

- **Go:** Generally shows lower memory usage and more consistent latency
- **Spring Boot:** Makes implementation easier through Spring Actuator, but may have higher overhead

It's important to note that these observations are specific to this test scenario and should not be generalized without more comprehensive tests.

## How to Use

The project is available on GitHub and can be run easily:

```bash
git clone https://github.com/digenaldo/monitoring-lab
cd monitoring-lab
podman compose up -d --build
```

After a few seconds, all services will be available:
- Go App: http://localhost:8080
- Spring App: http://localhost:8081
- Prometheus: http://localhost:9090
- Grafana: http://localhost:3001 (user: admin, password: admin)

## Conclusion

This Monitoring Lab serves as an excellent starting point to understand observability in practice. It demonstrates:

- How to implement custom metrics in different technologies
- How to configure a complete observability stack
- How to visualize and compare metrics from different applications
- The importance of having visibility into system behavior

Observability is not just about collecting data, but about turning that data into actionable insights. With Prometheus and Grafana, we have the tools we need for that.

## Next Steps

Some improvements that can be implemented:

- Add alerts in Prometheus
- Configure alerts in Grafana
- Implement more custom metrics (business metrics)
- Add distributed tracing (Jaeger/Zipkin)
- Implement more robust health checks

The code is available on GitHub and contributions are welcome!

