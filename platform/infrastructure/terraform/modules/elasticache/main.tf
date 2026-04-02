variable "environment" { type = string }
variable "vpc_id" { type = string }
variable "subnet_ids" { type = list(string) }

resource "aws_elasticache_replication_group" "redis" {
  replication_group_id          = "virtex-redis-${var.environment}"
  replication_group_description = "High availability Redis group for ${var.environment}"
  node_type                     = "cache.t3.micro"
  num_cache_clusters            = 3
  parameter_group_name          = "default.redis7"
  port                          = 6379
  subnet_group_name             = aws_elasticache_subnet_group.default.name
  automatic_failover_enabled    = true
  multi_az_enabled              = true
  engine                        = "redis"
  engine_version                = "7.0"
}

resource "aws_elasticache_subnet_group" "default" {
  name       = "virtex-cache-subnet-${var.environment}"
  subnet_ids = var.subnet_ids
}
