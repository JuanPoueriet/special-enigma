variable "environment" { type = string }
variable "region" { type = string }
variable "vpc_id" { type = string }
variable "subnet_ids" { type = list(string) }
variable "availability_zones" { type = list(string) }
variable "db_password" {
  type      = string
  sensitive = true
}
variable "global_cluster_identifier" {
  type = string
}
variable "is_primary" {
  type = bool
}
variable "source_cluster_arn" {
  type    = string
  default = null
}

resource "aws_db_subnet_group" "default" {
  name       = "virtex-db-subnet-${var.environment}-${var.region}"
  subnet_ids = var.subnet_ids

  tags = {
    Name = "virtex DB subnet group - ${var.region}"
  }
}

resource "aws_rds_cluster" "aurora" {
  cluster_identifier         = "virtex-aurora-${var.environment}-${var.region}"
  engine                     = "aurora-postgresql"
  engine_version             = "15.3"
  global_cluster_identifier  = var.global_cluster_identifier
  availability_zones         = var.availability_zones
  db_subnet_group_name       = aws_db_subnet_group.default.name
  backup_retention_period    = 30
  preferred_backup_window    = "07:00-09:00"
  skip_final_snapshot        = false
  final_snapshot_identifier  = "virtex-aurora-${var.environment}-${var.region}-final-${formatdate("YYYYMMDDHHmmss", timestamp())}"

  database_name = var.is_primary ? "virtex" : null
  master_username = var.is_primary ? "postgres" : null
  master_password = var.is_primary ? var.db_password : null
  replication_source_identifier = var.is_primary ? null : var.source_cluster_arn

  tags = {
    Region      = var.region
    Environment = var.environment
    Service     = "virtex-erp"
    MultiRegion = "true"
    ManagedBy   = "Terraform"
    Role        = var.is_primary ? "primary" : "secondary"
  }
}

resource "aws_rds_cluster_instance" "cluster_instances" {
  count              = 2
  identifier         = "virtex-aurora-${var.environment}-${var.region}-${count.index}"
  cluster_identifier = aws_rds_cluster.aurora.id
  instance_class     = "db.r5.large"
  engine             = aws_rds_cluster.aurora.engine
  engine_version     = aws_rds_cluster.aurora.engine_version
}

output "cluster_arn" {
  value = aws_rds_cluster.aurora.arn
}

output "cluster_endpoint" {
  value = aws_rds_cluster.aurora.endpoint
}
