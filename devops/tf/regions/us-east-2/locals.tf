data "aws_caller_identity" "current" {}

data "aws_region" "current" {}


locals {
  account_id      = data.aws_caller_identity.current.account_id
  deployment_name = var.deployment_name
  domain_prefix   = "movies-demo-${var.environment}"
}
